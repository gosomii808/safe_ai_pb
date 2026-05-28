// frontend/lib/ai-report-types.ts
// 백엔드 backend/src/ai-report/ai-report.types.ts 와 동일하게 유지하세요.

export type AiReportStatus =
  | "ready"
  | "insufficient_data"
  | "generating"
  | "error";

export type AiReportGrade =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D";

export type AiReportCardStatus = "positive" | "warning" | "neutral" | "danger";

export type AiReportRisk = "low" | "medium" | "high";

export interface AiReportCard {
  id: "risk" | "macro" | "volatility" | "diversification" | string;
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
  productRecommendations: AiReportProductRecommendation[];
  dataQuality: {
    hasPortfolio: boolean;
    hasMarketPrices: boolean;
    hasAnalysisSnapshot: boolean;
    hasMacroData: boolean;
    hasCorrelationData: boolean;
    hasRecencyData: boolean;
    missing: string[];
  };
  disclaimer: string;
}
