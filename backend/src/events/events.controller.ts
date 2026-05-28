import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { eventSeeds, ruleSeeds } from './data/events.seed';
import { GetEventsQueryDto } from './dto/get-events-query.dto';
import { EventsService } from './events.service';

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

  @Get('macro-series')
  getMacroSeries(@Query('limit') limit?: string) {
    return this.eventsService.getMacroSeries(limit ? Number(limit) : undefined);
  }

  @Get('sectors/sensitivity')
  getSectorSensitivity() {
    return this.eventsService.getSectorSensitivity();
  }

  @Get(':id/reaction')
  getMarketReactionByEventId(@Param('id') id: string) {
    return this.eventsService.getMarketReactionByEventId(id);
  }

  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @Post('seed')
  async seedEvents() {
    await this.prisma.eventImpactRule.deleteMany();
    await this.prisma.economicEvent.deleteMany();

    const createdEvents: { id: string }[] = [];

    for (const seed of eventSeeds) {
      const created = await this.prisma.economicEvent.create({
        data: {
          ...seed,
          eventDate: new Date(seed.eventDate),
        } as never,
      });

      await this.prisma.eventImpactRule.createMany({
        data: ruleSeeds.map((rule) => ({
          ...rule,
          economicEventId: created.id,
        })) as never[],
      });

      createdEvents.push(created);
    }

    return {
      message: 'Seed data created',
      events: createdEvents.length,
      rules: createdEvents.length * ruleSeeds.length,
    };
  }
}
