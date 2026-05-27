import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { GetEventsQueryDto } from './dto/get-events-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { eventSeeds, ruleSeeds } from './data/events.seed';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getEvents(@Query() query: GetEventsQueryDto) {
    return this.eventsService.getEvents(query);
  }

  @Get('impact-summary')
  getImpactSummary() {
    return this.eventsService.getImpactSummary();
  }

  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @Post('seed')
  async seedEvents() {
    await this.prisma.eventImpactSummary.deleteMany();
    await this.prisma.eventImpactRule.deleteMany();
    await this.prisma.economicEvent.deleteMany();

    await this.prisma.eventImpactRule.createMany({ data: ruleSeeds as never[] });

    const createdEvents = [];
    for (const seed of eventSeeds) {
      const created = await this.prisma.economicEvent.create({
        data: {
          ...seed,
          eventDate: new Date(seed.eventDate),
        } as never,
      });

      await this.prisma.eventImpactSummary.create({
        data: {
          eventId: created.id,
          summaryText: `${seed.title} 관련 기본 영향 요약이 생성되었습니다.`,
          relatedMarketData: '{"market":"mock"}',
        },
      });

      createdEvents.push(created);
    }

    return { message: 'Seed data created', events: createdEvents.length, rules: ruleSeeds.length };
  }
}
