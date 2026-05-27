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
      include: { impactSummaries: true },
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
      const relatedRules = rules.filter((rule) => rule.eventCategory === event.category);
      const mergedExplanation = relatedRules.map((rule) => rule.explanation).join(' ');
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
}
