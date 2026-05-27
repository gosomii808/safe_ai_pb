"use client"

import { useEffect, useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, AlertCircle, Sparkles } from "lucide-react"

type EventItem = {
  id: string
  eventDate: string
  title: string
  category: string
  country: string
  importance: "LOW" | "MEDIUM" | "HIGH"
  description: string
  affectedAssets: string[]
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

const mockEvents: EventItem[] = [
  {
    id: "mock-1",
    eventDate: "2026-05-20T00:00:00.000Z",
    title: "FOMC 금리 결정",
    category: "INTEREST_RATE",
    country: "US",
    importance: "HIGH",
    description: "정책금리 발표와 기자회견 톤이 단기 변동성에 영향을 줄 수 있습니다.",
    affectedAssets: ["stocks", "etf", "bonds", "fx", "tech"],
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [summaries, setSummaries] = useState<ImpactSummary[]>([])
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

        const [eventsRes, summaryRes] = await Promise.all([
          fetch(`http://localhost:3001/events?${params.toString()}`),
          fetch("http://localhost:3001/events/impact-summary"),
        ])

        if (!eventsRes.ok || !summaryRes.ok) throw new Error("API 응답 오류")

        setEvents(await eventsRes.json())
        setSummaries(await summaryRes.json())
        setError(null)
      } catch {
        setEvents(mockEvents)
        setSummaries([])
        setError("백엔드 API 연결에 실패하여 mock 데이터로 표시합니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [startDate, category])

  const empty = useMemo(() => !loading && events.length === 0, [loading, events.length])

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">경제 이벤트</h1>
          <p className="mt-1 text-muted-foreground">최근 데이터 기반 단기 흐름 분석과 영향 가능성 요약</p>
        </div>
      </div>

      <div className="glass-card grid gap-3 rounded-2xl p-4 sm:grid-cols-2">
        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <Input
          placeholder="카테고리 (예: INTEREST_RATE)"
          value={category}
          onChange={(e) => setCategory(e.target.value.toUpperCase())}
        />
      </div>

      {error && <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm">⚠️ {error}</div>}

      {loading && <div className="glass-card rounded-2xl p-6 text-sm text-muted-foreground">불러오는 중...</div>}
      {empty && <div className="glass-card rounded-2xl p-6 text-sm text-muted-foreground">조건에 맞는 이벤트가 없습니다.</div>}

      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">{event.title}</h3>
              </div>
              <Badge>{event.importance}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{new Date(event.eventDate).toLocaleDateString()} · {event.category} · {event.country}</p>
            <p className="mt-3 text-sm text-muted-foreground">{event.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {event.affectedAssets.map((asset) => (
                <Badge key={asset} variant="secondary">{asset}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">이벤트 영향 요약</h2>
        </div>
        <div className="mt-3 space-y-3">
          {summaries.length === 0 && <p className="text-sm text-muted-foreground">요약 데이터가 없습니다.</p>}
          {summaries.map((item) => (
            <div key={item.eventTitle} className="rounded-xl border border-border p-3">
              <p className="font-medium">{item.eventTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
              <p className="mt-2 text-xs text-muted-foreground">리스크: {item.riskLevel}</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><AlertCircle className="h-3 w-3" />{item.disclaimer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
