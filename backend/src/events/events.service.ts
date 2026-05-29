import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetEventsQueryDto } from './dto/get-events-query.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async getEvents(query: GetEventsQueryDto) {
    const events = await this.prisma.economicEvent.findMany({
      where: {
        eventDate: {
          gte: query.startDate ? new Date(query.startDate) : undefined,
          lte: query.endDate ? new Date(query.endDate) : undefined,
        },
        category: query.category as never,
        importance: query.importance as never,
      },
      include: { marketReaction: true },
      orderBy: { eventDate: 'desc' },
    });

    return events.map((event) => ({
      ...event,
      affectedAssets: event.affectedAssets.split(','),
    }));
  }

  async getEventById(id: string) {
    const event = await this.prisma.economicEvent.findUnique({
      where: { id },
      include: { impactRules: true, marketReaction: true },
    });

    if (!event) throw new NotFoundException('Event not found');

    return { ...event, affectedAssets: event.affectedAssets.split(',') };
  }

  async getImpactSummary() {
    const recentEvents = await this.prisma.economicEvent.findMany({
      orderBy: { eventDate: 'desc' },
      take: 3,
    });

    if (!recentEvents.length) return [];

    const rules = await this.prisma.eventImpactRule.findMany();

    return recentEvents.map((event) => {
      const relatedRules = rules.filter(
        (rule) => rule.eventCategory === event.category,
      );
      const mergedExplanation = relatedRules
        .map((rule) => rule.explanation)
        .join(' ');
      const risk = relatedRules.some((r) => r.riskLevel === 'HIGH')
        ? 'high'
        : relatedRules.some((r) => r.riskLevel === 'MEDIUM')
          ? 'medium'
          : 'low';

      return {
        eventTitle: event.title,
        category: event.category.toLowerCase(),
        importance: event.importance.toLowerCase(),
        affectedAssets: event.affectedAssets.split(','),
        summary:
          mergedExplanation ||
          '최근 데이터 기반 단기 흐름 분석에서 관련 자산군의 변동성 확대 가능성이 관찰됩니다.',
        riskLevel: risk,
        disclaimer:
          '본 내용은 투자 추천이 아니라 경제 이벤트에 따른 일반적 영향 가능성 설명입니다.',
      };
    });
  }

  async getMarketReactionByEventId(id: string) {
    const event = await this.prisma.economicEvent.findUnique({
      where: { id },
      include: { marketReaction: true },
    });

    if (!event) throw new NotFoundException('Event not found');

    return {
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.eventDate,
      reaction: event.marketReaction,
      series: event.marketReaction
        ? [
            { offset: -5, kospi: event.marketReaction.kospiTMinus5 },
            { offset: -4, kospi: event.marketReaction.kospiTMinus4 },
            { offset: -3, kospi: event.marketReaction.kospiTMinus3 },
            { offset: -2, kospi: event.marketReaction.kospiTMinus2 },
            { offset: -1, kospi: event.marketReaction.kospiTMinus1 },
            { offset: 0, kospi: event.marketReaction.kospiT0 },
            { offset: 1, kospi: event.marketReaction.kospiTPlus1 },
            { offset: 2, kospi: event.marketReaction.kospiTPlus2 },
            { offset: 3, kospi: event.marketReaction.kospiTPlus3 },
            { offset: 4, kospi: event.marketReaction.kospiTPlus4 },
            { offset: 5, kospi: event.marketReaction.kospiTPlus5 },
          ]
        : [],
    };
  }

  async getSectorSensitivity() {
    return this.prisma.sectorEventSensitivity.findMany({
      orderBy: [{ sector: 'asc' }, { eventColumn: 'asc' }],
    });
  }

  async getMacroSeries(limit = 120) {
    const take = Math.min(Math.max(limit, 1), 365);
    const rows = await this.prisma.dailyMarketMacroPrice.findMany({
      orderBy: { date: 'desc' },
      take,
    });

    return rows.reverse();
  }

  async getEventStudy(userId: string) {
    // 1. BASE_RATE_DECISION에 해당하는 HIGH 중요도 3~5개 최근 이벤트 로드
    const events = await this.prisma.economicEvent.findMany({

      where: { eventType: 'BASE_RATE_DECISION' },
      orderBy: { eventDate: 'desc' },
      take: 4,
    });

    if (!events.length) return [];

    // 2. 사용자의 포트폴리오 로드
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { portfolioAssets: true },
    });

    if (!user || !user.portfolioAssets || !user.portfolioAssets.length) return [];

    // AES 복호화 헬퍼
    const decryptVal = (val: string) => {
      try {
        const decrypted = require('../security/encryption.service'); // circular dep 방지
        const key = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012';
        const crypto = require('node:crypto');
        const [prefix, ivB64, tagB64, cipherB64] = val.split(':');
        if (prefix !== 'v1') return null;
        const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'utf8'), Buffer.from(ivB64, 'base64'), { authTagLength: 16 });
        decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
        return Buffer.concat([decipher.update(Buffer.from(cipherB64, 'base64')), decipher.final()]).toString('utf8');
      } catch {
        return null;
      }
    };

    // 포트폴리오 자산들의 수량 비중 정보 산출
    const holdings = user.portfolioAssets.map((asset: any) => {
      let quantity = 0;
      let investmentAmount = 0;
      try {
        quantity = Number(decryptVal(asset.quantity) || '0');
        investmentAmount = Number(decryptVal(asset.investmentAmount) || '0');
      } catch {}
      return {
        ticker: asset.ticker,
        market: asset.market,
        quantity,
        investmentAmount,
      };
    });

    const totalInvested = holdings.reduce((sum, h) => sum + h.investmentAmount, 0);

    const studyResults: any[] = [];


    // 각 이벤트에 대해 분석 수행
    for (const event of events) {
      const eventDateStr = String(event.eventDate).slice(0, 10);
      const eventDate = new Date(`${eventDateStr}T00:00:00.000Z`);

      // 영업일 기준으로 [-3, +7] 날짜 확보
      // macro price 데이터에서 이벤트 날짜 근처를 정렬해서 가져옵니다
      const macroPrices = await this.prisma.$queryRaw<any[]>`
        SELECT date, kospi_index as kospiIndex, spy_etf_close as spyEtfClose
        FROM daily_market_macro_prices
        ORDER BY date ASC
      `.catch(() => []);

      if (!macroPrices.length) continue;

      // 이벤트 날짜의 index 찾기
      let targetIndex = -1;
      let minDiff = Infinity;
      for (let i = 0; i < macroPrices.length; i++) {
        const itemDate = new Date(macroPrices[i].date);
        const diff = Math.abs(itemDate.getTime() - eventDate.getTime());
        if (diff < minDiff) {
          minDiff = diff;
          targetIndex = i;
        }
      }

      if (targetIndex === -1) continue;

      // Window 범위 [-3, +7]에 해당하는 데이터 슬라이스 (총 11일)
      const windowStartIdx = Math.max(0, targetIndex - 3);
      const windowEndIdx = Math.min(macroPrices.length - 1, targetIndex + 7);
      const windowPrices = macroPrices.slice(windowStartIdx, windowEndIdx + 1);

      if (windowPrices.length < 2) continue;

      const firstPrice = windowPrices[0];
      const lastPrice = windowPrices[windowPrices.length - 1];

      // Market Return 계산
      // US 이벤트면 SPY(spy_etf_close), KR 이벤트면 KOSPI(kospi_index) 기준
      const isUS = event.country === 'US';
      const mStart = isUS ? Number(firstPrice.spyEtfClose) : Number(firstPrice.kospiIndex);
      const mEnd = isUS ? Number(lastPrice.spyEtfClose) : Number(lastPrice.kospiIndex);
      let marketReturn = 0;
      if (mStart > 0) {
        marketReturn = ((mEnd - mStart) / mStart) * 100;
      }

      // Portfolio Return 계산 (각 자산별 이벤트 윈도우 기간의 가치 변동 비율 가중 평균)
      let portfolioReturnSum = 0;
      let totalWeight = 0;

      for (const h of holdings) {
        let pStart = 0;
        let pEnd = 0;

        const dateStartStr = String(firstPrice.date).slice(0, 10);
        const dateEndStr = String(lastPrice.date).slice(0, 10);

        if (['KRX', 'KOSPI', 'KOSDAQ'].includes(h.market.toUpperCase())) {
          // 국내주식
          const startPriceRow = await this.prisma.marketPrice.findFirst({
            where: { ticker: h.ticker, priceDate: { lte: new Date(dateStartStr) } },
            orderBy: { priceDate: 'desc' },
          });
          const endPriceRow = await this.prisma.marketPrice.findFirst({
            where: { ticker: h.ticker, priceDate: { lte: new Date(dateEndStr) } },
            orderBy: { priceDate: 'desc' },
          });
          pStart = startPriceRow ? startPriceRow.price : 0;
          pEnd = endPriceRow ? endPriceRow.price : 0;
        } else {
          // 해외주식 YahooPrice
          const startPriceRows = await this.prisma.$queryRaw<any[]>`
            SELECT close FROM YahooPrice
            WHERE UPPER(symbol) = ${h.ticker.toUpperCase()} AND priceDate <= ${dateStartStr}
            ORDER BY priceDate DESC LIMIT 1
          `.catch(() => []);
          const endPriceRows = await this.prisma.$queryRaw<any[]>`
            SELECT close FROM YahooPrice
            WHERE UPPER(symbol) = ${h.ticker.toUpperCase()} AND priceDate <= ${dateEndStr}
            ORDER BY priceDate DESC LIMIT 1
          `.catch(() => []);
          pStart = startPriceRows[0] ? startPriceRows[0].close : 0;
          pEnd = endPriceRows[0] ? endPriceRows[0].close : 0;
        }

        if (pStart > 0 && h.investmentAmount > 0) {
          const assetReturn = ((pEnd - pStart) / pStart) * 100;
          portfolioReturnSum += assetReturn * h.investmentAmount;
          totalWeight += h.investmentAmount;
        }
      }

      const portfolioReturn = totalWeight > 0 ? portfolioReturnSum / totalWeight : 0;
      const cumulativeAbnormalReturn = portfolioReturn - marketReturn;

      let summary = '';
      if (cumulativeAbnormalReturn > 0.5) {
        summary = `이벤트 전후 포트폴리오는 시장 대비 소폭 강한 흐름(+${cumulativeAbnormalReturn.toFixed(2)}%)을 보였습니다.`;
      } else if (cumulativeAbnormalReturn < -0.5) {
        summary = `이벤트 전후 포트폴리오는 시장 대비 소폭 약세(${cumulativeAbnormalReturn.toFixed(2)}%) 흐름을 나타냈습니다.`;
      } else {
        summary = '이벤트 전후 포트폴리오는 전반적으로 시장 수익률과 유사한 움직임을 보였습니다.';
      }

      studyResults.push({
        eventTitle: event.title,
        eventDate: eventDateStr,
        decisionType: event.decisionType || 'hold',
        changeBp: event.changeBp || 0,
        portfolioReturn: Math.round(portfolioReturn * 100) / 100,
        marketReturn: Math.round(marketReturn * 100) / 100,
        cumulativeAbnormalReturn: Math.round(cumulativeAbnormalReturn * 100) / 100,
        summary,
      });
    }

    return studyResults;
  }
}

