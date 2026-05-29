"use client"

import { Fragment, useEffect, useMemo, useState } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { AlertCircle, BarChart3, Calendar, Flame, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3001"

type MarketReaction = {
  kospiReturnD1Pct: number | null
  kospiReturnD5Pct: number | null
  usdKrwReturnD1Pct: number | null
}

type EventItem = {
  id: string
  eventDate: string
  title: string
  category: string
  country: string
  importance: "LOW" | "MEDIUM" | "HIGH"
  description: string
  affectedAssets: string[]
  marketReaction?: MarketReaction | null
}

type ImpactSummary = {
  eventTitle: string
  category: string
  importance: string
  affectedAssets: string[]
  summary: string
  riskLevel: string
  disclaimer: string
}

type SectorSensitivity = {
  sector: string
  eventColumn: string
  avgAbsPct: number | null
  eventCount: number
  score: number
}

type MacroPoint = {
  date: string
  kospiIndex: number | null
  sp500Index: number | null
  usdKrw: number | null
}

const mockEvents: EventItem[] = [
  {
    id: "mock-1",
    eventDate: "2026-05-20T00:00:00.000Z",
    title: "FOMC 금리 결정",
    category: "INTEREST_RATE",
    country: "US",
    importance: "HIGH",
    description:
      "정책금리 발표와 기자회견은 주식, 채권, 환율의 단기 변동성에 영향을 줄 수 있습니다.",
    affectedAssets: ["stocks", "etf", "bonds", "fx", "tech"],
  },
]

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  })
}

function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined) return "집계 대기"
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
}

function sensitivityTone(score: number) {
  if (score >= 3) return "bg-red-500/85 text-white"
  if (score === 2) return "bg-amber-400/85 text-amber-950"
  return "bg-emerald-500/80 text-white"
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [summaries, setSummaries] = useState<ImpactSummary[]>([])
  const [sensitivity, setSensitivity] = useState<SectorSensitivity[]>([])
  const [macroSeries, setMacroSeries] = useState<MacroPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState("")
  const [showAllEvents, setShowAllEvents] = useState(false)
  const [fetchTrigger, setFetchTrigger] = useState(0)

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.eventDate).getTime()
      const dateB = new Date(b.eventDate).getTime()
      return dateB - dateA
    })
  }, [events])

  const visibleEvents = useMemo(() => {
    return showAllEvents ? sortedEvents : sortedEvents.slice(0, 5)
  }, [showAllEvents, sortedEvents])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (startDate) params.set("startDate", startDate)

        const [eventsRes, summaryRes, sensitivityRes, macroRes] =
          await Promise.all([
            fetch(`${API_BASE_URL}/events?${params.toString()}`),
            fetch(`${API_BASE_URL}/events/impact-summary`),
            fetch(`${API_BASE_URL}/events/sectors/sensitivity`),
            fetch(`${API_BASE_URL}/events/macro-series?limit=90`),
          ])

        if (!eventsRes.ok || !summaryRes.ok) {
          throw new Error("API response error")
        }

        setEvents(await eventsRes.json())
        setSummaries(await summaryRes.json())
        setSensitivity(sensitivityRes.ok ? await sensitivityRes.json() : [])
        setMacroSeries(macroRes.ok ? await macroRes.json() : [])
        setError(null)
      } catch {
        setEvents(mockEvents)
        setSummaries([])
        setSensitivity([])
        setMacroSeries([])
        setError("백엔드 API 연결에 실패하여 예시 데이터를 표시합니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetchTrigger])

  const empty = useMemo(
    () => !loading && events.length === 0,
    [loading, events.length],
  )

  const eventColumns = useMemo(
    () => Array.from(new Set(sensitivity.map((item) => item.eventColumn))),
    [sensitivity],
  )
  const sectors = useMemo(
    () => Array.from(new Set(sensitivity.map((item) => item.sector))),
    [sensitivity],
  )

  const sensitivityByCell = useMemo(() => {
    return new Map(
      sensitivity.map((item) => [`${item.sector}:${item.eventColumn}`, item]),
    )
  }, [sensitivity])

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">경제 이벤트</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            주요 이벤트와 시장 반응, 섹터 민감도를 함께 확인합니다.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm">
          {error}
        </div>
      )}

      {/* 시장·매크로 추이 */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">시장·매크로 추이</h2>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="h-8 max-w-[160px] text-xs"
            />
            <button
              type="button"
              onClick={() => setFetchTrigger((n) => n + 1)}
              className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              보기
            </button>
          </div>
        </div>
        <div className="mt-4 h-72">
          {macroSeries.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={macroSeries}
                margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  minTickGap={24}
                  tickLine={false}
                />
                <YAxis tickLine={false} width={52} />
                <Tooltip
                  labelFormatter={(value) => formatDate(String(value))}
                  formatter={(value, name) => [
                    typeof value === "number" ? value.toLocaleString() : "-",
                    name,
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="kospiIndex"
                  name="KOSPI"
                  stroke="#2563eb"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="sp500Index"
                  name="S&P 500"
                  stroke="#16a34a"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="usdKrw"
                  name="USD/KRW"
                  stroke="#f97316"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              ETL 실행 후 매크로 시계열이 표시됩니다.
            </div>
          )}
        </div>
      </div>

      {/* 이벤트 영향 요약 (위로 이동) */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">이벤트 영향 요약</h2>
        </div>
        <div className="mt-3 space-y-3">
          {summaries.length === 0 && (
            <p className="text-sm text-muted-foreground">
              요약 데이터가 없습니다.
            </p>
          )}
          {summaries.map((item, index) => (
            <div key={`${item.eventTitle}-${index}`} className="rounded-xl border border-border p-3">
              <p className="font-medium">{item.eventTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                리스크: {item.riskLevel}
              </p>
              <p className="mt-2 flex items-start gap-1 text-xs text-muted-foreground">
                <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
                {item.disclaimer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 경제 이벤트 목록 (아래로 이동) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">경제 이벤트 목록</h2>
          <span className="text-xs text-muted-foreground">
            {showAllEvents ? `전체 ${sortedEvents.length}개 표시 중` : "최근 5개 표시 중"}
          </span>
        </div>

        {loading && (
          <div className="glass-card rounded-2xl p-6 text-sm text-muted-foreground">
            데이터를 불러오는 중입니다.
          </div>
        )}
        {empty && (
          <div className="glass-card rounded-2xl p-6 text-sm text-muted-foreground">
            조건에 맞는 이벤트가 없습니다.
          </div>
        )}

        <div className="grid gap-4">
          {visibleEvents.map((event, index) => (
            <div key={event.id || `${event.eventDate}-${event.country}-${event.category}-${index}`} className="glass-card rounded-2xl p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0 text-primary" />
                    <h3 className="truncate font-semibold">{event.title}</h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(event.eventDate).toLocaleDateString("ko-KR")} ·{" "}
                    {event.category} · {event.country}
                  </p>
                </div>
                <Badge>{event.importance}</Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {event.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {event.affectedAssets.map((asset) => (
                  <Badge key={asset} variant="secondary">
                    {asset}
                  </Badge>
                ))}
              </div>
              {event.marketReaction && (
                <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-muted-foreground">KOSPI D+1</p>
                    <p className="mt-1 font-mono font-semibold">
                      {formatPercent(event.marketReaction.kospiReturnD1Pct)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-muted-foreground">KOSPI D+5</p>
                    <p className="mt-1 font-mono font-semibold">
                      {formatPercent(event.marketReaction.kospiReturnD5Pct)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-muted-foreground">USD/KRW D+1</p>
                    <p className="mt-1 font-mono font-semibold">
                      {formatPercent(event.marketReaction.usdKrwReturnD1Pct)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 접기/펼치기 토글 버튼 */}
        {sortedEvents.length > 5 && (
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => setShowAllEvents(!showAllEvents)}
              className="px-6 py-2.5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/20"
            >
              {showAllEvents ? "최근 5개만 보기" : `경제 이벤트 더보기 (${sortedEvents.length - 5}개 더 있음)`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
