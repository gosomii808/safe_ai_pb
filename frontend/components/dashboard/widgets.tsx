"use client"

import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart3, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

interface MarketWidgetProps {
  title: string
  value: string
  change: number
  changePercent: number
  data: { time: string; value: number }[]
  currency?: string
}

const marketData = {
  kospi: {
    title: "KOSPI",
    value: "2,687.45",
    change: 23.45,
    changePercent: 0.88,
    data: [
      { time: "09:00", value: 2664 },
      { time: "10:00", value: 2670 },
      { time: "11:00", value: 2658 },
      { time: "12:00", value: 2675 },
      { time: "13:00", value: 2682 },
      { time: "14:00", value: 2678 },
      { time: "15:00", value: 2687 },
    ],
  },
  nasdaq: {
    title: "NASDAQ",
    value: "18,432.56",
    change: -87.32,
    changePercent: -0.47,
    data: [
      { time: "09:30", value: 18520 },
      { time: "10:30", value: 18485 },
      { time: "11:30", value: 18460 },
      { time: "12:30", value: 18440 },
      { time: "13:30", value: 18455 },
      { time: "14:30", value: 18420 },
      { time: "15:30", value: 18432 },
    ],
  },
  sp500: {
    title: "S&P 500",
    value: "5,234.18",
    change: 12.76,
    changePercent: 0.24,
    data: [
      { time: "09:30", value: 5221 },
      { time: "10:30", value: 5228 },
      { time: "11:30", value: 5235 },
      { time: "12:30", value: 5230 },
      { time: "13:30", value: 5238 },
      { time: "14:30", value: 5232 },
      { time: "15:30", value: 5234 },
    ],
  },
  usdkrw: {
    title: "USD/KRW",
    value: "1,342.50",
    change: -3.20,
    changePercent: -0.24,
    currency: "원",
    data: [
      { time: "09:00", value: 1346 },
      { time: "10:00", value: 1344 },
      { time: "11:00", value: 1345 },
      { time: "12:00", value: 1343 },
      { time: "13:00", value: 1344 },
      { time: "14:00", value: 1343 },
      { time: "15:00", value: 1342 },
    ],
  },
}

function MarketWidget({ title, value, change, changePercent, data }: MarketWidgetProps) {
  const isPositive = change >= 0

  return (
    <div className="glass-card group rounded-2xl p-5 transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
          <div className="mt-1 flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                isPositive ? "text-green-400" : "text-red-400"
              )}
            >
              {isPositive ? "+" : ""}
              {change.toFixed(2)} ({isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isPositive ? "#22c55e" : "#ef4444"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={isPositive ? "#22c55e" : "#ef4444"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              strokeWidth={2}
              fill={`url(#gradient-${title})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const kpiData = [
  {
    title: "기준금리",
    value: "3.50%",
    change: "동결",
    icon: Percent,
    description: "한국은행 기준금리",
  },
  {
    title: "소비자물가지수",
    value: "2.8%",
    change: "-0.2%p",
    icon: BarChart3,
    description: "전년 동월 대비",
  },
  {
    title: "변동성지수",
    value: "15.32",
    change: "-2.4",
    icon: Activity,
    description: "KOSPI VIX",
  },
]

function KPICard({
  title,
  value,
  change,
  icon: Icon,
  description,
}: {
  title: string
  value: string
  change: string
  icon: typeof Percent
  description: string
}) {
  return (
    <div className="glass-card rounded-2xl p-5 transition-all hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
          {change}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export function DashboardWidgets() {
  return (
    <div className="space-y-6">
      {/* Market Indices */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">주요 지수</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MarketWidget {...marketData.kospi} />
          <MarketWidget {...marketData.nasdaq} />
          <MarketWidget {...marketData.sp500} />
          <MarketWidget {...marketData.usdkrw} />
        </div>
      </div>

      {/* KPI Cards */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">경제 지표</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>
      </div>
    </div>
  )
}
