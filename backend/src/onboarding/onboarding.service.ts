import { Injectable } from '@nestjs/common';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';

/**
 * OnboardingService는 온보딩 데이터를 처리하는 비즈니스 로직을 담당합니다.
 * 현재는 단순히 전달받은 DTO를 반환하는 형태이며, 추후 암호화 및 DB 저장 로직을 추가할 예정입니다.
 */
@Injectable()
export class OnboardingService {
  async processOnboarding(dto: CreateOnboardingDto) {
    // TODO: 데이터 암호화 및 영속성 로직 구현
    return { message: 'Onboarding data received', data: dto };
  }
}
