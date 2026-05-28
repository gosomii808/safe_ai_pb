"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { OnboardingPayload } from "@/lib/onboarding-types"
import {
  CheckCircle2,
  ChevronRight,
  Landmark,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react"

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

  const maskEmail = (email: string): string => {
    if (!email) return ""
    const [local, domain] = email.split("@")
    if (!domain) return "***"
    return `${local.slice(0, 2)}***@${domain}`
  }

  const maskPhone = (phone: string): string => {
    if (!phone) return ""
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
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex gap-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-primary mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <p className="font-semibold text-primary mb-1">
            Secure storage and anonymized AI input
          </p>
          <p>
            Contact details and portfolio numbers are sent to the backend for
            encrypted storage. AI reports should use anonymized portfolio
            summaries instead of raw quantity, price, or amount values.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground">Review summary</h3>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="glass-card p-4 rounded-xl border border-border space-y-3">
            <h4 className="text-xs font-semibold text-primary flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              Personal info
            </h4>
            <div className="text-xs space-y-1.5 text-muted-foreground">
              <div className="flex justify-between gap-4">
                <span>Nickname</span>
                <span className="text-foreground font-medium">
                  {payload.personalInfo.nickname}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Email</span>
                <span className="text-foreground font-medium">
                  {maskEmail(payload.personalInfo.email)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Phone</span>
                <span className="text-foreground font-medium">
                  {maskPhone(payload.personalInfo.phone)}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-border space-y-3">
            <h4 className="text-xs font-semibold text-primary flex items-center gap-1">
              <Landmark className="h-3.5 w-3.5" />
              Investment profile
            </h4>
            <div className="text-xs space-y-1.5 text-muted-foreground">
              <div className="flex justify-between gap-4">
                <span>Risk type</span>
                <span className="text-foreground font-medium">
                  {payload.investmentProfile.riskType}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Goal</span>
                <span className="text-foreground font-medium">
                  {payload.investmentProfile.investmentGoal}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1 justify-end">
                {payload.investmentProfile.preferredAssets.map((asset) => (
                  <span
                    key={asset}
                    className="px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-border space-y-3">
          <h4 className="text-xs font-semibold text-primary flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Portfolio assets ({payload.portfolioAssets.length})
          </h4>

          <div className="divide-y divide-border/50 text-xs">
            {payload.portfolioAssets.map((asset, index) => (
              <div
                key={`${asset.market}-${asset.ticker}-${index}`}
                className="py-2.5 flex items-center justify-between text-muted-foreground first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    {asset.stockName || asset.ticker}
                    <span className="text-[10px] text-muted-foreground font-normal">
                      {" "}
                      ({asset.ticker})
                    </span>
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {asset.market} / {asset.sector || "Unclassified"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-foreground font-medium">
                    Target {asset.targetRatio}%
                  </p>
                  <p className="text-[10px] text-primary flex items-center gap-0.5 justify-end">
                    <Lock className="h-2.5 w-2.5" />
                    Quantity and amount hidden
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-3 flex justify-between items-center text-xs font-semibold text-foreground">
            <span>Total investment amount</span>
            <span className="text-primary flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Hidden
            </span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive">
          {errorMessage}
        </div>
      )}

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="h-11 px-8 rounded-xl border-border hover:bg-muted text-foreground"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleStartAnalysis}
          disabled={isSubmitting}
          className="h-11 px-8 rounded-xl font-medium flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Saving securely...
            </>
          ) : (
            <>
              Start analysis
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
