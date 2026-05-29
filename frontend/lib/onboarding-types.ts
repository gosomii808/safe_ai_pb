export interface PersonalInfo {
  nickname: string;
  email: string;
  password: string;
  phone: string;
  ageRange: string;
  occupation: string;
}

export interface InvestmentProfile {
  riskType: string;
  investmentGoal: string;
  investmentExperience: string;
  preferredAssets: string[];
}

export interface PortfolioAssetInput {
  market: string;
  ticker: string;
  stockName: string;
  sector: string;
  quantity: number;
  avgBuyPrice: number;
  investmentAmount: number;
  targetRatio: number;
}

export interface OnboardingPayload {
  personalInfo: PersonalInfo;
  investmentProfile: InvestmentProfile;
  portfolioAssets: PortfolioAssetInput[];
}
