import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';

/**
 * OnboardingController는 온보딩 관련 HTTP 요청을 처리합니다.
 */
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  /**
   * POST /onboarding
   * 온보딩 데이터를 제출합니다.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async submitOnboarding(@Body() createOnboardingDto: CreateOnboardingDto) {
    return this.onboardingService.processOnboarding(createOnboardingDto);
  }
}
