"use client"

import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  Brain,
  CheckCircle,
  Clock,
  Database,
  EyeOff,
  FileWarning,
  KeyRound,
  Loader2,
  Lock,
  Monitor,
  RefreshCw,
  Shield,
  ShieldAlert,
  Smartphone,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  getSecurityOverview,
  type SecurityAccessLog,
  type SecurityAiRequestLog,
  type SecurityEventLog,
  type SecurityOverviewResponse,
  type SecurityStatusItem,
} from "@/lib/api"

function scoreColor(score: number) {
  if (score >= 80) return "text-green-400"
  if (score >= 60) return "text-yellow-400"
  return "text-red-400"
}

function scoreLabel(score: number) {
  if (score >= 80) return "안전"
  if (score >= 60) return "주의"
  return "위험"
}

function formatDateTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

function SecurityScoreGauge({
  score,
  message,
}: {
  score: number
  message: string
}) {
  const circumference = 2 * Math.PI * 80
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">SafePB 보안 점수</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        접속 기록, 보안 이벤트, AI 요청 로그를 기준으로 산정합니다.
      </p>

      <div className="mt-6 flex flex-col items-center">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              className={scoreColor(score)}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                transition: "stroke-dashoffset 1s ease-in-out",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={cn("text-5xl font-bold", scoreColor(score))}>{score}</p>
            <p className={cn("text-lg font-medium", scoreColor(score))}>
              {scoreLabel(score)}
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

function ProtectionSummary({
  privacyStatus,
}: {
  privacyStatus: SecurityOverviewResponse["privacyStatus"]
}) {
  const items: Array<{
    title: string
    description: string
    icon: LucideIcon
    active: boolean
  }> = [
    {
      title: "개인정보 마스킹",
      description: "화면과 AI 입력에는 원본 민감값 대신 숨김 또는 요약값을 사용합니다.",
      icon: EyeOff,
      active: privacyStatus.maskingEnabled,
    },
    {
      title: "원본값 노출 방지",
      description: "수량, 매수가, 투자금액 같은 민감 원본값은 API 응답에 직접 노출하지 않습니다.",
      icon: Shield,
      active: !privacyStatus.rawSensitiveValuesExposed,
    },
    {
      title: "로컬 세션 기반",
      description: "현재 MVP는 브라우저 localStorage의 사용자 세션을 기준으로 화면 접근을 제어합니다.",
      icon: KeyRound,
      active: privacyStatus.localSessionOnly,
    },
  ]

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">보호 상태</h3>
      <p className="mt-1 text-sm text-muted-foreground">{privacyStatus.message}</p>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl bg-background/50 p-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  item.active ? "bg-green-500/20" : "bg-yellow-500/20"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    item.active ? "text-green-400" : "text-yellow-400"
                  )}
                />
              </div>
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium",
                item.active
                  ? "bg-green-500/10 text-green-400"
                  : "bg-yellow-500/10 text-yellow-400"
              )}
            >
              {item.active ? "활성" : "확인 필요"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EncryptionStatus({ items }: { items: SecurityStatusItem[] }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">데이터 보호 현황</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        DB 저장 방식과 AI 입력 처리 기준을 표시합니다.
      </p>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-xl bg-background/50 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">{item.name}</span>
              <div className="flex shrink-0 items-center gap-2">
                {item.healthy ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                )}
                <span
                  className={cn(
                    "text-xs",
                    item.healthy ? "text-green-400" : "text-yellow-400"
                  )}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-green-500/10 p-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-green-400" />
          <span className="text-sm font-medium text-green-400">
            원본 민감값은 백엔드 내부 처리에만 사용됩니다.
          </span>
        </div>
      </div>
    </div>
  )
}

function AccessLogs({ logs }: { logs: SecurityAccessLog[] }) {
  return (
    <LogCard
      title="최근 접속 기록"
      description="AccessLog 테이블의 최근 활동입니다."
      emptyMessage="아직 저장된 접속 기록이 없습니다."
      actionLabel="조회됨"
    >
      {logs.map((log, index) => (
        <div
          key={log.id}
          className={cn(
            "rounded-xl p-4 transition-colors",
            index === 0 ? "bg-primary/10 ring-1 ring-primary/30" : "bg-background/50"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                {log.userAgent?.toLowerCase().includes("mobile") ? (
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">
                    {log.method} {log.endpoint}
                  </p>
                  {index === 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      최신
                    </span>
                  )}
                  <StatusBadge success={log.success} />
                </div>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {log.action} · {log.ipAddress ?? "IP 없음"} ·{" "}
                  {log.userAgent ?? "기기 정보 없음"}
                </p>
              </div>
            </div>
            <TimeLabel value={log.createdAt} />
          </div>
        </div>
      ))}
    </LogCard>
  )
}

function SecurityEvents({ events }: { events: SecurityEventLog[] }) {
  return (
    <LogCard
      title="보안 이벤트"
      description="SecurityEvent 테이블의 최근 이벤트입니다."
      emptyMessage="최근 보안 이벤트가 없습니다."
    >
      {events.map((event) => (
        <div key={event.id} className="rounded-xl bg-background/50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <SeverityBadge severity={event.severity} />
                <p className="font-medium text-foreground">{event.eventType}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
              {event.ipAddress && (
                <p className="mt-1 text-xs text-muted-foreground">
                  IP {event.ipAddress}
                </p>
              )}
            </div>
            <TimeLabel value={event.createdAt} />
          </div>
        </div>
      ))}
    </LogCard>
  )
}

function AiRequestLogs({ logs }: { logs: SecurityAiRequestLog[] }) {
  return (
    <LogCard
      title="AI 요청 로그"
      description="AiRequestLog 테이블의 최근 AI 분석 호출입니다."
      emptyMessage="아직 저장된 AI 요청 로그가 없습니다."
    >
      {logs.map((log) => (
        <div key={log.id} className="rounded-xl bg-background/50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <p className="font-medium text-foreground">{log.requestType}</p>
                <StatusBadge success={log.success} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {log.modelName ?? "모델 정보 없음"} · 토큰{" "}
                {log.tokenUsage ?? "-"} · {log.latencyMs ?? "-"}ms
              </p>
              {log.errorCode && (
                <p className="mt-1 text-xs text-red-400">오류: {log.errorCode}</p>
              )}
            </div>
            <TimeLabel value={log.createdAt} />
          </div>
        </div>
      ))}
    </LogCard>
  )
}

function LogCard({
  title,
  description,
  emptyMessage,
  actionLabel,
  children,
}: {
  title: string
  description: string
  emptyMessage: string
  actionLabel?: string
  children: ReactNode
}) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : Boolean(children)

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {actionLabel && (
          <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
            <RefreshCw className="h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {hasChildren ? (
          children
        ) : (
          <div className="rounded-xl bg-background/50 p-6 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ success }: { success: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        success ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
      )}
    >
      {success ? "성공" : "실패"}
    </span>
  )
}

function SeverityBadge({ severity }: { severity: string }) {
  const normalized = severity.toUpperCase()
  const style =
    normalized === "CRITICAL" || normalized === "HIGH"
      ? "bg-red-500/10 text-red-400"
      : normalized === "MEDIUM"
        ? "bg-yellow-500/10 text-yellow-400"
        : "bg-green-500/10 text-green-400"

  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", style)}>
      {normalized}
    </span>
  )
}

function TimeLabel({ value }: { value: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      {formatDateTime(value)}
    </div>
  )
}

function StateCard({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="glass-card rounded-2xl p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-background/50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
        {description}
      </p>
      {action}
    </div>
  )
}

export default function SecurityPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [resolvedUserId, setResolvedUserId] = useState(false)
  const [overview, setOverview] = useState<SecurityOverviewResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("safe_pb_user_id")
    setUserId(storedUserId)
    setResolvedUserId(true)
  }, [])

  useEffect(() => {
    if (!resolvedUserId) return
    if (!userId) {
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    getSecurityOverview(userId)
      .then((data) => {
        if (!cancelled) setOverview(data)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [resolvedUserId, userId])

  const eventStats = useMemo(() => {
    const highEvents =
      overview?.recentSecurityEvents.filter((event) =>
        ["HIGH", "CRITICAL"].includes(event.severity.toUpperCase())
      ).length ?? 0
    const failedAccess =
      overview?.recentAccessLogs.filter((log) => !log.success).length ?? 0
    const failedAi =
      overview?.recentAiRequestLogs.filter((log) => !log.success).length ?? 0

    return { highEvents, failedAccess, failedAi }
  }, [overview])

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          보안 센터
        </h1>
        <p className="mt-1 text-muted-foreground">
          DB에 저장된 접속 기록, 보안 이벤트, AI 요청 로그를 기준으로 계정 보호 상태를 확인합니다.
        </p>
      </div>

      {loading && (
        <StateCard
          icon={<Loader2 className="h-6 w-6 animate-spin text-primary" />}
          title="보안 정보를 불러오는 중입니다."
          description="최근 접속 기록과 보안 이벤트를 조회하고 있습니다."
        />
      )}

      {!loading && !userId && (
        <StateCard
          icon={<ShieldAlert className="h-6 w-6 text-warning" />}
          title="사용자 정보가 없습니다."
          description="보안 센터를 보려면 먼저 회원가입 또는 로그인을 완료해 주세요."
          action={
            <Link
              href="/onboarding"
              className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              회원가입으로 이동
            </Link>
          }
        />
      )}

      {!loading && userId && error && (
        <StateCard
          icon={<FileWarning className="h-6 w-6 text-red-400" />}
          title="보안 정보를 불러오지 못했습니다."
          description={error}
        />
      )}

      {!loading && overview && !error && (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <SecurityScoreGauge
              score={overview.securityScore}
              message={overview.summaryMessage}
            />
            <ProtectionSummary privacyStatus={overview.privacyStatus} />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryTile
              title="실패 접속"
              value={eventStats.failedAccess}
              description="최근 접속 로그 기준"
              warning={eventStats.failedAccess > 0}
            />
            <SummaryTile
              title="고위험 이벤트"
              value={eventStats.highEvents}
              description="HIGH/CRITICAL 기준"
              warning={eventStats.highEvents > 0}
            />
            <SummaryTile
              title="AI 요청 실패"
              value={eventStats.failedAi}
              description="최근 AI 요청 로그 기준"
              warning={eventStats.failedAi > 0}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <EncryptionStatus items={overview.encryptionStatus} />
            <AiRequestLogs logs={overview.recentAiRequestLogs} />
          </div>

          <AccessLogs logs={overview.recentAccessLogs} />
          <SecurityEvents events={overview.recentSecurityEvents} />
        </>
      )}
    </div>
  )
}

function SummaryTile({
  title,
  value,
  description,
  warning,
}: {
  title: string
  value: number
  description: string
  warning: boolean
}) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            warning ? "bg-red-500/20" : "bg-green-500/20"
          )}
        >
          {warning ? (
            <AlertTriangle className="h-5 w-5 text-red-400" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-400" />
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
