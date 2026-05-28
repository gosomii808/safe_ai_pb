import { Injectable } from '@nestjs/common';

export interface PortfolioAssetForAnonymization {
  market: string;
  ticker: string;
  stockName?: string | null;
  sector?: string | null;
  quantity?: number | string | null;
  avgBuyPrice?: number | string | null;
  investmentAmount?: number | string | null;
  targetRatio?: number | null;
}

export interface AnonymizedPortfolioAsset {
  market: string;
  ticker: string;
  stockName?: string | null;
  sector?: string | null;
  targetRatio?: number | null;
  quantityBand: string;
  avgBuyPriceBand: string;
  investmentAmountBand: string;
}

@Injectable()
export class AnonymizerService {
  anonymizePortfolioForAi(
    assets: PortfolioAssetForAnonymization[],
  ): AnonymizedPortfolioAsset[] {
    return assets.map((asset) => ({
      market: asset.market,
      ticker: asset.ticker,
      stockName: asset.stockName,
      sector: asset.sector,
      targetRatio: asset.targetRatio,
      quantityBand: this.toQuantityBand(asset.quantity),
      avgBuyPriceBand: this.toKrwAmountBand(asset.avgBuyPrice),
      investmentAmountBand: this.toKrwAmountBand(asset.investmentAmount),
    }));
  }

  private toQuantityBand(value: number | string | null | undefined): string {
    const quantity = this.toNumber(value);

    if (quantity === null) {
      return 'unknown';
    }

    if (quantity <= 0) {
      return 'none';
    }

    if (quantity < 10) {
      return '1-9';
    }

    if (quantity < 100) {
      return '10-99';
    }

    if (quantity < 1_000) {
      return '100-999';
    }

    if (quantity < 10_000) {
      return '1,000-9,999';
    }

    return '10,000+';
  }

  private toKrwAmountBand(value: number | string | null | undefined): string {
    const amount = this.toNumber(value);

    if (amount === null) {
      return 'unknown';
    }

    if (amount <= 0) {
      return 'none';
    }

    if (amount < 1_000_000) {
      return 'under 1M KRW';
    }

    if (amount < 5_000_000) {
      return '1M-5M KRW';
    }

    if (amount < 10_000_000) {
      return '5M-10M KRW';
    }

    if (amount < 50_000_000) {
      return '10M-50M KRW';
    }

    if (amount < 100_000_000) {
      return '50M-100M KRW';
    }

    return '100M+ KRW';
  }

  private toNumber(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const numberValue =
      typeof value === 'number' ? value : Number(value.replace(/,/g, ''));

    return Number.isFinite(numberValue) ? numberValue : null;
  }
}
