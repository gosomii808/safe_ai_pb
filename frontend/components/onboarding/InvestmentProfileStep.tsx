"use client"

import { useState } from "react"
import { InvestmentProfile } from "@/lib/onboarding-types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlertCircle, ShieldAlert, Target, Award, Layers } from "lucide-react"

interface InvestmentProfileStepProps {
  data: InvestmentProfile;
  onNext: (data: InvestmentProfile) => void;
  onBack: () => void;
}

const riskTypes = [
  { value: "안정형", desc: "원금 손실을 원치 않으며, 예적금 수준의 안정적 자산 운용 선호" },
  { value: "안정추구형", desc: "원금 손실을 최소화하고, 채권 등의 비중을 높여 안정적인 성과 지향" },
  { value: "위험중립형", desc: "예적금보다 높은 수익률을 위해 일정 수준의 손실 위험을 감수 가능" },
  { value: "적적투자형", desc: "투자 원금의 일부 손실 위험을 수용하며 주식 등 성장성 높은 자산에 투자" },
  { value: "공격투자형", desc: "높은 수익률을 위해 원금 대부분의 손실 위험 및 극심한 변동성 감수 가능" },
];

const investmentGoals = [
  "장기 자산 형성",
  "단기 수익 추구",
  "은퇴 준비",
  "배당 수익",
  "학습/경험",
  "기타",
];

const experiences = [
  "1년 미만",
  "1~3년",
  "3~5년",
  "5년 이상",
];

const assetOptions = [
  "국내주식",
  "해외주식",
  "ETF",
  "채권",
  "현금성 자산",
  "기타",
];

export function InvestmentProfileStep({ data, onNext, onBack }: InvestmentProfileStepProps) {
  const [formData, setFormData] = useState<InvestmentProfile>({
    riskType: data.riskType || "",
    investmentGoal: data.investmentGoal || "",
    investmentExperience: data.investmentExperience || "",
    preferredAssets: data.preferredAssets || [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InvestmentProfile, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InvestmentProfile, string>> = {};

    if (!formData.riskType) {
      newErrors.riskType = "투자 성향을 선택해 주세요.";
    }
    if (!formData.investmentGoal) {
      newErrors.investmentGoal = "투자 목적을 선택해 주세요.";
    }
    if (!formData.investmentExperience) {
      newErrors.investmentExperience = "투자 경험을 선택해 주세요.";
    }
    if (formData.preferredAssets.length === 0) {
      newErrors.preferredAssets = "최소 한 개 이상의 관심 자산을 선택해 주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  const handleSelectRisk = (value: string) => {
    setFormData(prev => ({ ...prev, riskType: value }));
    if (errors.riskType) setErrors(prev => ({ ...prev, riskType: "" }));
  };

  const handleSelectGoal = (value: string) => {
    setFormData(prev => ({ ...prev, investmentGoal: value }));
    if (errors.investmentGoal) setErrors(prev => ({ ...prev, investmentGoal: "" }));
  };

  const handleSelectExperience = (value: string) => {
    setFormData(prev => ({ ...prev, investmentExperience: value }));
    if (errors.investmentExperience) setErrors(prev => ({ ...prev, investmentExperience: "" }));
  };

  const handleToggleAsset = (asset: string) => {
    setFormData(prev => {
      const isSelected = prev.preferredAssets.includes(asset);
      const nextAssets = isSelected
        ? prev.preferredAssets.filter(a => a !== asset)
        : [...prev.preferredAssets, asset];
      return { ...prev, preferredAssets: nextAssets };
    });
    if (errors.preferredAssets) setErrors(prev => ({ ...prev, preferredAssets: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Encryption Warning */}
      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4 flex gap-3">
        <ShieldAlert className="h-5 w-5 shrink-0 text-yellow-500 mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <p className="font-semibold text-yellow-500 mb-1">금융 투자 성향 보호 안내</p>
          <p>
            투자 성향 및 목적 정보는 맞춤형 포트폴리오 진단 알고리즘과 AI 투자 분석 조언을 설계하기 위한 핵심 변수입니다. 
            해당 정보 또한 <span className="text-foreground font-medium">개인 신용 관련 민감정보로 인지하여 백엔드 DB 저장 시 암호화 처리</span>됩니다.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Risk Type Selection - Custom Cards */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            투자 성향
          </label>
          <div className="grid gap-2">
            {riskTypes.map((type) => {
              const isSelected = formData.riskType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleSelectRisk(type.value)}
                  className={cn(
                    "text-left p-3.5 rounded-xl border transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-muted/20 hover:bg-muted/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("text-sm font-semibold", isSelected ? "text-primary" : "text-foreground")}>
                      {type.value}
                    </span>
                    <div className={cn("h-4 w-4 rounded-full border flex items-center justify-center", isSelected ? "border-primary" : "border-muted-foreground/30")}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {type.desc}
                  </p>
                </button>
              );
            })}
          </div>
          {errors.riskType && (
            <p className="text-xs text-red-400 font-medium">{errors.riskType}</p>
          )}
        </div>

        {/* Investment Goal */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Target className="h-4 w-4 text-muted-foreground" />
            투자 목적
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {investmentGoals.map((goal) => {
              const isSelected = formData.investmentGoal === goal;
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleSelectGoal(goal)}
                  className={cn(
                    "h-11 px-3 rounded-xl border text-xs font-semibold transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {goal}
                </button>
              );
            })}
          </div>
          {errors.investmentGoal && (
            <p className="text-xs text-red-400 font-medium">{errors.investmentGoal}</p>
          )}
        </div>

        {/* Investment Experience */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Award className="h-4 w-4 text-muted-foreground" />
            투자 경험
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {experiences.map((exp) => {
              const isSelected = formData.investmentExperience === exp;
              return (
                <button
                  key={exp}
                  type="button"
                  onClick={() => handleSelectExperience(exp)}
                  className={cn(
                    "h-11 px-3 rounded-xl border text-xs font-semibold transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {exp}
                </button>
              );
            })}
          </div>
          {errors.investmentExperience && (
            <p className="text-xs text-red-400 font-medium">{errors.investmentExperience}</p>
          )}
        </div>

        {/* Preferred Assets */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-muted-foreground" />
            관심 자산 <span className="text-xs text-muted-foreground font-normal">(중복 선택 가능)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {assetOptions.map((asset) => {
              const isSelected = formData.preferredAssets.includes(asset);
              return (
                <button
                  key={asset}
                  type="button"
                  onClick={() => handleToggleAsset(asset)}
                  className={cn(
                    "h-10 px-4 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center gap-2",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className={cn("h-3 w-3 rounded border flex items-center justify-center", isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30")}>
                    {isSelected && (
                      <svg className="h-2 w-2 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  {asset}
                </button>
              );
            })}
          </div>
          {errors.preferredAssets && (
            <p className="text-xs text-red-400 font-medium">{errors.preferredAssets}</p>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-11 px-8 rounded-xl border-border hover:bg-muted text-foreground"
        >
          이전 단계
        </Button>
        <Button type="submit" className="h-11 px-8 rounded-xl font-medium">
          다음 단계
        </Button>
      </div>
    </form>
  );
}
