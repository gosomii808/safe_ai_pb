import { OnboardingPayload } from "@/lib/onboarding-types"
import type { AiReportResponse } from "@/lib/ai-report-types"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3001"

export interface SubmitOnboardingResponse {
  userId: string
  session: string
  message: string
  portfolioAssetCount: number
}

export interface LoginResponse {
  userId: string
  nickname: string
  session: string
  message: string
}

export interface PortfolioAllocation {
  name: string
  weight: number
  valuationAmount: number
}

export interface PortfolioAssetSummary {
  ticker: string
  stockName: string | null
  market: string
  assetType: "domestic_stock" | "overseas_stock"
  sector: string | null
  valuationAmount: number
  profitLoss: number
  weight: number
  returnRate: number | null
  priceDate: string
  riskComment: string
}

export interface PortfolioAnalysisResponse {
  userId: string
  analysisDate: string
  status?: "ok" | "partial" | "insufficient_data"
  reason?: string
  totalInvestedAmount?: number
  totalValuationAmount?: number
  totalProfitLoss?: number
  totalReturnRate?: number | null
  riskLevel?: "low" | "medium" | "high"
  concentrationScore?: number
  marketAllocation?: PortfolioAllocation[]
  assetTypeAllocation?: PortfolioAllocation[]
  sectorAllocation?: PortfolioAllocation[]
  assetSummaries?: PortfolioAssetSummary[]
  missingData?: string[]
  summary?: string
  disclaimer: string
}

export async function submitOnboarding(
  payload: OnboardingPayload
): Promise<SubmitOnboardingResponse> {
  const response = await fetch(`${API_BASE_URL}/onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function getLatestAiReport(
  userId: string,
  refine = false
): Promise<AiReportResponse> {
  const params = new URLSearchParams({ userId })
  if (refine) params.set("refine", "true")

  const response = await fetch(
    `${API_BASE_URL}/ai-report/latest?${params.toString()}`,
    { cache: "no-store" }
  )

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function getPortfolioAnalysis(
  userId: string
): Promise<PortfolioAnalysisResponse> {
  const response = await fetch(`${API_BASE_URL}/portfolio/${userId}/analysis`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json()

    if (typeof body?.message === "string") {
      return body.message
    }

    if (Array.isArray(body?.message)) {
      return body.message.join("\n")
    }
  } catch {
    // Use the generic message below when the backend returns a non-JSON error.
  }

  return "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요."
}
