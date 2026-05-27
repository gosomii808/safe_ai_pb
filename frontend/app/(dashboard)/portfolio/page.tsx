import {
  AllocationPieChart,
  SectorConcentration,
  PerformanceChart,
  RiskIndicator,
  HoldingsTable,
} from "@/components/portfolio/charts"
import { DashboardWidgets } from "@/components/dashboard/widgets"
import { Wallet, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "총 평가금액",
    value: "₩125,340,000",
    change: "+₩8,450,000",
    changePercent: "+7.23%",
    positive: true,
    icon: Wallet,
  },
  {
    title: "총 매입금액",
    value: "₩116,890,000",
    change: null,
    changePercent: null,
    positive: true,
    icon: BarChart3,
  },
  {
    title: "총 수익금",
    value: "₩8,450,000",
    change: "수익률",
    changePercent: "+7.23%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "일간 수익",
    value: "₩1,250,000",
    change: "전일 대비",
    changePercent: "+1.01%",
    positive: true,
    icon: TrendingUp,
  },
]

export default function PortfolioPage() {
  // Get current time for greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "좋은 아침이에요" : hour < 18 ? "좋은 오후예요" : "좋은 저녁이에요"

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Greeting Section */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {greeting}, 김투자님
        </h1>
        <p className="text-muted-foreground">
          오늘의 시장 동향과 포트폴리오 현황을 확인하세요
        </p>
      </div>

      {/* Market Widgets - 주요 지수 & 경제 지표 */}
      <DashboardWidgets />

      {/* Portfolio Analysis Header */}
      <div className="pt-4 border-t border-border">
        <h2 className="text-xl font-bold text-foreground">
          포트폴리오 분석
        </h2>
        <p className="mt-1 text-muted-foreground">
          자산 배분과 수익률을 한눈에 확인하세요
        </p>
      </div>

      {/* Stats Grid */}
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
            <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
            {stat.changePercent && (
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{stat.change}</span>
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

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AllocationPieChart />
        <SectorConcentration />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <RiskIndicator />
      </div>

      {/* Holdings Table */}
      <HoldingsTable />
    </div>
  )
}
