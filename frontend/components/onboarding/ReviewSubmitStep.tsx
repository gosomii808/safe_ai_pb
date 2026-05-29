"use client"

import { useState } from "react"
import {
  CheckCircle2,
  ChevronRight,
  Landmark,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { OnboardingPayload } from "@/lib/onboarding-types"

interface ReviewSubmitStepProps {
  payload: OnboardingPayload
  onSubmit: () => Promise<void> | void
  onBack: () => void
  errorMessage?: string
}

export function ReviewSubmitStep({
  payload,
  onSubmit,
  onBack,
  errorMessage,
}: ReviewSubmitStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@")
    if (!domain) return "***"
    return `${local.slice(0, 2)}***@${domain}`
  }

  const maskPhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    if (cleanPhone.length < 7) return "***"
    return `${cleanPhone.slice(0, 3)}-****-${cleanPhone.slice(-4)}`
  }

  const handleStartAnalysis = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div className="text-xs leading-relaxed text-muted-foreground">
          <p className="mb-1 font-semibold text-primary">
            안전한 저장과 익명화된 AI 분석
          </p>
          <p>
            연락처와 포트폴리오 수치는 백엔드로 전송되어 암호화 저장됩니다.
            AI 리포트에는 원본 수량, 매수가, 투자금액을 그대로 노출하지 않고
            요약 지표만 사용합니다.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground">입력 정보 확인</h3>

        <div className="grid gap-3 sm:grid-cols-2">
          <section className="glass-card space-y-3 rounded-xl border border-border p-4">
            <h4 className="flex items-center gap-1 text-xs font-semibold text-primary">
              <User className="h-3.5 w-3.5" />
              회원 정보
            </h4>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <InfoRow label="닉네임" value={payload.personalInfo.nickname} />
              <InfoRow label="이메일" value={maskEmail(payload.personalInfo.email)} />
              <InfoRow label="전화번호" value={maskPhone(payload.personalInfo.phone)} />
              <InfoRow label="비밀번호" value="저장 시 해시 처리" />
            </div>
          </section>

          <section className="glass-card space-y-3 rounded-xl border border-border p-4">
            <h4 className="flex items-center gap-1 text-xs font-semibold text-primary">
              <Landmark className="h-3.5 w-3.5" />
              투자 프로필
            </h4>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <InfoRow label="투자 성향" value={payload.investmentProfile.riskType} />
              <InfoRow label="투자 목표" value={payload.investmentProfile.investmentGoal} />
              <InfoRow
                label="투자 경험"
                value={payload.investmentProfile.investmentExperience}
              />
              <div className="flex flex-wrap justify-end gap-1 pt-1">
                {payload.investmentProfile.preferredAssets.map((asset) => (
                  <span
                    key={asset}
                    className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="glass-card space-y-3 rounded-xl border border-border p-4">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" />
            보유 자산 ({payload.portfolioAssets.length}개)
          </h4>

          <div className="divide-y divide-border/50 text-xs">
            {payload.portfolioAssets.map((asset, index) => (
              <div
                key={`${asset.market}-${asset.ticker}-${index}`}
                className="flex items-center justify-between py-2.5 text-muted-foreground first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    {asset.stockName || asset.ticker}
                    <span className="text-[10px] font-normal text-muted-foreground">
                      {" "}
                      ({asset.ticker})
                    </span>
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {asset.market} / {asset.sector || "미분류"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    목표 비중 {asset.targetRatio}%
                  </p>
                  <p className="flex items-center justify-end gap-0.5 text-[10px] text-primary">
                    <Lock className="h-2.5 w-2.5" />
                    수량과 금액은 숨김
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-3 text-xs font-semibold text-foreground">
            <span>총 투자금액</span>
            <span className="flex items-center gap-1 text-primary">
              <Lock className="h-3 w-3" />
              숨김
            </span>
          </div>
        </section>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive">
          {errorMessage}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="h-11 rounded-xl border-border px-8 text-foreground hover:bg-muted"
        >
          이전 단계
        </Button>
        <Button
          type="button"
          onClick={handleStartAnalysis}
          disabled={isSubmitting}
          className="flex h-11 items-center gap-2 rounded-xl px-8 font-medium"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              안전하게 저장 중...
            </>
          ) : (
            <>
              분석 시작하기
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span>{label}</span>
      <span className="text-right font-medium text-foreground">{value || "-"}</span>
    </div>
  )
}
