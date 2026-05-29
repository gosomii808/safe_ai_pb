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
  quantity: number
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

export interface SecurityAccessLog {
  id: string
  action: string
  endpoint: string
  method: string
  ipAddress: string | null
  userAgent: string | null
  success: boolean
  createdAt: string
}

export interface SecurityEventLog {
  id: string
  eventType: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | string
  description: string
  metadata: string | null
  ipAddress: string | null
  createdAt: string
}

export interface SecurityAiRequestLog {
  id: string
  requestType: string
  modelName: string | null
  tokenUsage: number | null
  latencyMs: number | null
  success: boolean
  errorCode: string | null
  createdAt: string
}

export interface SecurityStatusItem {
  name: string
  status: "encrypted" | "hashed" | "masked" | "missing" | "active" | string
  healthy: boolean
  description: string
}

export interface SecurityOverviewResponse {
  userId: string
  securityScore: number
  recentAccessLogs: SecurityAccessLog[]
  recentSecurityEvents: SecurityEventLog[]
  recentAiRequestLogs: SecurityAiRequestLog[]
  encryptionStatus: SecurityStatusItem[]
  privacyStatus: {
    maskingEnabled: boolean
    rawSensitiveValuesExposed: boolean
    localSessionOnly: boolean
    message: string
  }
  summaryMessage: string
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

export interface MacroWidgetData {
  kospi: { value: number; change: number; changePercent: number; data: { time: string; value: number }[] }
  nasdaq: { value: number; change: number; changePercent: number; data: { time: string; value: number }[] }
  sp500: { value: number; change: number; changePercent: number; data: { time: string; value: number }[] }
  usdkrw: { value: number; change: number; changePercent: number; data: { time: string; value: number }[] }
}

export async function getMacroWidgets(): Promise<MacroWidgetData> {
  const response = await fetch(`${API_BASE_URL}/portfolio/macro-widgets`, {
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

export async function getSecurityOverview(
  userId: string
): Promise<SecurityOverviewResponse> {
  const params = new URLSearchParams({ userId })
  const response = await fetch(
    `${API_BASE_URL}/security/overview?${params.toString()}`,
    { cache: "no-store" }
  )

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export interface EditableAsset {
  id?: string
  market: string
  ticker: string
  stockName?: string | null
  sector?: string | null
  quantity: number
  avgBuyPrice: number
  investmentAmount?: number
  targetRatio?: number
}

export async function getPortfolioAssets(
  userId: string
): Promise<any[]> {
  const response = await fetch(`${API_BASE_URL}/portfolio/${userId}/assets`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function addPortfolioAsset(
  userId: string,
  asset: EditableAsset
): Promise<{ id: string; message: string }> {
  const response = await fetch(`${API_BASE_URL}/portfolio/${userId}/assets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(asset),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function updatePortfolioAsset(
  userId: string,
  assetId: string,
  asset: EditableAsset
): Promise<{ message: string }> {
  const response = await fetch(
    `${API_BASE_URL}/portfolio/${userId}/assets/${assetId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asset),
    }
  )

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function deletePortfolioAsset(
  userId: string,
  assetId: string
): Promise<{ message: string }> {
  const response = await fetch(
    `${API_BASE_URL}/portfolio/${userId}/assets/${assetId}`,
    {
      method: "DELETE",
    }
  )

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
