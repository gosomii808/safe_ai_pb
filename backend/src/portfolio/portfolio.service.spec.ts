import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../security/encryption.service';
import { PortfolioService } from './portfolio.service';

jest.mock(
  '../../generated/prisma/client.js',
  () => ({
    PrismaClient: class {},
  }),
  { virtual: true },
);

describe('PortfolioService', () => {
  let service: PortfolioService;
  const prisma = {
    portfolioAsset: {
      findMany: jest.fn(),
    },
    portfolioAnalysisSnapshot: {
      create: jest.fn(),
    },
    $queryRaw: jest.fn(),
  };
  const encryption = {
    decrypt: jest.fn((value: string) => value.replace('enc:', '')),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        { provide: PrismaService, useValue: prisma },
        { provide: EncryptionService, useValue: encryption },
      ],
    }).compile();

    service = module.get(PortfolioService);
  });

  it('calculates analysis from DB prices without exposing encrypted raw values', async () => {
    prisma.portfolioAsset.findMany.mockResolvedValue([
      {
        ticker: '005930',
        stockName: '삼성전자',
        market: 'KOSPI',
        sector: '반도체',
        quantity: 'enc:10',
        avgBuyPrice: 'enc:70000',
        investmentAmount: 'enc:700000',
      },
      {
        ticker: 'AAPL',
        stockName: 'Apple Inc.',
        market: 'NASDAQ',
        sector: 'Technology',
        quantity: 'enc:2',
        avgBuyPrice: 'enc:150',
        investmentAmount: 'enc:300',
      },
    ]);
    prisma.$queryRaw
      .mockResolvedValueOnce([{ exchangeRate: 1300, date: '2026-05-28' }])
      .mockResolvedValueOnce([
        {
          ticker: '005930',
          market: 'KOSPI',
          price: 75000,
          priceDate: '2026-05-28',
        },
      ])
      .mockResolvedValueOnce([
        {
          symbol: 'AAPL',
          close: 200,
          priceDate: '2026-05-28',
        },
      ]);
    prisma.portfolioAnalysisSnapshot.create.mockResolvedValue({});

    const result = await service.analyzePortfolio('user-1', '2026-05-28');

    expect(result.status).toBe('ok');
    expect(result.totalValuationAmount).toBe(1270000);
    expect(result.assetSummaries).toHaveLength(2);
    expect(JSON.stringify(result)).not.toContain('enc:');
    expect(JSON.stringify(result)).not.toContain('avgBuyPrice');
    expect(prisma.portfolioAnalysisSnapshot.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: 'user-1',
          totalValue: 1270000,
        }),
      }),
    );
  });
});
