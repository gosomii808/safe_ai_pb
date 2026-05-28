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
}
