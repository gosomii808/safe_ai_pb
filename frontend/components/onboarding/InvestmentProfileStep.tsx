"use client"

import { useState } from "react"
import { AlertCircle, Award, Layers, ShieldAlert, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { InvestmentProfile } from "@/lib/onboarding-types"
import { cn } from "@/lib/utils"

interface InvestmentProfileStepProps {
  data: InvestmentProfile
  onNext: (data: InvestmentProfile) => void
  onBack: () => void
}

const riskTypes = [
  {
    value: "안정형",
    desc: "원금 손실 가능성을 낮추고 예금, 채권 등 안정적인 자산을 선호합니다.",
  },
  {
    value: "안정추구형",
    desc: "손실 위험을 제한하면서 안정적인 수익을 기대합니다.",
  },
  {
    value: "위험중립형",
    desc: "일정 수준의 변동성을 감수하고 균형 잡힌 수익을 추구합니다.",
  },
  {
    value: "적극투자형",
    desc: "높은 수익 기회를 위해 주식 등 변동성 있는 자산도 활용합니다.",
  },
  {
    value: "공격투자형",
    desc: "높은 수익을 목표로 큰 변동성과 손실 위험을 감수할 수 있습니다.",
  },
]

const investmentGoals = [
  "장기 자산 형성",
  "단기 수익 추구",
  "은퇴 준비",
  "배당 수익",
  "학습/경험",
  "기타",
]

const experiences = ["1년 미만", "1~3년", "3~5년", "5년 이상"]

const assetOptions = ["국내주식", "해외주식", "ETF", "채권", "현금성 자산", "기타"]

export function InvestmentProfileStep({
  data,
  onNext,
  onBack,
}: InvestmentProfileStepProps) {
  const [formData, setFormData] = useState<InvestmentProfile>({
    riskType: data.riskType || "",
    investmentGoal: data.investmentGoal || "",
    investmentExperience: data.investmentExperience || "",
    preferredAssets: data.preferredAssets || [],
  })

  const [errors, setErrors] = useState<
    Partial<Record<keyof InvestmentProfile, string>>
  >({})

  const validate = () => {
    const newErrors: Partial<Record<keyof InvestmentProfile, string>> = {}
    if (!formData.riskType) newErrors.riskType = "투자 성향을 선택해 주세요."
    if (!formData.investmentGoal) newErrors.investmentGoal = "투자 목표를 선택해 주세요."
    if (!formData.investmentExperience) {
      newErrors.investmentExperience = "투자 경험을 선택해 주세요."
    }
    if (formData.preferredAssets.length === 0) {
      newErrors.preferredAssets = "관심 자산을 1개 이상 선택해 주세요."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onNext(formData)
  }

  const setField = (key: keyof InvestmentProfile, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  const toggleAsset = (asset: string) => {
    const nextAssets = formData.preferredAssets.includes(asset)
      ? formData.preferredAssets.filter((item) => item !== asset)
      : [...formData.preferredAssets, asset]
    setField("preferredAssets", nextAssets)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
        <div className="text-xs leading-relaxed text-muted-foreground">
          <p className="mb-1 font-semibold text-yellow-500">투자 성향 보호 안내</p>
          <p>
            투자 성향과 목표는 포트폴리오 진단과 AI 리포트 생성을 위한
            정보입니다. 백엔드 저장 시 민감 정보는 암호화해 처리합니다.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <SectionLabel icon={<AlertCircle className="h-4 w-4" />} label="투자 성향" />
        <div className="grid gap-2">
          {riskTypes.map((type) => {
            const selected = formData.riskType === type.value
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setField("riskType", type.value)}
                className={cn(
                  "rounded-xl border p-3.5 text-left transition-all",
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/20 hover:bg-muted/40"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm font-semibold", selected ? "text-primary" : "text-foreground")}>
                    {type.value}
                  </span>
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full border",
                      selected ? "border-primary" : "border-muted-foreground/30"
                    )}
                  >
                    {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {type.desc}
                </p>
              </button>
            )
          })}
        </div>
        {errors.riskType && <ErrorText message={errors.riskType} />}

        <SectionLabel icon={<Target className="h-4 w-4" />} label="투자 목표" />
        <ChoiceGrid
          values={investmentGoals}
          selected={formData.investmentGoal}
          onSelect={(value) => setField("investmentGoal", value)}
        />
        {errors.investmentGoal && <ErrorText message={errors.investmentGoal} />}

        <SectionLabel icon={<Award className="h-4 w-4" />} label="투자 경험" />
        <ChoiceGrid
          values={experiences}
          selected={formData.investmentExperience}
          onSelect={(value) => setField("investmentExperience", value)}
          columns="sm:grid-cols-4"
        />
        {errors.investmentExperience && (
          <ErrorText message={errors.investmentExperience} />
        )}

        <SectionLabel
          icon={<Layers className="h-4 w-4" />}
          label="관심 자산"
          helper="중복 선택 가능"
        />
        <div className="flex flex-wrap gap-2">
          {assetOptions.map((asset) => {
            const selected = formData.preferredAssets.includes(asset)
            return (
              <button
                key={asset}
                type="button"
                onClick={() => toggleAsset(asset)}
                className={cn(
                  "h-10 rounded-xl border px-4 text-xs font-semibold transition-all",
                  selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                )}
              >
                {asset}
              </button>
            )
          })}
        </div>
        {errors.preferredAssets && <ErrorText message={errors.preferredAssets} />}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-11 rounded-xl border-border px-8 text-foreground hover:bg-muted"
        >
          이전 단계
        </Button>
        <Button type="submit" className="h-11 rounded-xl px-8 font-medium">
          다음 단계
        </Button>
      </div>
    </form>
  )
}

function ChoiceGrid({
  values,
  selected,
  onSelect,
  columns = "sm:grid-cols-3",
}: {
  values: string[]
  selected: string
  onSelect: (value: string) => void
  columns?: string
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", columns)}>
      {values.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onSelect(value)}
          className={cn(
            "h-11 rounded-xl border px-3 text-xs font-semibold transition-all",
            selected === value
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          )}
        >
          {value}
        </button>
      ))}
    </div>
  )
}

function SectionLabel({
  icon,
  label,
  helper,
}: {
  icon: React.ReactNode
  label: string
  helper?: string
}) {
  return (
    <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
      <span className="text-muted-foreground">{icon}</span>
      {label}
      {helper && (
        <span className="text-xs font-normal text-muted-foreground">({helper})</span>
      )}
    </label>
  )
}

function ErrorText({ message }: { message: string }) {
  return <p className="text-xs font-medium text-red-400">{message}</p>
}
