import { Injectable } from '@nestjs/common';
import { createHash, pbkdf2Sync, randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../security/encryption.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';

const ONBOARDING_SUBMIT_ACTION = 'ONBOARDING_SUBMIT';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async processOnboarding(dto: CreateOnboardingDto) {
    const createdUser = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          nickname: dto.personalInfo.nickname,
          email: this.encryptRequired(dto.personalInfo.email),
          emailHash: this.hashEmail(dto.personalInfo.email),
          passwordHash: this.hashPassword(dto.personalInfo.password),
          phone: this.encryptRequired(dto.personalInfo.phone),
          ageRange: dto.personalInfo.ageRange,
          occupation: dto.personalInfo.occupation,
          investmentProfile: {
            create: {
              riskType: this.encryptRequired(dto.investmentProfile.riskType),
              investmentGoal: this.encryptRequired(
                dto.investmentProfile.investmentGoal,
              ),
              investmentExperience: dto.investmentProfile.investmentExperience,
              preferredAssets: dto.investmentProfile.preferredAssets
                ? JSON.stringify(dto.investmentProfile.preferredAssets)
                : undefined,
            },
          },
          portfolioAssets: {
            create: dto.portfolioAssets.map((asset) => ({
              market: asset.market,
              ticker: asset.ticker,
              stockName: asset.stockName,
              sector: asset.sector,
              quantity: this.encryptRequired(asset.quantity),
              avgBuyPrice: this.encryptOptional(asset.avgBuyPrice),
              investmentAmount: this.encryptOptional(asset.investmentAmount),
              targetRatio: asset.targetRatio,
            })),
          },
        },
        select: { id: true },
      });

      await tx.accessLog.create({
        data: {
          userId: user.id,
          action: ONBOARDING_SUBMIT_ACTION,
          endpoint: '/onboarding',
          method: 'POST',
          success: true,
        },
      });

      return user;
    });

    return {
      userId: createdUser.id,
      session: this.createLocalSession(createdUser.id),
      message: '온보딩 정보가 안전하게 저장되었습니다.',
      portfolioAssetCount: dto.portfolioAssets.length,
    };
  }

  private encryptRequired(value: string | number): string {
    return this.encryptionService.encrypt(value) as string;
  }

  private encryptOptional(value: number | undefined): string | undefined {
    return this.encryptionService.encrypt(value) as string | undefined;
  }

  private hashEmail(email: string): string {
    return createHash('sha256')
      .update(email.trim().toLowerCase())
      .digest('hex');
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(16);
    const hash = pbkdf2Sync(password, salt, 120_000, 32, 'sha256');
    return `pbkdf2_sha256:120000:${salt.toString('base64')}:${hash.toString(
      'base64',
    )}`;
  }

  private createLocalSession(userId: string): string {
    return `local:${userId}:${Date.now()}`;
  }
}
