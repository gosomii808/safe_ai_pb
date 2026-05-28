// backend/src/ai-report/ai-report.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { AiReportService } from './ai-report.service';
import { GetAiReportQueryDto } from './dto/get-ai-report-query.dto';
import { AiReportResponse } from './ai-report.types';

@Controller('ai-report')
export class AiReportController {
  constructor(private readonly service: AiReportService) {}

  // GET /ai-report/latest?userId=...&refine=true
  // MVP: userId를 query로 받습니다. TODO(auth): 인증 컨텍스트로 대체.
  @Get('latest')
  async getLatest(
    @Query() query: GetAiReportQueryDto,
  ): Promise<AiReportResponse> {
    const refine = query.refine === 'true' || query.refine === '1';
    return this.service.getLatest(query.userId, refine);
  }
}
