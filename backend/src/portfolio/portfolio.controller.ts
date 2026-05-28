import { Controller, Get, Param, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':userId/analysis')
  getPortfolioAnalysis(
    @Param('userId') userId: string,
    @Query('analysisDate') analysisDate?: string,
  ) {
    return this.portfolioService.analyzePortfolio(userId, analysisDate);
  }
}
