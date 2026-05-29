import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OnboardingModule } from './onboarding/onboarding.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { SecurityModule } from './security/security.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AiReportModule } from './ai-report/ai-report.module';
import { AuthModule } from './auth/auth.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    PrismaModule,
    SecurityModule,
    OnboardingModule,
    EventsModule,
    PortfolioModule,
    AiReportModule,
    AuthModule,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

