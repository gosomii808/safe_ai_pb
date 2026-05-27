"use client"

import {
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Shield,
  PieChart,
  BarChart3,
  Target,
  Lightbulb,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const reportCards = [
  {
    id: "risk",
    title: "포트폴리오 위험 분석",
    icon: Shield,
    status: "warning",
    summary: "IT 섹터 집중도가 높아 변동성 위험이 있습니다",
    details: [
      "IT/반도체 섹터 비중 35% (권장: 25% 이하)",
      "단일 종목(삼성전자) 비중 27.9%로 집중 위험",
      "해외 자산 비중 25%로 환율 리스크 존재",
    ],
    recommendation: "분산 투자를 위해 방어주나 채권 ETF 비중 확대를 고려해보세요.",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  {
    id: "macro",
    title: "거시경제 영향 분석",
    icon: BarChart3,
    status: "positive",
    summary: "현재 포트폴리오는 금리 인하 국면에 유리한 구성입니다",
    details: [
      "성장주 중심 포트폴리오로 금리 인하 시 수혜 예상",
      "반도체 섹터는 AI 수요 증가로 호재 지속",
      "원/달러 환율 안정세로 해외 투자 수익 긍정적",
    ],
    recommendation: "현재 매크로 환경은 포트폴리오에 우호적입니다. 현 구성 유지를 권장합니다.",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  {
    id: "volatility",
    title: "변동성 분석",
    icon: TrendingUp,
    status: "neutral",
    summary: "포트폴리오 변동성은 시장 평균 수준입니다",
    details: [
      "연간 변동성 15.2% (KOSPI 평균 14.8%)",
      "베타 1.12로 시장 대비 약간 높은 변동성",
      "최대 낙폭(MDD) -12.5%로 관리 필요",
    ],
    recommendation: "변동성 관리를 위해 저베타 종목이나 배당주 추가를 검토해보세요.",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    id: "diversification",
    title: "분산도 분석",
    icon: PieChart,
    status: "warning",
    summary: "섹터 분산이 다소 부족합니다",
    details: [
      "보유 종목 6개로 적정 수준 (권장: 10-15개)",
      "IT 섹터 편중으로 섹터 분산 미흡",
      "국내 자산 75%로 지역 분산 필요",
    ],
    recommendation: "헬스케어, 필수소비재 등 비IT 섹터와 해외 ETF 추가를 고려하세요.",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
]

const productRecommendations = [
  {
    category: "채권 ETF",
    description: "금리 인하 기대감으로 채권 투자 적기",
    examples: ["KODEX 국고채10년", "TIGER 미국채10년선물"],
    risk: "낮음",
    suitability: "안정적인 수익 추구",
  },
  {
    category: "배당주/배당 ETF",
    description: "변동성 대비와 인컴 수익 확보",
    examples: ["KODEX 고배당", "TIGER 배당성장"],
    risk: "중간",
    suitability: "인컴과 성장의 균형",
  },
  {
    category: "인덱스 ETF",
    description: "시장 전체에 분산 투자하여 리스크 관리",
    examples: ["KODEX 200", "TIGER 미국S&P500"],
    risk: "중간",
    suitability: "장기 자산 증식",
  },
  {
    category: "성장주 카테고리",
    description: "AI, 2차전지 등 미래 성장 산업",
    examples: ["반도체, AI 관련주", "2차전지 관련주"],
    risk: "높음",
    suitability: "공격적 수익 추구",
  },
]

function ReportCard({
  title,
  icon: Icon,
  status,
  summary,
  details,
  recommendation,
  color,
}: (typeof reportCards)[0]) {
  return (
    <div className="glass-card rounded-2xl p-6 transition-all hover:scale-[1.01]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl border", color)}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <span
              className={cn(
                "text-xs font-medium",
                status === "positive" && "text-green-400",
                status === "warning" && "text-yellow-400",
                status === "neutral" && "text-blue-400"
              )}
            >
              {status === "positive" && "양호"}
              {status === "warning" && "주의 필요"}
              {status === "neutral" && "보통"}
            </span>
          </div>
        </div>
        {status === "warning" && (
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        )}
      </div>

      <p className="mt-4 text-sm font-medium text-foreground">{summary}</p>

      <ul className="mt-4 space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {detail}
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-xl bg-primary/10 p-4">
        <div className="flex items-start gap-2">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm text-primary">{recommendation}</p>
        </div>
      </div>
    </div>
  )
}

export default function AIReportPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            AI 리포트
          </h1>
          <p className="mt-1 text-muted-foreground">
            AI가 분석한 맞춤형 투자 인사이트
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI 분석 완료</span>
        </div>
      </div>

      {/* Summary Card */}
      <div className="glass-card overflow-hidden rounded-2xl">
        <div className="relative p-6">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI 종합 진단</span>
            </div>
            <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
              포트폴리오 종합 점수: <span className="text-primary">78점</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              전반적으로 양호한 포트폴리오이나, 섹터 집중도와 분산 투자 측면에서 개선이 필요합니다.
              현재 시장 환경은 포트폴리오에 우호적이며, 장기적 관점에서 긍정적인 수익이 예상됩니다.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 divide-x divide-border border-t border-border bg-muted/30">
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">A</p>
            <p className="text-xs text-muted-foreground">위험관리</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">A-</p>
            <p className="text-xs text-muted-foreground">수익성</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">B+</p>
            <p className="text-xs text-muted-foreground">분산도</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">B</p>
            <p className="text-xs text-muted-foreground">유동성</p>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {reportCards.map((card) => (
          <ReportCard key={card.id} {...card} />
        ))}
      </div>

      {/* Product Recommendations */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            추천 투자상품 유형
          </h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          투자 성향과 현재 포트폴리오를 기반으로 추천드리는 상품 카테고리입니다
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {productRecommendations.map((product) => (
            <div
              key={product.category}
              className="rounded-xl border border-border bg-background/50 p-4 transition-all hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">{product.category}</h4>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    product.risk === "낮음" && "bg-green-500/20 text-green-400",
                    product.risk === "중간" && "bg-yellow-500/20 text-yellow-400",
                    product.risk === "높음" && "bg-red-500/20 text-red-400"
                  )}
                >
                  위험도 {product.risk}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {product.examples.map((example) => (
                  <span
                    key={example}
                    className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                  >
                    {example}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-primary">{product.suitability}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-destructive/10 p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">
              <strong>중요:</strong> 위 내용은 투자 참고용 정보이며, 특정 금융상품의 매수/매도를
              권유하지 않습니다. 투자 결정은 본인의 판단과 책임하에 이루어져야 합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
