"use client"

import {
  AlertTriangle,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type {
  PortfolioAllocation,
  PortfolioAnalysisResponse,
  PortfolioAssetSummary,
} from "@/lib/api"
import { cn } from "@/lib/utils"

const COLORS = ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444", "#6b7280"]

function formatCurrency(value: number) {
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

function withColors(rows: PortfolioAllocation[] = []) {
  return rows.map((row, index) => ({
    ...row,
    value: Number(row.weight.toFixed(2)),
    color: COLORS[index % COLORS.length],
  }))
}

export function AllocationPieChart({
  data,
}: {
  data: PortfolioAllocation[]
}) {
  const chartData = withColors(data)

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">자산 배분</h3>
      <p className="mt-1 text-sm text-muted-foreground">현재 포트폴리오 구성</p>

      {chartData.length === 0 ? (
        <EmptyChartMessage />
      ) : (
        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="h-48 w-full sm:w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-2">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-sm text-muted-foreground">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {item.value.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function SectorConcentration({
  data,
}: {
  data: PortfolioAllocation[]
}) {
  const chartData = withColors(data)
  const topSector = chartData[0]

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">섹터 집중도</h3>
      <p className="mt-1 text-sm text-muted-foreground">업종별 평가금액 비중</p>

      {chartData.length === 0 ? (
        <EmptyChartMessage />
      ) : (
        <>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  width={92}
                />
                <Tooltip
                  formatter={(value) => [`${Number(value).toFixed(1)}%`, "비중"]}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {topSector && topSector.value >= 35 && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-warning/10 p-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
              <p className="text-sm text-warning">
                {topSector.name} 비중이 {topSector.value.toFixed(1)}%로 높습니다.
                단기 변동성이 특정 영역에 집중될 수 있습니다.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function PerformanceChart({
  totalReturnRate,
}: {
  totalReturnRate: number | null | undefined
}) {
  const current = totalReturnRate == null ? 100 : 100 + totalReturnRate
  const performanceData = [
    { label: "투자원금", portfolio: 100, benchmark: 100 },
    { label: "현재 평가", portfolio: Number(current.toFixed(2)), benchmark: 100 },
  ]

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">수익률 현황</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            투자원금 대비 현재 평가 기준
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">포트폴리오</span>
        </div>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              domain={["dataMin - 5", "dataMax + 5"]}
            />
            <Tooltip
              formatter={(value) => [`${Number(value).toFixed(2)}`, "지수화"]}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "12px",
              }}
              labelStyle={{ color: "#9ca3af" }}
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="#6b7280"
              strokeWidth={2}
              fill="transparent"
              strokeDasharray="5 5"
            />
            <Area
              type="monotone"
              dataKey="portfolio"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#portfolioGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function RiskIndicator({
  analysis,
}: {
  analysis: PortfolioAnalysisResponse
}) {
  const riskLevel = analysis.riskLevel ?? "medium"
  const riskScore = analysis.concentrationScore ?? 0
  const riskIndex = riskLevel === "low" ? 2 : riskLevel === "medium" ? 3 : 5
  const riskLabel = riskLevel === "low" ? "낮음" : riskLevel === "medium" ? "보통" : "높음"
  const riskColors = ["#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444"]

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">위험도 분석</h3>
      <p className="mt-1 text-sm text-muted-foreground">집중도 기반 리스크 수준</p>

      <div className="mt-6 flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-12 w-12 rounded-xl transition-all",
              level <= riskIndex ? "scale-100 opacity-100" : "scale-90 opacity-30"
            )}
            style={{ backgroundColor: riskColors[level - 1] }}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-2xl font-bold" style={{ color: riskColors[riskIndex - 1] }}>
          {riskLabel}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          집중도 점수: {riskScore.toFixed(1)}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-background/50 p-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">분산 점수</span>
          </div>
          <span className="font-medium text-foreground">
            {Math.max(0, 100 - riskScore).toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-background/50 p-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">분석 상태</span>
          </div>
          <span className="font-medium text-foreground">{analysis.status ?? "ok"}</span>
        </div>
      </div>
    </div>
  )
}

export function HoldingsTable({
  holdings,
  onEdit,
}: {
  holdings: PortfolioAssetSummary[]
  onEdit?: (holding: PortfolioAssetSummary) => void
}) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">보유 종목</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          전체 {holdings.length}개 종목
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                종목
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                보유 주수
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                평가금액
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                비중
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                수익률
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                손익
              </th>
              {onEdit && (
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  관리
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {holdings.map((holding) => (
              <tr key={`${holding.market}-${holding.ticker}`} className="transition-colors hover:bg-muted/20">
                <td className="whitespace-nowrap px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {holding.stockName ?? holding.ticker}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {holding.ticker} · {holding.market} · {holding.sector ?? "미분류"}
                    </p>
                    {holding.riskComment && (
                      <p className="mt-1 max-w-xs truncate text-xs text-muted-foreground">
                        {holding.riskComment}
                      </p>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span className="text-foreground">
                    {holding.quantity.toLocaleString("ko-KR")}주
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span className="font-medium text-foreground">
                    ₩{formatCurrency(holding.valuationAmount)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span className="text-muted-foreground">
                    {holding.weight.toFixed(1)}%
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {(holding.returnRate ?? 0) >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span
                      className={cn(
                        "font-medium",
                        (holding.returnRate ?? 0) >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      )}
                    >
                      {formatPercent(holding.returnRate)}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span
                    className={cn(
                      "font-medium",
                      holding.profitLoss >= 0 ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {holding.profitLoss >= 0 ? "+" : ""}
                    ₩{formatCurrency(holding.profitLoss)}
                  </span>
                </td>
                {onEdit && (
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => onEdit(holding)}
                      className="text-xs text-primary font-semibold hover:underline bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      수정
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function EmptyChartMessage() {
  return (
    <div className="mt-4 flex h-48 items-center justify-center rounded-xl bg-background/40 text-sm text-muted-foreground">
      표시할 분석 데이터가 아직 부족합니다.
    </div>
  )
}

