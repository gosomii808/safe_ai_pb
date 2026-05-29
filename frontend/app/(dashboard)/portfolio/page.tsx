"use client"

import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  BarChart3,
  Loader2,
  TrendingDown,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import {
  AllocationPieChart,
  HoldingsTable,
  PerformanceChart,
  RiskIndicator,
  SectorConcentration,
} from "@/components/portfolio/charts"
import { DashboardWidgets } from "@/components/dashboard/widgets"
import { cn } from "@/lib/utils"
import {
  getPortfolioAnalysis,
  getPortfolioAssets,
  addPortfolioAsset,
  updatePortfolioAsset,
  deletePortfolioAsset,
  type PortfolioAnalysisResponse,
  type PortfolioAssetSummary,
} from "@/lib/api"
import { getCurrencyByMarket } from "@/lib/currency"

type StatCard = {
  title: string
  value: string
  change?: string | null
  changePercent?: string | null
  positive: boolean
  icon: LucideIcon
}

function formatCurrency(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "-"
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatPercent(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "-"
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
}

export default function PortfolioPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [resolvedUserId, setResolvedUserId] = useState(false)
  const [analysis, setAnalysis] = useState<PortfolioAnalysisResponse | null>(null)
  const [rawAssets, setRawAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    market: "KOSPI",
    ticker: "",
    stockName: "",
    sector: "",
    quantity: 0,
    avgBuyPrice: 0,
    targetRatio: 0,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const refreshData = async (uid: string) => {
    setLoading(true)
    setError(null)
    try {
      const [analysisData, assetsData] = await Promise.all([
        getPortfolioAnalysis(uid),
        getPortfolioAssets(uid)
      ])
      setAnalysis(analysisData)
      setRawAssets(assetsData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("safe_pb_user_id")
    setUserId(storedUserId)
    setResolvedUserId(true)
  }, [])

  useEffect(() => {
    if (!resolvedUserId) return
    if (!userId) {
      setLoading(false)
      return
    }
    refreshData(userId)
  }, [resolvedUserId, userId])

  const handleOpenAddModal = () => {
    setModalMode("add")
    setEditingAssetId(null)
    setFormData({
      market: "KOSPI",
      ticker: "",
      stockName: "",
      sector: "",
      quantity: 0,
      avgBuyPrice: 0,
      targetRatio: 0,
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const handleEditAsset = (holding: PortfolioAssetSummary) => {
    const match = rawAssets.find(
      (a) =>
        a.ticker.toUpperCase() === holding.ticker.toUpperCase() &&
        a.market.toUpperCase() === holding.market.toUpperCase()
    )
    if (match) {
      setModalMode("edit")
      setEditingAssetId(match.id)
      setFormData({
        market: match.market,
        ticker: match.ticker,
        stockName: match.stockName || "",
        sector: match.sector || "",
        quantity: match.quantity || 0,
        avgBuyPrice: match.avgBuyPrice || 0,
        targetRatio: match.targetRatio || 0,
      })
      setFormErrors({})
      setIsModalOpen(true)
    } else {
      setModalMode("edit")
      setEditingAssetId(null)
      setFormData({
        market: holding.market,
        ticker: holding.ticker,
        stockName: holding.stockName || "",
        sector: holding.sector || "",
        quantity: holding.quantity || 0,
        avgBuyPrice: 0,
        targetRatio: 0,
      })
      setFormErrors({})
      setIsModalOpen(true)
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.ticker.trim()) errors.ticker = "종목코드를 입력해 주세요."
    if (!formData.stockName.trim()) errors.stockName = "종목명을 입력해 주세요."
    if (!formData.sector.trim()) errors.sector = "업종/섹터를 입력해 주세요."
    if (formData.quantity <= 0) errors.quantity = "수량은 0보다 커야 합니다."
    if (formData.avgBuyPrice <= 0) errors.avgBuyPrice = "평균 매수가는 0보다 커야 합니다."
    if (formData.targetRatio < 0 || formData.targetRatio > 100) {
      errors.targetRatio = "목표 비중은 0~100% 사이여야 합니다."
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
    if (formErrors[key]) {
      setFormErrors((prev) => ({
        ...prev,
        [key]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || !userId) return

    setSubmitting(true)
    try {
      if (modalMode === "add") {
        await addPortfolioAsset(userId, {
          market: formData.market,
          ticker: formData.ticker,
          stockName: formData.stockName,
          sector: formData.sector,
          quantity: formData.quantity,
          avgBuyPrice: formData.avgBuyPrice,
          targetRatio: formData.targetRatio,
        })
      } else {
        if (editingAssetId) {
          await updatePortfolioAsset(userId, editingAssetId, {
            market: formData.market,
            ticker: formData.ticker,
            stockName: formData.stockName,
            sector: formData.sector,
            quantity: formData.quantity,
            avgBuyPrice: formData.avgBuyPrice,
            targetRatio: formData.targetRatio,
          })
        }
      }
      setIsModalOpen(false)
      if (userId) refreshData(userId)
    } catch (err: any) {
      alert(err.message || "오류가 발생했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!userId || !editingAssetId) return
    if (!confirm("이 종목을 포트폴리오에서 삭제하시겠습니까?")) return

    setSubmitting(true)
    try {
      await deletePortfolioAsset(userId, editingAssetId)
      setIsModalOpen(false)
      if (userId) refreshData(userId)
    } catch (err: any) {
      alert(err.message || "삭제 중 오류가 발생했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "좋은 아침이에요" : hour < 18 ? "좋은 오후예요" : "좋은 저녁이에요"

  const stats = useMemo<StatCard[]>(() => {
    const profitLoss = analysis?.totalProfitLoss ?? null
    const returnRate = analysis?.totalReturnRate ?? null

    return [
      {
        title: "총 평가금액",
        value: formatCurrency(analysis?.totalValuationAmount),
        change: "총 손익",
        changePercent: formatCurrency(profitLoss),
        positive: (profitLoss ?? 0) >= 0,
        icon: Wallet,
      },
      {
        title: "총 투자금액",
        value: formatCurrency(analysis?.totalInvestedAmount),
        positive: true,
        icon: BarChart3,
      },
      {
        title: "총 손익",
        value: formatCurrency(profitLoss),
        change: "수익률",
        changePercent: formatPercent(returnRate),
        positive: (profitLoss ?? 0) >= 0,
        icon: (profitLoss ?? 0) >= 0 ? TrendingUp : TrendingDown,
      },
      {
        title: "포트폴리오 수익률",
        value: formatPercent(returnRate),
        change: analysis?.analysisDate ?? null,
        changePercent: "분석 기준일",
        positive: (returnRate ?? 0) >= 0,
        icon: (returnRate ?? 0) >= 0 ? TrendingUp : TrendingDown,
      },
    ]
  }, [analysis])

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {greeting}
        </h1>
        <p className="text-muted-foreground">
          실제 저장된 포트폴리오와 시장 데이터 기준으로 현황을 확인하세요.
        </p>
      </div>

      <DashboardWidgets />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border pt-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">포트폴리오 분석</h2>
          <p className="mt-1 text-muted-foreground">
            평가금액, 손익, 비중, 리스크 요약을 백엔드 분석 API에서 불러옵니다.
          </p>
        </div>
        {!loading && userId && (
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2.5 text-sm transition-colors cursor-pointer shrink-0"
          >
            <span className="text-lg font-bold leading-none">+</span> 종목 추가
          </button>
        )}
      </div>

      {loading && (
        <StateCard
          icon={<Loader2 className="h-6 w-6 animate-spin text-primary" />}
          title="포트폴리오 분석을 불러오는 중입니다."
          description="저장된 보유 종목과 최신 시장 가격을 조회하고 있습니다."
        />
      )}

      {!loading && !userId && (
        <StateCard
          icon={<AlertTriangle className="h-6 w-6 text-warning" />}
          title="온보딩 정보가 없습니다."
          description="포트폴리오 분석을 보려면 먼저 온보딩에서 보유 종목을 저장해 주세요."
          action={
            <Link
              href="/onboarding"
              className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              온보딩 시작하기
            </Link>
          }
        />
      )}

      {!loading && userId && error && (
        <StateCard
          icon={<AlertTriangle className="h-6 w-6 text-red-400" />}
          title="포트폴리오 분석을 불러오지 못했습니다."
          description={error}
        />
      )}

      {!loading && analysis?.status === "insufficient_data" && (
        <StateCard
          icon={<AlertTriangle className="h-6 w-6 text-warning" />}
          title="분석에 필요한 데이터가 부족합니다."
          description={
            analysis.reason ??
            "보유 종목, 가격, 투자금액 중 일부 데이터가 부족해 전체 분석을 만들 수 없습니다."
          }
        />
      )}

      {!loading && analysis && analysis.status !== "insufficient_data" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="glass-card rounded-2xl p-5 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                {stat.changePercent && (
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">
                      {stat.change}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        stat.positive ? "text-green-400" : "text-red-400"
                      )}
                    >
                      {stat.changePercent}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {analysis.status === "partial" && (analysis.missingData?.length ?? 0) > 0 && (
            <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
              일부 자산은 데이터 부족으로 분석에서 제외되었습니다:{" "}
              {analysis.missingData?.join(", ")}
            </div>
          )}

          {analysis.summary && (
            <div className="glass-card rounded-2xl p-5">
              <p className="font-medium text-foreground">{analysis.summary}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {analysis.disclaimer}
              </p>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            <AllocationPieChart data={analysis.assetTypeAllocation ?? []} />
            <SectorConcentration data={analysis.sectorAllocation ?? []} />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PerformanceChart totalReturnRate={analysis.totalReturnRate} />
            </div>
            <RiskIndicator analysis={analysis} />
          </div>

          <HoldingsTable
            holdings={analysis.assetSummaries ?? []}
            onEdit={handleEditAsset}
          />
        </>
      )}

      {/* 종목 추가/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg rounded-2xl border border-border/80 p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <h3 className="text-lg font-bold text-foreground">
                {modalMode === "add" ? "보유 종목 추가" : "보유 종목 수정"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold p-1"
              >
                닫기
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">시장</label>
                  <select
                    value={formData.market}
                    onChange={(e) => handleFieldChange("market", e.target.value)}
                    disabled={modalMode === "edit"}
                    className="h-10 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:outline-none disabled:opacity-50"
                  >
                    <option value="KOSPI">KOSPI</option>
                    <option value="KOSDAQ">KOSDAQ</option>
                    <option value="NASDAQ">NASDAQ</option>
                    <option value="NYSE">NYSE</option>
                    <option value="ETF">ETF</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">종목코드</label>
                  <input
                    value={formData.ticker}
                    onChange={(e) => handleFieldChange("ticker", e.target.value.toUpperCase())}
                    placeholder="예: 005930 또는 AAPL"
                    disabled={modalMode === "edit"}
                    className="h-10 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none disabled:opacity-50"
                  />
                  {formErrors.ticker && <p className="text-[10px] font-semibold text-red-400">{formErrors.ticker}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">종목명</label>
                  <input
                    value={formData.stockName}
                    onChange={(e) => handleFieldChange("stockName", e.target.value)}
                    placeholder="예: 삼성전자"
                    className="h-10 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.stockName && <p className="text-[10px] font-semibold text-red-400">{formErrors.stockName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">업종/섹터</label>
                  <input
                    value={formData.sector}
                    onChange={(e) => handleFieldChange("sector", e.target.value)}
                    placeholder="예: 반도체"
                    className="h-10 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.sector && <p className="text-[10px] font-semibold text-red-400">{formErrors.sector}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">수량 (주수)</label>
                  <input
                    type="number"
                    min="0.001"
                    step="any"
                    value={formData.quantity || ""}
                    onChange={(e) => handleFieldChange("quantity", e.target.value === "" ? 0 : Number(e.target.value))}
                    className="h-10 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.quantity && <p className="text-[10px] font-semibold text-red-400">{formErrors.quantity}</p>}
                </div>

                <div className="space-y-1 col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-muted-foreground">
                      평균매수가 ({getCurrencyByMarket(formData.market)})
                    </label>
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                      {getCurrencyByMarket(formData.market) === "KRW" ? "KRW (원화)" : "USD (달러)"}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={formData.avgBuyPrice || ""}
                    placeholder={getCurrencyByMarket(formData.market) === "KRW" ? "예: 75000" : "예: 145"}
                    onChange={(e) => handleFieldChange("avgBuyPrice", e.target.value === "" ? 0 : Number(e.target.value))}
                    className="h-10 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.avgBuyPrice && <p className="text-[10px] font-semibold text-red-400">{formErrors.avgBuyPrice}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">투자금액 (자동계산)</label>
                  <input
                    type="text"
                    value={(formData.quantity * formData.avgBuyPrice).toLocaleString("ko-KR")}
                    readOnly
                    className="h-10 w-full rounded-lg border border-border bg-muted/20 px-3 text-xs text-foreground/75 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">목표 비중 (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.targetRatio || ""}
                    onChange={(e) => handleFieldChange("targetRatio", e.target.value === "" ? 0 : Number(e.target.value))}
                    placeholder="예: 30"
                    className="h-10 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.targetRatio && <p className="text-[10px] font-semibold text-red-400">{formErrors.targetRatio}</p>}
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground leading-normal">
                {getCurrencyByMarket(formData.market) === "KRW"
                  ? "국내주식은 원화(KRW) 기준으로 입력해 주세요."
                  : "해외주식/ETF는 달러(USD) 기준으로 입력해 주세요."}
              </p>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/50">
                {modalMode === "edit" && editingAssetId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={submitting}
                    className="h-10 rounded-xl border border-red-500/30 hover:border-red-500 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-semibold px-4 transition-colors disabled:opacity-50"
                  >
                    삭제
                  </button>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="h-10 rounded-xl border border-border bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold px-4 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-10 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold px-6 transition-colors disabled:opacity-50"
                  >
                    {submitting ? "저장 중..." : "저장"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function StateCard({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="glass-card rounded-2xl p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-background/50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
        {description}
      </p>
      {action}
    </div>
  )
}
