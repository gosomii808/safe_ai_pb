import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OnboardingModule } from './onboarding/onboarding.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [PrismaModule, OnboardingModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
