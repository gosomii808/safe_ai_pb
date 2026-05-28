jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { EncryptionService } from '../security/encryption.service';
import { OnboardingService } from './onboarding.service';

describe('OnboardingService', () => {
  it('stores onboarding data with encrypted sensitive fields and access log', async () => {
    const userCreate = jest.fn().mockResolvedValue({ id: 'user_123' });
    const accessLogCreate = jest.fn().mockResolvedValue({ id: 'log_123' });
    const transaction = jest.fn(async (callback) =>
      callback({
        user: { create: userCreate },
        accessLog: { create: accessLogCreate },
      }),
    );
    const encrypt = jest.fn((value: string | number | undefined) =>
      value === undefined ? undefined : `encrypted:${value}`,
    );
    const service = new OnboardingService(
      { $transaction: transaction } as never,
      { encrypt } as unknown as EncryptionService,
    );

    const result = await service.processOnboarding({
      personalInfo: {
        nickname: 'safe-user',
        email: 'safe@example.com',
        phone: '010-1234-5678',
      },
      investmentProfile: {
        riskType: 'MEDIUM',
        investmentGoal: 'retirement',
        preferredAssets: ['stocks', 'etf'],
      },
      portfolioAssets: [
        {
          market: 'KRX',
          ticker: '005930',
          quantity: 3,
          avgBuyPrice: 71000,
          investmentAmount: 213000,
        },
        {
          market: 'NASDAQ',
          ticker: 'AAPL',
          quantity: 2,
        },
      ],
    });

    expect(result).toEqual({
      userId: 'user_123',
      message: '온보딩 정보가 안전하게 저장되었습니다.',
      portfolioAssetCount: 2,
    });
    expect(userCreate).toHaveBeenCalledWith({
      data: {
        nickname: 'safe-user',
        email: 'encrypted:safe@example.com',
        phone: 'encrypted:010-1234-5678',
        ageRange: undefined,
        occupation: undefined,
        investmentProfile: {
          create: {
            riskType: 'encrypted:MEDIUM',
            investmentGoal: 'encrypted:retirement',
            investmentExperience: undefined,
            preferredAssets: '["stocks","etf"]',
          },
        },
        portfolioAssets: {
          create: [
            {
              market: 'KRX',
              ticker: '005930',
              stockName: undefined,
              sector: undefined,
              quantity: 'encrypted:3',
              avgBuyPrice: 'encrypted:71000',
              investmentAmount: 'encrypted:213000',
              targetRatio: undefined,
            },
            {
              market: 'NASDAQ',
              ticker: 'AAPL',
              stockName: undefined,
              sector: undefined,
              quantity: 'encrypted:2',
              avgBuyPrice: undefined,
              investmentAmount: undefined,
              targetRatio: undefined,
            },
          ],
        },
      },
      select: { id: true },
    });
    expect(accessLogCreate).toHaveBeenCalledWith({
      data: {
        userId: 'user_123',
        action: 'ONBOARDING_SUBMIT',
        endpoint: '/onboarding',
        method: 'POST',
        success: true,
      },
    });
    expect(encrypt).toHaveBeenCalledWith('safe@example.com');
    expect(encrypt).toHaveBeenCalledWith('010-1234-5678');
    expect(encrypt).toHaveBeenCalledWith('MEDIUM');
    expect(encrypt).toHaveBeenCalledWith('retirement');
    expect(encrypt).toHaveBeenCalledWith(3);
    expect(encrypt).toHaveBeenCalledWith(71000);
    expect(encrypt).toHaveBeenCalledWith(213000);
  });
});
