// backend/src/ai-report/ai-report.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SecurityModule } from '../security/security.module';
import { AiReportController } from './ai-report.controller';
import { AiReportService } from './ai-report.service';
import { AiReportRefinerService } from './ai-report-refiner.service';

@Module({
  // PrismaService, EncryptionService가 각 모듈에서 export 되어 있어야 합니다.
  // (기존 OnboardingModule/EventsModule가 동일하게 쓰고 있다면 그대로 import)
  imports: [PrismaModule, SecurityModule],
  controllers: [AiReportController],
  providers: [AiReportService, AiReportRefinerService],
})
export class AiReportModule {}
