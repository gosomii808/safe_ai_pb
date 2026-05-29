import 'dotenv/config';
import { PrismaService } from './prisma/prisma.service';
import { EncryptionService } from './security/encryption.service';

async function seedDemoUser() {
  const prisma = new PrismaService();
  const encryption = new EncryptionService();

  const encryptRequired = (value: string | number): string => {
    return encryption.encrypt(value) as string;
  };

  const encryptOptional = (value: number | undefined): string | undefined => {
    return encryption.encrypt(value) as string | undefined;
  };

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          nickname: '시연용 데모 사용자',
          email: encryptRequired('demo@safepb.ai'),
          phone: encryptRequired('010-0000-0000'),
          ageRange: '40대',
          occupation: '전문직',
          investmentProfile: {
            create: {
              riskType: encryptRequired('공격투자형'),
              investmentGoal: encryptRequired('장기 자산 증식 및 은퇴 자금 마련'),
              investmentExperience: '5년 이상',
              preferredAssets: JSON.stringify(['EQUITY', 'BOND']),
            },
          },
          portfolioAssets: {
            create: [
              {
                market: 'KRX',
                ticker: '005930',
                stockName: '삼성전자',
                sector: 'IT/반도체',
                quantity: encryptRequired(500),
                avgBuyPrice: encryptOptional(68000),
                investmentAmount: encryptOptional(34000000),
                targetRatio: 25.0,
              },
              {
                market: 'KRX',
                ticker: '000660',
                stockName: 'SK하이닉스',
                sector: 'IT/반도체',
                quantity: encryptRequired(200),
                avgBuyPrice: encryptOptional(130000),
                investmentAmount: encryptOptional(26000000),
                targetRatio: 25.0,
              },
              {
                market: 'KRX',
                ticker: '035420',
                stockName: 'NAVER',
                sector: 'IT',
                quantity: encryptRequired(100),
                avgBuyPrice: encryptOptional(190000),
                investmentAmount: encryptOptional(19000000),
                targetRatio: 15.0,
              },
              {
                market: 'NASDAQ',
                ticker: 'AAPL',
                stockName: 'Apple Inc.',
                sector: 'Tech',
                quantity: encryptRequired(150),
                avgBuyPrice: encryptOptional(170),
                investmentAmount: encryptOptional(25500),
                targetRatio: 15.0,
              },
              {
                market: 'NASDAQ',
                ticker: 'NVDA',
                stockName: 'NVIDIA Corp.',
                sector: 'Tech',
                quantity: encryptRequired(120),
                avgBuyPrice: encryptOptional(850),
                investmentAmount: encryptOptional(102000),
                targetRatio: 10.0,
              },
              {
                market: 'NYSE',
                ticker: 'SPY',
                stockName: 'SPDR S&P 500 ETF Trust',
                sector: 'Index',
                quantity: encryptRequired(50),
                avgBuyPrice: encryptOptional(500),
                investmentAmount: encryptOptional(25000),
                targetRatio: 10.0,
              },
            ],
          },
        },
        select: { id: true },
      });

      // 온보딩 제출 접속 기록 모방 생성
      await tx.accessLog.create({
        data: {
          userId: user.id,
          action: 'ONBOARDING_SUBMIT',
          endpoint: '/onboarding',
          method: 'POST',
          success: true,
        },
      });

      return user;
    });

    console.log('==================================================');
    console.log('🎉 Demo User Seed Completed successfully!');
    console.log(`Demo User ID: ${result.id}`);
    console.log('==================================================');
  } catch (error) {
    console.error('❌ Demo user seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDemoUser();
