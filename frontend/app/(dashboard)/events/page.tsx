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
  if (value === null || value === undefined) return "-"
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
  const [category, setCategory] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (startDate) params.set("startDate", startDate)
        if (category) params.set("category", category)

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
  }, [startDate, category])

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

      <div className="glass-card grid gap-3 rounded-2xl p-4 sm:grid-cols-2">
        <Input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <Input
          placeholder="카테고리 예: INTEREST_RATE"
          value={category}
          onChange={(event) => setCategory(event.target.value.toUpperCase())}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm">
          {error}
        </div>
      )}

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
        {events.map((event) => (
          <div key={event.id} className="glass-card rounded-2xl p-5">
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

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">시장·매크로 추이</h2>
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

        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">섹터 민감도</h2>
          </div>
          {sensitivity.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <div
                className="grid min-w-[420px] gap-2 text-xs"
                style={{
                  gridTemplateColumns: `96px repeat(${eventColumns.length}, minmax(64px, 1fr))`,
                }}
              >
                <div />
                {eventColumns.map((column) => (
                  <div key={column} className="font-medium text-muted-foreground">
                    {column}
                  </div>
                ))}
                {sectors.map((sector) => (
                  <Fragment key={sector}>
                    <div key={`${sector}-label`} className="py-2 font-medium">
                      {sector}
                    </div>
                    {eventColumns.map((column) => {
                      const cell = sensitivityByCell.get(`${sector}:${column}`)
                      return (
                        <div
                          key={`${sector}-${column}`}
                          className={`rounded-md px-2 py-2 text-center font-mono ${sensitivityTone(
                            cell?.score ?? 1,
                          )}`}
                          title={
                            cell
                              ? `${cell.eventCount}개 이벤트, 평균 ${formatPercent(cell.avgAbsPct)}`
                              : "데이터 없음"
                          }
                        >
                          {cell?.avgAbsPct == null
                            ? "-"
                            : cell.avgAbsPct.toFixed(2)}
                        </div>
                      )
                    })}
                  </Fragment>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              ETL 실행 후 섹터별 민감도가 표시됩니다.
            </p>
          )}
        </div>
      </div>

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
          {summaries.map((item) => (
            <div key={item.eventTitle} className="rounded-xl border border-border p-3">
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
    </div>
  )
}
