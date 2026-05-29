import { Controller, Get, Param, Query, Post, Patch, Delete, Body } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('macro-widgets')
  getMacroWidgets() {
    return this.portfolioService.getMacroWidgets();
  }

  @Get(':userId/analysis')
  getPortfolioAnalysis(
    @Param('userId') userId: string,
    @Query('analysisDate') analysisDate?: string,
  ) {
    return this.portfolioService.analyzePortfolio(userId, analysisDate);
  }

  @Get(':userId/assets')
  getPortfolioAssets(@Param('userId') userId: string) {
    return this.portfolioService.getAssets(userId);
  }

  @Post(':userId/assets')
  addPortfolioAsset(@Param('userId') userId: string, @Body() body: any) {
    return this.portfolioService.addAsset(userId, body);
  }

  @Patch(':userId/assets/:assetId')
  updatePortfolioAsset(
    @Param('userId') userId: string,
    @Param('assetId') assetId: string,
    @Body() body: any,
  ) {
    return this.portfolioService.updateAsset(userId, assetId, body);
  }

  @Delete(':userId/assets/:assetId')
  deletePortfolioAsset(
    @Param('userId') userId: string,
    @Param('assetId') assetId: string,
  ) {
    return this.portfolioService.deleteAsset(userId, assetId);
  }
}
