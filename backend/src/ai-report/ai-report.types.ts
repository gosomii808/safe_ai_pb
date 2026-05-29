// backend/src/ai-report/ai-report.types.ts
//
// AI 리포트 응답 타입. 프론트(frontend/lib/ai-report-types.ts)와 동일하게 유지하세요.

export type AiReportStatus =
  | 'ready'
  | 'insufficient_data'
  | 'generating'
  | 'error';

export type AiReportGrade =
  | 'A+'
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D';

export type AiReportCardStatus = 'positive' | 'warning' | 'neutral' | 'danger';

export type AiReportCardId = 'risk' | 'macro' | 'volatility' | 'diversification';

export type AiReportRisk = 'low' | 'medium' | 'high';

// 취급 자산군: 현재는 주식 / 채권만. (현금/금/암호화폐 미취급)
export type AssetClass = 'EQUITY' | 'BOND';

// 채권 세부 분류 (요구: CD 91일 / 국고채 3년물 / 10년물)
export type BondType =
  | 'CD_91D'
  | 'KTB_3Y'
  | 'KTB_10Y'
  | 'BOND_ETF'
  | 'OTHER_BOND';

export interface AiReportCard {
  id: AiReportCardId | string;
  title: string;
  status: AiReportCardStatus;
  summary: string;
  details: string[];
  recommendation: string;
}

export interface AiReportProductRecommendation {
  category: string;
  description: string;
  examples: string[];
  risk: AiReportRisk;
  suitability: string;
}

export interface AiReportMacroAnalysis {
  asOfDate: string;
  krBaseRate: number | null;
  usBaseRate: number | null;
  usdKrw: number | null;
  indices: Array<{
    name: string;
    value: number | null;
    changeRate: number | null;
    date: string | null;
  }>;
  baseRateEvents: Array<{
    country: string;
    eventDate: string;
    decisionType: string | null;
    changeBp: number | null;
    surpriseBp: number | null;
    title: string;
  }>;
}

export interface AiReportResponse {
  status: AiReportStatus;
  generatedAt: string | null;
  summary: {
    totalScore: number | null;
    headline: string;
    description: string;
    grades: {
      riskManagement: AiReportGrade | null;
      profitability: AiReportGrade | null;
      diversification: AiReportGrade | null;
      liquidity: AiReportGrade | null;
    };
  };
  cards: AiReportCard[];
  macroAnalysis?: AiReportMacroAnalysis | null;
  productRecommendations: AiReportProductRecommendation[];
  dataQuality: {
    hasPortfolio: boolean;
    hasMarketPrices: boolean;
    hasAnalysisSnapshot: boolean;
    // 거시 신선도 데이터 없음 → true일 때만 거시 카드를 단정함
    hasMacroData: boolean;
    hasCorrelationData: boolean;
    hasRecencyData: boolean;
    missing: string[];
  };
  disclaimer: string;
}

export const AI_REPORT_DISCLAIMER =
  '본 리포트는 투자 참고용 정보이며, 특정 금융상품의 매수 또는 매도를 권유하지 않습니다. 투자 결정과 책임은 투자자 본인에게 있습니다.';
