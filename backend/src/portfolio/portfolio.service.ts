import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../security/encryption.service';

type LatestDomesticPrice = {
  ticker: string;
  market: string;
  price: number;
  priceDate: Date | string;
};

type LatestOverseasPrice = {
  symbol: string;
  close: number;
  priceDate: Date | string;
};

type LatestFxRate = {
  exchangeRate: number;
  date: Date | string;
};

type AssetSummary = {
  ticker: string;
  stockName: string | null;
  market: string;
  sector: string | null;
  assetType: 'domestic_stock' | 'overseas_stock';
  valuationAmount: number;
  investedAmount: number;
  profitLoss: number;
  weight: number;
  returnRate: number | null;
  priceDate: string;
  riskComment: string;
};

const DOMESTIC_MARKETS = new Set(['KRX', 'KOSPI', 'KOSDAQ', 'KONEX']);
const DISCLAIMER =
  '본 분석은 투자 추천이 아니라 보유 포트폴리오의 리스크 설명입니다.';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async analyzePortfolio(userId: string, analysisDate?: string) {
    const resolvedAnalysisDate = this.resolveAnalysisDate(analysisDate);
    const assets = await this.prisma.portfolioAsset.findMany({
      where: { userId },
      orderBy: [{ market: 'asc' }, { ticker: 'asc' }],
    });

    if (!assets.length) {
      throw new NotFoundException('Portfolio assets not found for user.');
    }

    const fxRate = await this.getLatestUsdKrwRate(resolvedAnalysisDate);
    const summaries: AssetSummary[] = [];
    const missingData: string[] = [];

    for (const asset of assets) {
      const quantity = this.decryptNumber(asset.quantity);
      const avgBuyPrice = this.decryptOptionalNumber(asset.avgBuyPrice);
      const investmentAmount = this.decryptOptionalNumber(
        asset.investmentAmount,
      );

      if (!quantity || quantity <= 0) {
        missingData.push(`${asset.ticker}: quantity`);
        continue;
      }

      const isDomestic = DOMESTIC_MARKETS.has(asset.market.toUpperCase());
      const price = isDomestic
        ? await this.getLatestDomesticPrice(asset.ticker, resolvedAnalysisDate)
        : await this.getLatestOverseasPrice(asset.ticker, resolvedAnalysisDate);

      if (!price) {
        missingData.push(`${asset.ticker}: latest price`);
        continue;
      }

      const closePrice = isDomestic
        ? (price as LatestDomesticPrice).price
        : (price as LatestOverseasPrice).close;
      const fxMultiplier = isDomestic ? 1 : (fxRate?.exchangeRate ?? null);

      if (!fxMultiplier) {
        missingData.push(`${asset.ticker}: USD_KRW fx rate`);
        continue;
      }

      const investedAmount =
        investmentAmount ?? (avgBuyPrice ? quantity * avgBuyPrice : null);

      if (!investedAmount || investedAmount <= 0) {
        missingData.push(`${asset.ticker}: invested amount`);
        continue;
      }

      const valuationAmount = quantity * closePrice * fxMultiplier;
      const profitLoss = valuationAmount - investedAmount;
      const returnRate = (profitLoss / investedAmount) * 100;

      summaries.push({
        ticker: asset.ticker,
        stockName: asset.stockName,
        market: asset.market,
        sector: asset.sector,
        assetType: isDomestic ? 'domestic_stock' : 'overseas_stock',
        valuationAmount,
        investedAmount,
        profitLoss,
        weight: 0,
        returnRate,
        priceDate: this.formatDate(
          isDomestic
            ? (price as LatestDomesticPrice).priceDate
            : (price as LatestOverseasPrice).priceDate,
        ),
        riskComment: '',
      });
    }

    if (!summaries.length) {
      return {
        userId,
        analysisDate: this.formatDate(resolvedAnalysisDate),
        status: 'insufficient_data',
        reason:
          '분석 가능한 보유자산 가격, 환율 또는 투자금액 데이터가 부족합니다.',
        missingData,
        disclaimer: DISCLAIMER,
      };
    }

    const totalInvestedAmount = this.sum(summaries, 'investedAmount');
    const totalValuationAmount = this.sum(summaries, 'valuationAmount');
    const totalProfitLoss = totalValuationAmount - totalInvestedAmount;
    const totalReturnRate =
      totalInvestedAmount > 0
        ? (totalProfitLoss / totalInvestedAmount) * 100
        : null;

    for (const summary of summaries) {
      summary.weight =
        totalValuationAmount > 0
          ? (summary.valuationAmount / totalValuationAmount) * 100
          : 0;
      summary.riskComment = this.buildAssetRiskComment(summary.weight);
    }

    const marketAllocation = this.groupWeights(summaries, 'market');
    const assetTypeAllocation = this.groupWeights(summaries, 'assetType');
    const sectorAllocation = this.groupWeights(summaries, 'sector');
    const topWeight = Math.max(...summaries.map((asset) => asset.weight));
    const concentrationScore = this.calculateConcentrationScore(summaries);
    const riskLevel = this.calculateRiskLevel(
      concentrationScore,
      topWeight,
      summaries.length,
    );
    const summary = this.buildPortfolioSummary(
      riskLevel,
      topWeight,
      missingData.length,
    );

    await this.prisma.portfolioAnalysisSnapshot.create({
      data: {
        userId,
        snapshotDate: resolvedAnalysisDate,
        totalValue: this.round(totalValuationAmount),
        dailyPnL: this.round(totalProfitLoss),
        riskScore: concentrationScore,
        diversification: this.round(Math.max(0, 100 - concentrationScore)),
        summary: JSON.stringify({
          riskLevel,
          totalReturnRate: this.roundNullable(totalReturnRate),
          concentrationScore,
          marketAllocation,
          assetTypeAllocation,
          sectorAllocation,
          missingData,
        }),
      },
    });

    return {
      userId,
      analysisDate: this.formatDate(resolvedAnalysisDate),
      status: missingData.length ? 'partial' : 'ok',
      totalInvestedAmount: this.round(totalInvestedAmount),
      totalValuationAmount: this.round(totalValuationAmount),
      totalProfitLoss: this.round(totalProfitLoss),
      totalReturnRate: this.roundNullable(totalReturnRate),
      riskLevel,
      concentrationScore,
      marketAllocation,
      assetTypeAllocation,
      sectorAllocation,
      assetSummaries: summaries.map((asset) => ({
        ticker: asset.ticker,
        stockName: asset.stockName,
        market: asset.market,
        assetType: asset.assetType,
        sector: asset.sector,
        valuationAmount: this.round(asset.valuationAmount),
        profitLoss: this.round(asset.profitLoss),
        weight: this.round(asset.weight),
        returnRate: this.roundNullable(asset.returnRate),
        priceDate: asset.priceDate,
        riskComment: asset.riskComment,
      })),
      missingData,
      summary,
      disclaimer: DISCLAIMER,
    };
  }

  private async getLatestDomesticPrice(
    ticker: string,
    analysisDate: Date,
  ): Promise<LatestDomesticPrice | null> {
    const rows = await this.prisma.$queryRaw<LatestDomesticPrice[]>`
      SELECT ticker, market, price, priceDate
      FROM MarketPrice
      WHERE ticker = ${ticker}
        AND priceDate <= ${this.formatDate(analysisDate)}
      ORDER BY priceDate DESC
      LIMIT 1
    `;
    return rows[0] ?? null;
  }

  private async getLatestOverseasPrice(
    ticker: string,
    analysisDate: Date,
  ): Promise<LatestOverseasPrice | null> {
    const rows = await this.prisma.$queryRaw<LatestOverseasPrice[]>`
      SELECT symbol, close, priceDate
      FROM YahooPrice
      WHERE UPPER(symbol) = ${ticker.toUpperCase()}
        AND priceDate <= ${this.formatDate(analysisDate)}
      ORDER BY priceDate DESC
      LIMIT 1
    `;
    return rows[0] ?? null;
  }

  private async getLatestUsdKrwRate(
    analysisDate: Date,
  ): Promise<LatestFxRate | null> {
    const rows = await this.prisma.$queryRaw<LatestFxRate[]>`
      SELECT exchangeRate, date
      FROM FxRate
      WHERE currencyPair = 'USD_KRW'
        AND date <= ${this.formatDate(analysisDate)}
      ORDER BY date DESC
      LIMIT 1
    `;
    return rows[0] ?? null;
  }

  private decryptNumber(value: string): number | null {
    const decrypted = this.encryptionService.decrypt(value);
    return this.parseNumber(decrypted);
  }

  private decryptOptionalNumber(value?: string | null): number | null {
    if (!value) return null;
    const decrypted = this.encryptionService.decrypt(value);
    return this.parseNumber(decrypted);
  }

  private parseNumber(value: string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private resolveAnalysisDate(value?: string): Date {
    if (!value) return new Date();
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  private formatDate(value: Date | string): string {
    if (value instanceof Date) {
      return value.toISOString().slice(0, 10);
    }
    return String(value).slice(0, 10);
  }

  private sum(rows: AssetSummary[], field: keyof AssetSummary): number {
    return rows.reduce((total, row) => {
      const value = row[field];
      return total + (typeof value === 'number' ? value : 0);
    }, 0);
  }

  private groupWeights(
    rows: AssetSummary[],
    field: keyof AssetSummary,
  ): { name: string; weight: number; valuationAmount: number }[] {
    const totals = new Map<string, number>();
    for (const row of rows) {
      const key = String(row[field] || 'unclassified');
      totals.set(key, (totals.get(key) ?? 0) + row.valuationAmount);
    }
    const total = this.sum(rows, 'valuationAmount');
    return [...totals.entries()]
      .map(([name, valuationAmount]) => ({
        name,
        valuationAmount: this.round(valuationAmount),
        weight: total > 0 ? this.round((valuationAmount / total) * 100) : 0,
      }))
      .sort((a, b) => b.weight - a.weight);
  }

  private calculateConcentrationScore(rows: AssetSummary[]): number {
    if (!rows.length) return 0;
    const hhi = rows.reduce(
      (score, row) => score + Math.pow(row.weight / 100, 2),
      0,
    );
    return this.round(Math.min(100, hhi * 100));
  }

  private calculateRiskLevel(
    concentrationScore: number,
    topWeight: number,
    assetCount: number,
  ): 'low' | 'medium' | 'high' {
    if (assetCount <= 2 || topWeight >= 60 || concentrationScore >= 45) {
      return 'high';
    }
    if (assetCount <= 4 || topWeight >= 35 || concentrationScore >= 25) {
      return 'medium';
    }
    return 'low';
  }

  private buildAssetRiskComment(weight: number): string {
    if (weight >= 40) {
      return '포트폴리오 내 비중이 높은 핵심 종목입니다.';
    }
    if (weight >= 20) {
      return '포트폴리오 성과에 의미 있는 영향을 줄 수 있는 종목입니다.';
    }
    return '포트폴리오 내 비중이 제한적인 보유 종목입니다.';
  }

  private buildPortfolioSummary(
    riskLevel: string,
    topWeight: number,
    missingCount: number,
  ): string {
    const dataNote = missingCount
      ? ' 일부 자산은 데이터 부족으로 분석에서 제외되었습니다.'
      : '';
    if (riskLevel === 'high') {
      return `현재 포트폴리오는 특정 종목 비중이 높아 단기 변동성에 민감할 수 있습니다.${dataNote}`;
    }
    if (riskLevel === 'medium') {
      return `현재 포트폴리오는 일부 자산의 영향력이 크지만 과도한 단일 집중은 제한적입니다.${dataNote}`;
    }
    return `현재 포트폴리오는 상대적으로 분산되어 있으나 시장 가격 변동에 따른 손익 변화는 계속 발생할 수 있습니다.${dataNote}`;
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private roundNullable(value: number | null): number | null {
    return value === null ? null : this.round(value);
  }
}
