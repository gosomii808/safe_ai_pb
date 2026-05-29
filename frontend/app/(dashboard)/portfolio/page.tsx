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
import { getPortfolioAnalysis, type PortfolioAnalysisResponse } from "@/lib/api"

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

    let cancelled = false
    setLoading(true)
    setError(null)

    getPortfolioAnalysis(userId)
      .then((data) => {
        if (!cancelled) setAnalysis(data)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [resolvedUserId, userId])

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

      <div className="border-t border-border pt-4">
        <h2 className="text-xl font-bold text-foreground">포트폴리오 분석</h2>
        <p className="mt-1 text-muted-foreground">
          평가금액, 손익, 비중, 리스크 요약을 백엔드 분석 API에서 불러옵니다.
        </p>
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

          <HoldingsTable holdings={analysis.assetSummaries ?? []} />
        </>
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
