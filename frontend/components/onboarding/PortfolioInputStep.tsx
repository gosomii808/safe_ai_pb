"use client"

import { useState } from "react"
import { BadgeCent, LineChart, Plus, ShieldAlert, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PortfolioAssetInput } from "@/lib/onboarding-types"
import { getCurrencyByMarket } from "@/lib/currency"

interface PortfolioInputStepProps {
  data: PortfolioAssetInput[]
  onNext: (data: PortfolioAssetInput[]) => void
  onBack: () => void
}

const emptyAsset: PortfolioAssetInput = {
  market: "KOSPI",
  ticker: "",
  stockName: "",
  sector: "",
  quantity: 0,
  avgBuyPrice: 0,
  investmentAmount: 0,
  targetRatio: 0,
}

export function PortfolioInputStep({
  data,
  onNext,
  onBack,
}: PortfolioInputStepProps) {
  const [assets, setAssets] = useState<PortfolioAssetInput[]>(
    data.length > 0 ? data : [{ ...emptyAsset }]
  )
  const [errors, setErrors] = useState<
    Record<number, Partial<Record<keyof PortfolioAssetInput, string>>>
  >({})
  const [generalError, setGeneralError] = useState("")

  const handleAddAsset = () => {
    setAssets((prev) => [...prev, { ...emptyAsset }])
    setGeneralError("")
  }

  const handleRemoveAsset = (index: number) => {
    if (assets.length === 1) {
      setGeneralError("최소 1개 이상의 보유 종목을 입력해야 합니다.")
      return
    }
    setAssets((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
  }

  const handleFieldChange = (
    index: number,
    key: keyof PortfolioAssetInput,
    value: string | number
  ) => {
    setAssets((prev) => {
      const updated = [...prev]
      const target = { ...updated[index], [key]: value }

      if (key === "quantity" || key === "avgBuyPrice") {
        const quantity = key === "quantity" ? Number(value) : Number(target.quantity)
        const price = key === "avgBuyPrice" ? Number(value) : Number(target.avgBuyPrice)
        target.investmentAmount = quantity * price
      }

      updated[index] = target
      return updated
    })

    if (errors[index]?.[key]) {
      setErrors((prev) => ({
        ...prev,
        [index]: { ...prev[index], [key]: "" },
      }))
    }
  }

  const validate = () => {
    const newErrors: typeof errors = {}
    let valid = true

    assets.forEach((asset, index) => {
      const itemErrors: Partial<Record<keyof PortfolioAssetInput, string>> = {}
      if (!asset.ticker.trim()) itemErrors.ticker = "종목코드 필수"
      if (!asset.stockName.trim()) itemErrors.stockName = "종목명 필수"
      if (!asset.sector.trim()) itemErrors.sector = "업종 필수"
      if (asset.quantity <= 0) itemErrors.quantity = "0보다 커야 함"
      if (asset.avgBuyPrice <= 0) itemErrors.avgBuyPrice = "0보다 커야 함"
      if (asset.targetRatio < 0 || asset.targetRatio > 100) {
        itemErrors.targetRatio = "0~100%"
      }

      if (Object.keys(itemErrors).length > 0) {
        newErrors[index] = itemErrors
        valid = false
      }
    })

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onNext(assets)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div className="text-xs leading-relaxed text-muted-foreground">
          <p className="mb-1 font-semibold text-primary">자산 정보 보안 안내</p>
          <p>
            보유 수량, 평균 매수가, 투자금액은 민감 정보로 암호화 저장됩니다.
            화면과 AI 리포트에는 원본 값 대신 평가금액, 비중, 수익률 같은 요약
            지표만 표시합니다.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <LineChart className="h-4 w-4 text-muted-foreground" />
            보유 종목 구성
          </label>
          <span className="text-xs text-muted-foreground">
            수량 × 평균 매수가로 투자금액을 자동 계산합니다.
          </span>
        </div>

        {generalError && (
          <p className="rounded-xl bg-red-400/10 p-3 text-sm font-medium text-red-400">
            {generalError}
          </p>
        )}

        <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
          {assets.map((asset, index) => (
            <div
              key={index}
              className="glass-card relative flex flex-col gap-3 rounded-xl border border-border p-4"
            >
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">
                    #{index + 1} 보유 종목
                  </span>
                  {getCurrencyByMarket(asset.market) === "KRW" ? (
                    <span className="rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-bold text-green-400">
                      KRW (원화)
                    </span>
                  ) : (
                    <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">
                      USD (달러)
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAsset(index)}
                  className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-red-400/10 hover:text-red-400"
                  title="종목 삭제"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Field label="시장">
                  <select
                    value={asset.market}
                    onChange={(e) => handleFieldChange(index, "market", e.target.value)}
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-2 text-xs text-foreground focus:outline-none"
                  >
                    <option value="KOSPI">KOSPI</option>
                    <option value="KOSDAQ">KOSDAQ</option>
                    <option value="NASDAQ">NASDAQ</option>
                    <option value="NYSE">NYSE</option>
                    <option value="ETF">ETF</option>
                  </select>
                </Field>
                <Field label="종목코드" error={errors[index]?.ticker}>
                  <input
                    value={asset.ticker}
                    onChange={(e) =>
                      handleFieldChange(index, "ticker", e.target.value.toUpperCase())
                    }
                    placeholder="예: 005930"
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </Field>
                <Field label="종목명" error={errors[index]?.stockName}>
                  <input
                    value={asset.stockName}
                    onChange={(e) =>
                      handleFieldChange(index, "stockName", e.target.value)
                    }
                    placeholder="예: 삼성전자"
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </Field>
                <Field label="업종/섹터" error={errors[index]?.sector}>
                  <input
                    value={asset.sector}
                    onChange={(e) => handleFieldChange(index, "sector", e.target.value)}
                    placeholder="예: 반도체"
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Field label="수량" error={errors[index]?.quantity}>
                  <input
                    type="number"
                    min="0.001"
                    step="any"
                    value={asset.quantity || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "quantity",
                        e.target.value === "" ? 0 : Number(e.target.value)
                      )
                    }
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </Field>
                <Field
                  label={`평균 매수가 (${getCurrencyByMarket(asset.market)})`}
                  error={errors[index]?.avgBuyPrice}
                >
                  <input
                    type="number"
                    min="1"
                    value={asset.avgBuyPrice || ""}
                    placeholder={
                      getCurrencyByMarket(asset.market) === "KRW"
                        ? "예: 75000"
                        : "예: 145"
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "avgBuyPrice",
                        e.target.value === "" ? 0 : Number(e.target.value)
                      )
                    }
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                    {getCurrencyByMarket(asset.market) === "KRW"
                      ? "국내주식은 원화(KRW) 기준으로 입력해 주세요."
                      : "해외주식/ETF는 달러(USD) 기준으로 입력해 주세요."}
                  </p>
                </Field>
                <Field
                  label={
                    <span className="flex items-center gap-1">
                      <BadgeCent className="h-3 w-3" />
                      투자금액
                    </span>
                  }
                >
                  <input
                    type="number"
                    value={asset.investmentAmount || ""}
                    readOnly
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground/80 focus:outline-none"
                  />
                </Field>
                <Field label="목표 비중 (%)" error={errors[index]?.targetRatio}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={asset.targetRatio || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "targetRatio",
                        e.target.value === "" ? 0 : Number(e.target.value)
                      )
                    }
                    placeholder="예: 30"
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddAsset}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 text-xs font-semibold text-primary transition-all hover:border-primary hover:bg-primary/10"
        >
          <Plus className="h-4 w-4" />
          보유 종목 추가하기
        </button>
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

function Field({
  label,
  error,
  children,
}: {
  label: React.ReactNode
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-semibold text-muted-foreground">
        {label}
      </label>
      {children}
      {error && <p className="text-[10px] font-semibold text-red-400">{error}</p>}
    </div>
  )
}
