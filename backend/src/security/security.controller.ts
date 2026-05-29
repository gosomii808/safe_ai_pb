import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SecurityOverviewService } from './security-overview.service';

@Controller('security')
export class SecurityController {
  constructor(
    private readonly securityOverviewService: SecurityOverviewService,
  ) {}

  @Get('overview')
  getOverview(@Query('userId') userId?: string) {
    if (!userId) {
      throw new BadRequestException('userId가 필요합니다.');
    }

    return this.securityOverviewService.getOverview(userId);
  }
}
