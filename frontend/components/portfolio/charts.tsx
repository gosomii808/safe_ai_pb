"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Target } from "lucide-react"

// Portfolio allocation data
const allocationData = [
  { name: "국내 주식", value: 45, color: "#22c55e" },
  { name: "해외 주식", value: 25, color: "#3b82f6" },
  { name: "채권", value: 15, color: "#a855f7" },
  { name: "현금성 자산", value: 10, color: "#f59e0b" },
  { name: "기타", value: 5, color: "#6b7280" },
]

// Sector concentration data
const sectorData = [
  { name: "IT/반도체", value: 35, color: "#22c55e" },
  { name: "금융", value: 20, color: "#3b82f6" },
  { name: "자동차", value: 15, color: "#a855f7" },
  { name: "바이오", value: 12, color: "#f59e0b" },
  { name: "에너지", value: 10, color: "#ef4444" },
  { name: "기타", value: 8, color: "#6b7280" },
]

// Performance data
const performanceData = [
  { month: "1월", portfolio: 100, benchmark: 100 },
  { month: "2월", portfolio: 103, benchmark: 102 },
  { month: "3월", portfolio: 98, benchmark: 99 },
  { month: "4월", portfolio: 105, benchmark: 103 },
  { month: "5월", portfolio: 108, benchmark: 105 },
  { month: "6월", portfolio: 107, benchmark: 106 },
]

// Holdings data
const holdingsData = [
  {
    name: "삼성전자",
    ticker: "005930",
    sector: "IT/반도체",
    shares: 500,
    avgPrice: 65000,
    currentPrice: 70000,
    value: 35000000,
    weight: 27.9,
    return: 7.69,
    returnAmount: 2500000,
  },
  {
    name: "SK하이닉스",
    ticker: "000660",
    sector: "IT/반도체",
    shares: 200,
    avgPrice: 125000,
    currentPrice: 140000,
    value: 28000000,
    weight: 22.3,
    return: 12.0,
    returnAmount: 3000000,
  },
  {
    name: "NAVER",
    ticker: "035420",
    sector: "IT",
    shares: 120,
    avgPrice: 195000,
    currentPrice: 183333,
    value: 22000000,
    weight: 17.5,
    return: -6.0,
    returnAmount: -1400000,
  },
  {
    name: "카카오",
    ticker: "035720",
    sector: "IT",
    shares: 300,
    avgPrice: 55000,
    currentPrice: 50000,
    value: 15000000,
    weight: 12.0,
    return: -9.1,
    returnAmount: -1500000,
  },
  {
    name: "현대차",
    ticker: "005380",
    sector: "자동차",
    shares: 50,
    avgPrice: 220000,
    currentPrice: 240000,
    value: 12000000,
    weight: 9.6,
    return: 9.1,
    returnAmount: 1000000,
  },
  {
    name: "삼성바이오로직스",
    ticker: "207940",
    sector: "바이오",
    shares: 15,
    avgPrice: 750000,
    currentPrice: 866666,
    value: 13000000,
    weight: 10.4,
    return: 15.56,
    returnAmount: 1750000,
  },
]

export function AllocationPieChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">자산 배분</h3>
      <p className="mt-1 text-sm text-muted-foreground">현재 포트폴리오 구성</p>
      
      <div className="mt-4 flex items-center gap-6">
        <div className="h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex-1 space-y-2">
          {allocationData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SectorConcentration() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">섹터 집중도</h3>
      <p className="mt-1 text-sm text-muted-foreground">업종별 투자 비중</p>
      
      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sectorData} layout="vertical">
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              width={80}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {sectorData[0].value > 30 && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-warning/10 p-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
          <p className="text-sm text-warning">
            IT/반도체 섹터 비중이 35%로 높습니다. 분산 투자를 고려해보세요.
          </p>
        </div>
      )}
    </div>
  )
}

export function PerformanceChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">수익률 추이</h3>
          <p className="mt-1 text-sm text-muted-foreground">KOSPI 대비 성과 비교</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">내 포트폴리오</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted-foreground" />
            <span className="text-xs text-muted-foreground">KOSPI</span>
          </div>
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
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              domain={[95, 115]}
            />
            <Tooltip
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

export function RiskIndicator() {
  const riskLevel = 3 // 1-5 scale
  const riskLabels = ["매우 낮음", "낮음", "보통", "높음", "매우 높음"]
  const riskColors = ["#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444"]

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">위험도 분석</h3>
      <p className="mt-1 text-sm text-muted-foreground">포트폴리오 리스크 수준</p>
      
      <div className="mt-6 flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-12 w-12 rounded-xl transition-all",
              level <= riskLevel
                ? "scale-100 opacity-100"
                : "scale-90 opacity-30"
            )}
            style={{ backgroundColor: riskColors[level - 1] }}
          />
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold" style={{ color: riskColors[riskLevel - 1] }}>
          {riskLabels[riskLevel - 1]}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          변동성: 연 15.2% | 샤프 비율: 1.23
        </p>
      </div>
      
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-background/50 p-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">베타</span>
          </div>
          <span className="font-medium text-foreground">1.12</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-background/50 p-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">최대 낙폭</span>
          </div>
          <span className="font-medium text-red-400">-12.5%</span>
        </div>
      </div>
    </div>
  )
}

export function HoldingsTable() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">보유 종목</h3>
        <p className="mt-1 text-sm text-muted-foreground">전체 {holdingsData.length}개 종목</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                종목
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                수량
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
                수익금
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {holdingsData.map((holding) => (
              <tr
                key={holding.ticker}
                className="transition-colors hover:bg-muted/20"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{holding.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {holding.ticker} · {holding.sector}
                    </p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span className="text-foreground">{holding.shares}주</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span className="font-medium text-foreground">
                    ₩{formatCurrency(holding.value)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span className="text-muted-foreground">{holding.weight}%</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {holding.return >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span
                      className={cn(
                        "font-medium",
                        holding.return >= 0 ? "text-green-400" : "text-red-400"
                      )}
                    >
                      {holding.return >= 0 ? "+" : ""}
                      {holding.return.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <span
                    className={cn(
                      "font-medium",
                      holding.returnAmount >= 0 ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {holding.returnAmount >= 0 ? "+" : ""}₩
                    {formatCurrency(Math.abs(holding.returnAmount))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
