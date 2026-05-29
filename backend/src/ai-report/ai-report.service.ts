// backend/src/ai-report/ai-report.service.ts
//
// DB(Prisma)에서 사용자/프로필/포트폴리오/시장가/스냅샷/상관관계/최신성 데이터를 모아
// analyzePortfolio()로 규칙 기반 리포트를 만들고, 선택적으로 Claude로 문장을 다듬습니다.
//
// 이번 버전 반영:
//  - 자산군(주식/채권) + 채권 세부 분류(CD 91일/국고채 3·10년물)
//  - correlation 엔진 결과(있으면) 주입, 없으면 단정 안 함
//  - recencyBiasDefenseData 주입(있으면)
//  - 거시 하드코딩 제거: hasMacroData=false (실시간 미연동)

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../security/encryption.service';
import { AiReportRefinerService } from './ai-report-refiner.service';
import {
  analyzePortfolio,
  AnalyzerHolding,
  AnalyzerInput,
  CorrelationInput,
  MacroInput,
  RecencyDatum,
} from './ai-report.analyzer';
import {
  AiReportResponse,
  AI_REPORT_DISCLAIMER,
  AssetClass,
  BondType,
} from './ai-report.types';

function toNumber(v: string | null | undefined): number | null {
  if (v == null) return null;
  const n = Number(String(v).replace(/[, ]/g, ''));
  return Number.isFinite(n) ? n : null;
}

// ── 자산군/채권 분류 ─────────────────────────────────────
// market 또는 sector 또는 stockName/ticker 텍스트로 추정합니다.
// DB에 명시적 assetClass/bondType 컬럼이 있으면 그 값을 우선 쓰도록 바꾸세요.

function classifyAssetClass(a: {
  market: string;
  sector: string | null;
  stockName: string | null;
  ticker: string;
}): AssetClass {
  const hay = `${a.market} ${a.sector ?? ''} ${a.stockName ?? ''}`.toUpperCase();
  if (
    a.market?.toUpperCase() === 'BOND' ||
    hay.includes('채권') ||
    hay.includes('국고채') ||
    hay.includes('통안') ||
    hay.includes('CD') ||
    hay.includes('BOND') ||
    hay.includes('국채')
  ) {
    return 'BOND';
  }
  return 'EQUITY';
}

function classifyBondType(a: {
  sector: string | null;
  stockName: string | null;
  ticker: string;
}): BondType {
  const hay = `${a.sector ?? ''} ${a.stockName ?? ''} ${a.ticker}`.toUpperCase();
  if (hay.includes('CD') || hay.includes('91')) return 'CD_91D';
  if (hay.includes('10') && (hay.includes('국고') || hay.includes('국채') || hay.includes('KTB')))
    return 'KTB_10Y';
  if (hay.includes('3') && (hay.includes('국고') || hay.includes('국채') || hay.includes('KTB')))
    return 'KTB_3Y';
  if (hay.includes('ETF')) return 'BOND_ETF';
  return 'OTHER_BOND';
}

@Injectable()
export class AiReportService {
  private readonly logger = new Logger(AiReportService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: EncryptionService,
    private readonly refiner: AiReportRefinerService,
  ) {}

  async getLatest(userId: string, refine = false): Promise<AiReportResponse> {
    const missing: string[] = [];

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { investmentProfile: true, portfolioAssets: true },
    });
    if (!user) return this.notFoundReport();

    const assets = user.portfolioAssets ?? [];
    const hasPortfolio = assets.length > 0;
    if (!hasPortfolio) missing.push('포트폴리오 자산');

    // 보유 종목 평가액 + 자산군 분류
    let hasMarketPrices = false;
    const holdings: AnalyzerHolding[] = [];

    for (const a of assets) {
      let quantity: number | null = null;
      let investmentAmount: number | null = null;
      let avgBuyPrice: number | null = null;
      try {
        quantity = toNumber(this.encryption.decrypt(a.quantity));
      } catch {
        missing.push(`${a.stockName ?? a.ticker} 수량 복호화 실패`);
      }
      try {
        if (a.investmentAmount)
          investmentAmount = toNumber(this.encryption.decrypt(a.investmentAmount));
      } catch {
        /* 무시 */
      }
      try {
        if (a.avgBuyPrice)
          avgBuyPrice = toNumber(this.encryption.decrypt(a.avgBuyPrice));
      } catch {
        /* 무시 */
      }

      const latestPrice = await this.prisma.marketPrice.findFirst({
        where: { market: a.market, ticker: a.ticker },
        orderBy: { priceDate: 'desc' },
      });
      const valuation = await this.prisma.valuationIndicator.findFirst({
        where: { market: a.market, ticker: a.ticker },
        orderBy: { indicatorDate: 'desc' },
      });

      let marketValue: number | null = null;
      let priceFound = false;
      if (quantity != null && latestPrice) {
        marketValue = quantity * latestPrice.price;
        priceFound = true;
        hasMarketPrices = true;
      } else if (investmentAmount != null) {
        marketValue = investmentAmount;
      } else if (quantity != null && avgBuyPrice != null) {
        marketValue = quantity * avgBuyPrice;
      } else {
        missing.push(`${a.stockName ?? a.ticker} 평가액 산출 불가`);
      }

      const assetClass = classifyAssetClass({
        market: a.market,
        sector: a.sector ?? null,
        stockName: a.stockName ?? null,
        ticker: a.ticker,
      });

      holdings.push({
        ticker: a.ticker,
        stockName: a.stockName ?? a.ticker,
        market: a.market,
        sector: a.sector ?? null,
        assetClass,
        bondType:
          assetClass === 'BOND'
            ? classifyBondType({
                sector: a.sector ?? null,
                stockName: a.stockName ?? null,
                ticker: a.ticker,
              })
            : null,
        quantity: quantity ?? 0,
        marketValue,
        hasMarketPrice: priceFound,
        per: valuation?.per ?? null,
        pbr: valuation?.pbr ?? null,
      });
    }

    // 최신 스냅샷
    const snapshotRow = await this.prisma.portfolioAnalysisSnapshot.findFirst({
      where: { userId },
      orderBy: { snapshotDate: 'desc' },
    });
    const hasAnalysisSnapshot = !!snapshotRow;
    if (!hasAnalysisSnapshot) missing.push('분석 스냅샷');

    // 상관관계 데이터 (correlation 엔진 결과). 스냅샷 summary(JSON) 등에서 읽는 예시.
    const correlation = await this.loadCorrelation(userId, snapshotRow?.summary ?? null);
    const hasCorrelationData = !!correlation;
    if (!hasCorrelationData) missing.push('상관관계 데이터');

    // 최신성 편향 방어 데이터
    const recency = await this.loadRecency(holdings);
    const hasRecencyData = recency.length > 0;
    if (!hasRecencyData) missing.push('최신성(추세) 데이터');

    const macro = await this.loadMacroData();
    const hasMacroData = !!macro;
    if (!hasMacroData) missing.push('거시/시장 데이터');

    const input: AnalyzerInput = {
      profile: {
        riskType: this.safeDecrypt(user.investmentProfile?.riskType),
        investmentGoal: this.safeDecrypt(user.investmentProfile?.investmentGoal),
      },
      holdings,
      snapshot: snapshotRow
        ? {
            riskScore: snapshotRow.riskScore ?? null,
            diversification: snapshotRow.diversification ?? null,
            dailyPnL: snapshotRow.dailyPnL ?? null,
            totalValue: snapshotRow.totalValue ?? null,
          }
        : null,
      correlation,
      recency,
      macro,
      dataQuality: {
        hasPortfolio,
        hasMarketPrices,
        hasAnalysisSnapshot,
        hasMacroData,
        hasCorrelationData,
        hasRecencyData,
        missing: [...new Set(missing)],
      },
    };

    let report = analyzePortfolio(input);

    if (refine && this.refiner.isEnabled()) {
      report = await this.refiner.refine(report);
      try {
        await this.prisma.aiRequestLog.create({
          data: {
            userId,
            requestType: 'AI_REPORT_REFINE',
            createdAt: new Date(),
          } as never,
        });
      } catch (e) {
        this.logger.warn(`AiRequestLog 기록 실패: ${(e as Error).message}`);
      }
    }

    return report;
  }

  // ── helpers ──────────────────────────────────────────

  private safeDecrypt(v: string | null | undefined): string | null {
    if (!v) return null;
    try {
      return this.encryption.decrypt(v) ?? null;
    } catch {
      return null;
    }
  }

  /**
   * 상관관계 데이터 로드.
   * 예시 구현: 분석 스냅샷 summary(JSON 문자열)에 correlation 블록을 저장해 두고 파싱.
   * 별도 테이블/외부 엔진이 있으면 그 소스에서 읽도록 교체하세요.
   * 데이터가 없으면 null → analyzer가 단정하지 않습니다.
   */
  private async loadCorrelation(
    _userId: string,
    summaryJson: string | null,
  ): Promise<CorrelationInput | null> {
    if (!summaryJson) return null;
    try {
      const parsed = JSON.parse(summaryJson);
      const block = parsed.correlation ?? parsed; // 유연하게 수용
      const has =
        block?.correlationMatrix ||
        block?.highCorrelationAlerts ||
        block?.macroSectorExposure ||
        block?.microSectorExposure ||
        block?.portfolioSummary?.macroSectorExposure;
      if (!has) return null;
      return {
        macroSectorExposure:
          block.macroSectorExposure ??
          block.portfolioSummary?.macroSectorExposure ??
          undefined,
        microSectorExposure:
          block.microSectorExposure ??
          block.portfolioSummary?.microSectorExposure ??
          undefined,
        highCorrelationAlerts: block.highCorrelationAlerts ?? undefined,
        correlationMatrix: block.correlationMatrix ?? undefined,
      };
    } catch {
      return null; // summary가 JSON이 아니면 상관 데이터 없음으로 처리
    }
  }

  private async loadMacroData(): Promise<MacroInput | null> {
    const analysisDate = new Date().toISOString().slice(0, 10);
    const eventStartDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    try {
      const [dailyRows, krRateRows, usRateRows, fxRows, indexRows, eventRows] =
        await Promise.all([
          this.prisma.$queryRaw<any[]>`
            SELECT
              date,
              kospi_index as kospiIndex,
              sp500_index as sp500Index,
              nasdaq_index as nasdaqIndex,
              usd_krw as usdKrw,
              kr_base_rate as krBaseRate,
              us_base_rate as usBaseRate
            FROM daily_market_macro_prices
            WHERE date <= ${analysisDate}
            ORDER BY date DESC
            LIMIT 21
          `.catch(() => []),
          this.prisma.$queryRaw<any[]>`
            SELECT date, rateValue
            FROM "InterestRate"
            WHERE country = 'KR'
              AND rateType = 'base_rate'
              AND date <= ${analysisDate}
            ORDER BY date DESC
            LIMIT 1
          `.catch(() => []),
          this.prisma.$queryRaw<any[]>`
            SELECT date, rateValue
            FROM "InterestRate"
            WHERE country = 'US'
              AND rateType = 'base_rate'
              AND date <= ${analysisDate}
            ORDER BY date DESC
            LIMIT 1
          `.catch(() => []),
          this.prisma.$queryRaw<any[]>`
            SELECT date, exchangeRate
            FROM "FxRate"
            WHERE currencyPair = 'USD_KRW'
              AND date <= ${analysisDate}
            ORDER BY date DESC
            LIMIT 1
          `.catch(() => []),
          this.prisma.$queryRaw<any[]>`
            SELECT indexName, value, changeRate, indexDate
            FROM "MarketIndex"
            WHERE indexDate <= ${analysisDate}
              AND (
                UPPER(indexName) LIKE '%KOSPI%'
                OR UPPER(indexName) LIKE '%KOSDAQ%'
                OR UPPER(indexName) LIKE '%S&P%'
                OR UPPER(indexName) LIKE '%NASDAQ%'
              )
            ORDER BY indexDate DESC
            LIMIT 20
          `.catch(() => []),
          this.prisma.$queryRaw<any[]>`
            SELECT country, eventDate, decisionType, changeBp, surpriseBp, title
            FROM "EconomicEvent"
            WHERE eventType = 'BASE_RATE_DECISION'
              AND eventDate <= ${analysisDate}
              AND eventDate >= ${eventStartDate}
            ORDER BY eventDate DESC
            LIMIT 5
          `.catch(() => []),
        ]);

      const latestDaily = dailyRows[0] ?? null;
      const previousDaily = dailyRows[Math.min(20, dailyRows.length - 1)] ?? null;

      const macro: MacroInput = {
        asOfDate: this.formatDate(latestDaily?.date ?? analysisDate),
        krBaseRate:
          this.readNumber(latestDaily?.krBaseRate) ??
          this.readNumber(krRateRows[0]?.rateValue),
        usBaseRate:
          this.readNumber(latestDaily?.usBaseRate) ??
          this.readNumber(usRateRows[0]?.rateValue),
        usdKrw:
          this.readNumber(latestDaily?.usdKrw) ??
          this.readNumber(fxRows[0]?.exchangeRate),
        indices: this.buildMacroIndices(latestDaily, previousDaily, indexRows),
        baseRateEvents: eventRows.map((event) => ({
          country: String(event.country ?? ''),
          eventDate: this.formatDate(event.eventDate),
          decisionType: event.decisionType ?? null,
          changeBp: this.readNumber(event.changeBp),
          surpriseBp: this.readNumber(event.surpriseBp),
          title: String(event.title ?? '기준금리 결정'),
        })),
      };

      const hasAnyMacroValue =
        macro.krBaseRate != null ||
        macro.usBaseRate != null ||
        macro.usdKrw != null ||
        macro.indices.length > 0 ||
        macro.baseRateEvents.length > 0;

      return hasAnyMacroValue ? macro : null;
    } catch (error) {
      this.logger.warn(`Macro data load failed: ${(error as Error).message}`);
      return null;
    }
  }

  private buildMacroIndices(
    latestDaily: any,
    previousDaily: any,
    indexRows: any[],
  ): MacroInput['indices'] {
    const fromDaily = [
      this.macroIndexFromDaily('KOSPI', latestDaily, previousDaily, 'kospiIndex'),
      this.macroIndexFromDaily('S&P500', latestDaily, previousDaily, 'sp500Index'),
      this.macroIndexFromDaily('NASDAQ', latestDaily, previousDaily, 'nasdaqIndex'),
    ].filter((row): row is MacroInput['indices'][number] => !!row);

    if (fromDaily.length > 0) return fromDaily;

    const picked = new Map<string, MacroInput['indices'][number]>();
    for (const row of indexRows) {
      const name = String(row.indexName ?? '').toUpperCase();
      const key = name.includes('KOSDAQ')
        ? 'KOSDAQ'
        : name.includes('KOSPI')
          ? 'KOSPI'
          : name.includes('NASDAQ')
            ? 'NASDAQ'
            : name.includes('S&P')
              ? 'S&P500'
              : null;
      if (!key || picked.has(key)) continue;
      picked.set(key, {
        name: key,
        value: this.readNumber(row.value),
        changeRate: this.readNumber(row.changeRate),
        date: this.formatDate(row.indexDate),
      });
    }
    return [...picked.values()];
  }

  private macroIndexFromDaily(
    name: string,
    latest: any,
    previous: any,
    field: string,
  ): MacroInput['indices'][number] | null {
    const latestValue = this.readNumber(latest?.[field]);
    const previousValue = this.readNumber(previous?.[field]);
    if (latestValue == null) return null;
    return {
      name,
      value: latestValue,
      changeRate:
        previousValue && previousValue > 0
          ? ((latestValue - previousValue) / previousValue) * 100
          : null,
      date: this.formatDate(latest?.date),
    };
  }

  private readNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === '') return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private formatDate(value: unknown): string {
    if (!value) return new Date().toISOString().slice(0, 10);
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return String(value).slice(0, 10);
  }

  /**
   * 최신성 편향 방어 데이터 로드.
   * MarketPrice 이력으로 return1M / return1Y 근사 + (있으면) 별도 RSI/ATH 소스 사용.
   * 충분한 가격 이력이 없으면 빈 배열 → analyzer가 단정하지 않습니다.
   */
  private async loadRecency(
    holdings: AnalyzerHolding[],
  ): Promise<RecencyDatum[]> {
    const out: RecencyDatum[] = [];
    for (const h of holdings) {
      if (h.assetClass !== 'EQUITY') continue;
      
      let prices: any[] = [];
      const isDomestic = ['KRX', 'KOSPI', 'KOSDAQ'].includes(h.market?.toUpperCase());
      
      if (isDomestic) {
        prices = await this.prisma.marketPrice.findMany({
          where: { market: h.market, ticker: h.ticker },
          orderBy: { priceDate: 'desc' },
          take: 260, // 약 1년 영업일
        });
      } else {
        prices = await this.prisma.$queryRaw<any[]>`
          SELECT close as price, priceDate
          FROM YahooPrice
          WHERE UPPER(symbol) = ${h.ticker.toUpperCase()}
          ORDER BY priceDate DESC
          LIMIT 260
        `.catch(() => []);
      }

      if (prices.length < 21) continue; // 데이터 부족 → 단정 안 함

      const latest = prices[0].price;
      const p5d = prices[Math.min(5, prices.length - 1)]?.price;
      const p20d = prices[Math.min(20, prices.length - 1)]?.price;
      const p1m = prices[Math.min(20, prices.length - 1)]?.price;
      const p1y = prices[prices.length - 1]?.price;
      const ath = Math.max(...prices.map((p) => p.price));

      const return5D = p5d ? ((latest - p5d) / p5d) * 100 : null;
      const return20D = p20d ? ((latest - p20d) / p20d) * 100 : null;
      const return1M = p1m ? ((latest - p1m) / p1m) * 100 : null;
      const return1Y = p1y ? ((latest - p1y) / p1y) * 100 : null;
      const distanceFromATH = ath > 0 ? ((latest - ath) / ath) * 100 : null;
      const rsi = this.computeRSI(prices.map((p) => p.price).reverse());

      out.push({
        ticker: h.ticker,
        stockName: h.stockName,
        return1M,
        return1Y,
        rsi,
        distanceFromATH,
        return5D,
        return20D,
      });
    }
    return out;
  }

  // 표준 14일 RSI (가격은 과거→현재 순서)
  private computeRSI(prices: number[], period = 14): number | null {
    if (prices.length < period + 1) return null;
    let gain = 0;
    let loss = 0;
    for (let i = prices.length - period; i < prices.length; i++) {
      const diff = prices[i] - prices[i - 1];
      if (diff >= 0) gain += diff;
      else loss -= diff;
    }
    const avgGain = gain / period;
    const avgLoss = loss / period;
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
  }

  private notFoundReport(): AiReportResponse {
    return {
      status: 'insufficient_data',
      generatedAt: null,
      summary: {
        totalScore: null,
        headline: '사용자 정보를 찾을 수 없습니다',
        description:
          '해당 사용자의 데이터가 없습니다. 온보딩을 먼저 완료해 주세요.',
        grades: {
          riskManagement: null,
          profitability: null,
          diversification: null,
          liquidity: null,
        },
      },
      cards: [],
      productRecommendations: [],
      dataQuality: {
        hasPortfolio: false,
        hasMarketPrices: false,
        hasAnalysisSnapshot: false,
        hasMacroData: false,
        hasCorrelationData: false,
        hasRecencyData: false,
        missing: ['사용자'],
      },
      disclaimer: AI_REPORT_DISCLAIMER,
    };
  }
}
