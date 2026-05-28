import { AnonymizerService } from './anonymizer.service';
import { EncryptionService } from './encryption.service';
import { MaskingService } from './masking.service';

describe('Security services', () => {
  const originalEncryptionKey = process.env.ENCRYPTION_KEY;

  beforeEach(() => {
    process.env.ENCRYPTION_KEY = Buffer.alloc(32, 1).toString('base64');
  });

  afterEach(() => {
    if (originalEncryptionKey === undefined) {
      delete process.env.ENCRYPTION_KEY;
      return;
    }

    process.env.ENCRYPTION_KEY = originalEncryptionKey;
  });

  it('encrypts and decrypts values with AES-256-GCM', () => {
    const service = new EncryptionService();

    const encrypted = service.encrypt('user@example.com');

    expect(encrypted).toMatch(/^v1:/);
    expect(encrypted).not.toContain('user@example.com');
    expect(service.decrypt(encrypted)).toBe('user@example.com');
  });

  it('encrypts configured sensitive fields only', () => {
    const service = new EncryptionService();

    const encrypted = service.encryptSensitiveFields({
      email: 'user@example.com',
      nickname: 'safe-user',
      quantity: 15,
    });

    expect(encrypted.email).not.toBe('user@example.com');
    expect(encrypted.nickname).toBe('safe-user');
    expect(encrypted.quantity).not.toBe(15);
    expect(service.decrypt(encrypted.email)).toBe('user@example.com');
    expect(service.decrypt(encrypted.quantity as string)).toBe('15');
  });

  it('masks common sensitive display values', () => {
    const service = new MaskingService();

    expect(service.maskEmail('safe@example.com')).toBe('sa**@example.com');
    expect(service.maskPhone('010-1234-5678')).toBe('010****5678');
    expect(service.maskQuantity(1234)).toBe('12**');
    expect(service.maskAmount(1234567)).toBe('12*****');
  });

  it('anonymizes portfolio assets without raw AI-sensitive numbers', () => {
    const service = new AnonymizerService();

    const [asset] = service.anonymizePortfolioForAi([
      {
        market: 'KRX',
        ticker: '005930',
        stockName: 'Samsung Electronics',
        sector: 'Semiconductor',
        quantity: 123,
        avgBuyPrice: 71000,
        investmentAmount: 8733000,
        targetRatio: 30,
      },
    ]);

    expect(asset).toEqual({
      market: 'KRX',
      ticker: '005930',
      stockName: 'Samsung Electronics',
      sector: 'Semiconductor',
      targetRatio: 30,
      quantityBand: '100-999',
      avgBuyPriceBand: 'under 1M KRW',
      investmentAmountBand: '5M-10M KRW',
    });
    expect(asset).not.toHaveProperty('quantity');
    expect(asset).not.toHaveProperty('avgBuyPrice');
    expect(asset).not.toHaveProperty('investmentAmount');
  });
});
