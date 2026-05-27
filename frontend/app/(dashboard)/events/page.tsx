"use client"

import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const events = [
  {
    id: 1,
    title: "FOMC 회의 결과 발표",
    date: "2024.06.12",
    time: "오후 3:00 (KST)",
    category: "금리",
    status: "upcoming",
    impact: "high",
    description: "미 연준의 6월 FOMC 회의 결과 발표. 기준금리 동결이 예상되며, 파월 의장의 발언에 주목.",
    portfolioImpact: "성장주 중심 포트폴리오에 긍정적 영향 예상",
    affectedSectors: ["IT/반도체", "성장주", "채권"],
  },
  {
    id: 2,
    title: "미국 CPI (소비자물가지수)",
    date: "2024.06.14",
    time: "오후 9:30 (KST)",
    category: "물가",
    status: "upcoming",
    impact: "high",
    description: "5월 소비자물가지수 발표. 인플레이션 둔화 추세 확인이 핵심.",
    portfolioImpact: "물가 안정 시 금리 인하 기대감으로 주식 시장 상승 가능",
    affectedSectors: ["전체 시장", "성장주"],
  },
  {
    id: 3,
    title: "한국은행 기준금리 결정",
    date: "2024.06.27",
    time: "오전 10:00 (KST)",
    category: "금리",
    status: "upcoming",
    impact: "medium",
    description: "한국은행 금융통화위원회의 기준금리 결정. 현 3.50% 동결 예상.",
    portfolioImpact: "동결 시 현재 투자 환경 유지, 인하 시 국내 성장주 수혜",
    affectedSectors: ["금융", "부동산", "성장주"],
  },
  {
    id: 4,
    title: "미국 고용지표 발표",
    date: "2024.06.07",
    time: "오후 9:30 (KST)",
    category: "고용",
    status: "completed",
    impact: "high",
    result: "예상 하회",
    description: "5월 비농업 고용 증가 15.2만명 (예상 18만명). 실업률 4.0%로 상승.",
    portfolioImpact: "고용 둔화로 금리 인하 기대감 상승, 주식 시장 긍정적 반응",
    marketReaction: 1.2,
    affectedSectors: ["전체 시장"],
  },
  {
    id: 5,
    title: "ECB 금리 결정",
    date: "2024.06.06",
    time: "오후 9:15 (KST)",
    category: "금리",
    status: "completed",
    impact: "medium",
    result: "금리 인하",
    description: "ECB 기준금리 25bp 인하 (4.50% → 4.25%). 2019년 이후 첫 인하.",
    portfolioImpact: "글로벌 금리 인하 사이클 시작 신호로 해석",
    marketReaction: 0.8,
    affectedSectors: ["유럽 관련주", "수출주"],
  },
]

const beforeAfterData = [
  { time: "-5일", before: 100 },
  { time: "-4일", before: 99.5 },
  { time: "-3일", before: 100.2 },
  { time: "-2일", before: 99.8 },
  { time: "-1일", before: 100.5 },
  { time: "이벤트", before: 100.5, after: 101.2 },
  { time: "+1일", after: 102.1 },
  { time: "+2일", after: 101.8 },
  { time: "+3일", after: 102.5 },
  { time: "+4일", after: 103.2 },
  { time: "+5일", after: 103.8 },
]

const impactHeatmap = [
  { sector: "IT/반도체", fomc: 2, cpi: 2, employment: 1, bok: 1 },
  { sector: "금융", fomc: 1, cpi: 1, employment: 1, bok: 2 },
  { sector: "자동차", fomc: 1, cpi: 1, employment: 1, bok: 1 },
  { sector: "바이오", fomc: 2, cpi: 1, employment: 0, bok: 1 },
  { sector: "에너지", fomc: 1, cpi: 2, employment: 0, bok: 0 },
]

function EventCard({ event }: { event: (typeof events)[0] }) {
  const isCompleted = event.status === "completed"

  return (
    <div className="glass-card overflow-hidden rounded-2xl transition-all hover:scale-[1.01]">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                event.impact === "high" && "bg-red-500/20",
                event.impact === "medium" && "bg-yellow-500/20",
                event.impact === "low" && "bg-green-500/20"
              )}
            >
              <Calendar
                className={cn(
                  "h-6 w-6",
                  event.impact === "high" && "text-red-400",
                  event.impact === "medium" && "text-yellow-400",
                  event.impact === "low" && "text-green-400"
                )}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{event.title}</h3>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    event.category === "금리" && "bg-blue-500/20 text-blue-400",
                    event.category === "물가" && "bg-purple-500/20 text-purple-400",
                    event.category === "고용" && "bg-emerald-500/20 text-emerald-400"
                  )}
                >
                  {event.category}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {event.date} {event.time}
              </div>
            </div>
          </div>
          {isCompleted && event.result && (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                (event.marketReaction ?? 0) >= 0
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              {event.result}
            </span>
          )}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{event.description}</p>

        <div className="mt-4 rounded-xl bg-primary/10 p-4">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-primary">포트폴리오 영향 분석</p>
              <p className="mt-1 text-sm text-primary/80">{event.portfolioImpact}</p>
            </div>
          </div>
        </div>

        {isCompleted && event.marketReaction !== undefined && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">시장 반응:</span>
            <div className="flex items-center gap-1">
              {event.marketReaction >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400" />
              )}
              <span
                className={cn(
                  "font-medium",
                  event.marketReaction >= 0 ? "text-green-400" : "text-red-400"
                )}
              >
                {event.marketReaction >= 0 ? "+" : ""}
                {event.marketReaction}%
              </span>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {event.affectedSectors.map((sector) => (
            <span
              key={sector}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {sector}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function BeforeAfterChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">이벤트 전후 시장 반응</h3>
      <p className="mt-1 text-sm text-muted-foreground">FOMC 회의 전후 KOSPI 지수 변화</p>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={beforeAfterData}>
            <defs>
              <linearGradient id="beforeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6b7280" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6b7280" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="afterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              domain={[98, 105]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="before"
              stroke="#6b7280"
              strokeWidth={2}
              fill="url(#beforeGradient)"
            />
            <Area
              type="monotone"
              dataKey="after"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#afterGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
          <span className="text-sm text-muted-foreground">이벤트 전</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-400" />
          <span className="text-sm text-muted-foreground">이벤트 후</span>
        </div>
      </div>
    </div>
  )
}

function ImpactHeatmap() {
  const getColor = (value: number) => {
    if (value === 0) return "bg-muted"
    if (value === 1) return "bg-yellow-500/50"
    return "bg-red-500/50"
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">이벤트 영향 히트맵</h3>
      <p className="mt-1 text-sm text-muted-foreground">섹터별 이벤트 민감도</p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">섹터</th>
              <th className="pb-3 text-center text-xs font-medium text-muted-foreground">FOMC</th>
              <th className="pb-3 text-center text-xs font-medium text-muted-foreground">CPI</th>
              <th className="pb-3 text-center text-xs font-medium text-muted-foreground">고용</th>
              <th className="pb-3 text-center text-xs font-medium text-muted-foreground">한은</th>
            </tr>
          </thead>
          <tbody>
            {impactHeatmap.map((row) => (
              <tr key={row.sector}>
                <td className="py-2 text-sm text-foreground">{row.sector}</td>
                <td className="py-2 text-center">
                  <div className={cn("mx-auto h-8 w-8 rounded-lg", getColor(row.fomc))} />
                </td>
                <td className="py-2 text-center">
                  <div className={cn("mx-auto h-8 w-8 rounded-lg", getColor(row.cpi))} />
                </td>
                <td className="py-2 text-center">
                  <div className={cn("mx-auto h-8 w-8 rounded-lg", getColor(row.employment))} />
                </td>
                <td className="py-2 text-center">
                  <div className={cn("mx-auto h-8 w-8 rounded-lg", getColor(row.bok))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-muted" />
          <span className="text-xs text-muted-foreground">낮음</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-yellow-500/50" />
          <span className="text-xs text-muted-foreground">중간</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-red-500/50" />
          <span className="text-xs text-muted-foreground">높음</span>
        </div>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => e.status === "upcoming")
  const completedEvents = events.filter((e) => e.status === "completed")

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          경제 이벤트 분석
        </h1>
        <p className="mt-1 text-muted-foreground">
          주요 경제 이벤트와 포트폴리오 영향을 분석합니다
        </p>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BeforeAfterChart />
        <ImpactHeatmap />
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">예정된 이벤트</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Completed Events */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">완료된 이벤트</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {completedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}
