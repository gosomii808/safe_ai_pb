"use client"

import {
  Shield,
  Lock,
  Smartphone,
  Monitor,
  Clock,
  CheckCircle,
  AlertTriangle,
  Key,
  Fingerprint,
  MapPin,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const securityScore = 85

const securityItems = [
  {
    title: "2단계 인증",
    description: "계정 보안을 위한 추가 인증 활성화",
    icon: Smartphone,
    status: "active",
    action: "관리",
  },
  {
    title: "비밀번호 강도",
    description: "마지막 변경: 45일 전",
    icon: Key,
    status: "warning",
    action: "변경",
  },
  {
    title: "생체 인증",
    description: "지문/Face ID 인증 활성화",
    icon: Fingerprint,
    status: "active",
    action: "관리",
  },
  {
    title: "로그인 알림",
    description: "새 기기 로그인 시 알림 받기",
    icon: Monitor,
    status: "active",
    action: "설정",
  },
]

const accessLogs = [
  {
    id: 1,
    device: "iPhone 15 Pro",
    location: "서울, 대한민국",
    ip: "223.38.xxx.xxx",
    time: "방금 전",
    current: true,
  },
  {
    id: 2,
    device: "MacBook Pro",
    location: "서울, 대한민국",
    ip: "223.38.xxx.xxx",
    time: "2시간 전",
    current: false,
  },
  {
    id: 3,
    device: "Windows PC",
    location: "서울, 대한민국",
    ip: "211.36.xxx.xxx",
    time: "어제",
    current: false,
  },
  {
    id: 4,
    device: "iPad Air",
    location: "부산, 대한민국",
    ip: "175.45.xxx.xxx",
    time: "3일 전",
    current: false,
  },
]

const encryptionStatus = [
  { name: "계좌 정보", encrypted: true },
  { name: "거래 내역", encrypted: true },
  { name: "개인 식별 정보", encrypted: true },
  { name: "투자 성향 데이터", encrypted: true },
  { name: "포트폴리오 정보", encrypted: true },
]

function SecurityScoreGauge({ score }: { score: number }) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-400"
    if (s >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreLabel = (s: number) => {
    if (s >= 80) return "안전"
    if (s >= 60) return "보통"
    return "위험"
  }

  const circumference = 2 * Math.PI * 80
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">SafePB 보안 점수</h3>
      <p className="mt-1 text-sm text-muted-foreground">계정 보안 상태를 확인하세요</p>

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
              className={getScoreColor(score)}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                transition: "stroke-dashoffset 1s ease-in-out",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={cn("text-5xl font-bold", getScoreColor(score))}>{score}</p>
            <p className={cn("text-lg font-medium", getScoreColor(score))}>
              {getScoreLabel(score)}
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            비밀번호를 변경하면 보안 점수가 향상됩니다
          </p>
        </div>
      </div>
    </div>
  )
}

function PersonalDataMasking() {
  const [showData, setShowData] = useState(false)

  const personalData = {
    name: showData ? "김투자" : "김**",
    phone: showData ? "010-1234-5678" : "010-****-5678",
    email: showData ? "investor@example.com" : "inv****@example.com",
    account: showData ? "123-456-789012" : "123-***-***012",
    residentNumber: "******-*******",
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">개인정보 보호</h3>
          <p className="mt-1 text-sm text-muted-foreground">마스킹된 개인정보</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowData(!showData)}
          className="gap-2 rounded-xl"
        >
          {showData ? (
            <>
              <EyeOff className="h-4 w-4" />
              숨기기
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              보기
            </>
          )}
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {Object.entries(personalData).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-xl bg-background/50 p-3"
          >
            <span className="text-sm text-muted-foreground">
              {key === "name" && "이름"}
              {key === "phone" && "전화번호"}
              {key === "email" && "이메일"}
              {key === "account" && "계좌번호"}
              {key === "residentNumber" && "주민번호"}
            </span>
            <span className="font-mono text-sm text-foreground">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EncryptionStatus() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">데이터 암호화 현황</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        모든 민감한 데이터는 AES-256으로 암호화됩니다
      </p>

      <div className="mt-4 space-y-2">
        {encryptionStatus.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl bg-background/50 p-3"
          >
            <span className="text-sm text-foreground">{item.name}</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-400">암호화됨</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-green-500/10 p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-400" />
          <span className="text-sm font-medium text-green-400">
            엔드-투-엔드 암호화 활성화
          </span>
        </div>
      </div>
    </div>
  )
}

function AccessLogs() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">접속 기록</h3>
          <p className="mt-1 text-sm text-muted-foreground">최근 로그인 활동</p>
        </div>
        <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
          <RefreshCw className="h-4 w-4" />
          새로고침
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {accessLogs.map((log) => (
          <div
            key={log.id}
            className={cn(
              "rounded-xl p-4 transition-colors",
              log.current ? "bg-primary/10 ring-1 ring-primary/30" : "bg-background/50"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  {log.device.includes("iPhone") || log.device.includes("iPad") ? (
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Monitor className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{log.device}</p>
                    {log.current && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                        현재 기기
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {log.location}
                    </div>
                    <span>{log.ip}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {log.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground">보안 설정</h3>
      <p className="mt-1 text-sm text-muted-foreground">계정 보안 옵션을 관리하세요</p>

      <div className="mt-4 space-y-3">
        {securityItems.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl bg-background/50 p-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  item.status === "active" ? "bg-green-500/20" : "bg-yellow-500/20"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    item.status === "active" ? "text-green-400" : "text-yellow-400"
                  )}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{item.title}</p>
                  {item.status === "warning" && (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              {item.action}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SecurityPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          보안 센터
        </h1>
        <p className="mt-1 text-muted-foreground">
          계정 보안 상태와 접속 기록을 확인하세요
        </p>
      </div>

      {/* Security Score */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SecurityScoreGauge score={securityScore} />
        <SecuritySettings />
      </div>

      {/* Encryption & Personal Data */}
      <div className="grid gap-6 lg:grid-cols-2">
        <EncryptionStatus />
        <PersonalDataMasking />
      </div>

      {/* Access Logs */}
      <AccessLogs />
    </div>
  )
}
