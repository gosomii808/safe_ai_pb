"use client"

import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface PortfolioSummaryProps {
  totalAssets: number
  dailyReturn: number
  dailyReturnPercent: number
  monthlyReturn: number
  monthlyReturnPercent: number
}

export function PortfolioSummary({
  totalAssets = 125340000,
  dailyReturn = 1250000,
  dailyReturnPercent = 1.01,
  monthlyReturn = 8450000,
  monthlyReturnPercent = 7.23,
}: PortfolioSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="relative p-6">
        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium text-muted-foreground">내 총 자산</p>
          </div>
          
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {formatCurrency(totalAssets)}
          </p>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-background/50 p-4">
              <p className="text-sm text-muted-foreground">오늘 수익</p>
              <div className="mt-1 flex items-center gap-2">
                <p className={cn(
                  "text-xl font-bold",
                  dailyReturn >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {dailyReturn >= 0 ? "+" : ""}{formatCurrency(dailyReturn)}
                </p>
                <span className={cn(
                  "flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                  dailyReturn >= 0 ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"
                )}>
                  {dailyReturn >= 0 ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                  {dailyReturnPercent >= 0 ? "+" : ""}{dailyReturnPercent.toFixed(2)}%
                </span>
              </div>
            </div>
            
            <div className="rounded-xl bg-background/50 p-4">
              <p className="text-sm text-muted-foreground">이번 달 수익</p>
              <div className="mt-1 flex items-center gap-2">
                <p className={cn(
                  "text-xl font-bold",
                  monthlyReturn >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {monthlyReturn >= 0 ? "+" : ""}{formatCurrency(monthlyReturn)}
                </p>
                <span className={cn(
                  "flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                  monthlyReturn >= 0 ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"
                )}>
                  {monthlyReturn >= 0 ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                  {monthlyReturnPercent >= 0 ? "+" : ""}{monthlyReturnPercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const holdings = [
  {
    name: "삼성전자",
    ticker: "005930",
    value: 35000000,
    shares: 500,
    change: 2.5,
    color: "bg-blue-500",
  },
  {
    name: "SK하이닉스",
    ticker: "000660",
    value: 28000000,
    shares: 200,
    change: 3.2,
    color: "bg-green-500",
  },
  {
    name: "NAVER",
    ticker: "035420",
    value: 22000000,
    shares: 120,
    change: -1.2,
    color: "bg-emerald-500",
  },
  {
    name: "카카오",
    ticker: "035720",
    value: 15000000,
    shares: 300,
    change: -0.8,
    color: "bg-yellow-500",
  },
  {
    name: "현대차",
    ticker: "005380",
    value: 12000000,
    shares: 50,
    change: 1.1,
    color: "bg-cyan-500",
  },
]

export function TopHoldings() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">주요 보유 종목</h3>
        <a href="/portfolio" className="text-sm text-primary hover:underline">
          전체보기
        </a>
      </div>
      
      <div className="mt-4 space-y-3">
        {holdings.map((holding) => (
          <div
            key={holding.ticker}
            className="flex items-center justify-between rounded-xl bg-background/50 p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div className={cn("h-10 w-10 rounded-xl", holding.color, "flex items-center justify-center")}>
                <span className="text-xs font-bold text-white">
                  {holding.name.slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{holding.name}</p>
                <p className="text-xs text-muted-foreground">{holding.shares}주</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">{formatCurrency(holding.value)}</p>
              <p className={cn(
                "text-xs font-medium",
                holding.change >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {holding.change >= 0 ? "+" : ""}{holding.change.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
