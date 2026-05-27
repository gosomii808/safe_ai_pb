"use client"

import { useState } from "react"
import { OnboardingPayload } from "@/lib/onboarding-types"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Lock, Landmark, CheckCircle2, ChevronRight, User } from "lucide-react"

interface ReviewSubmitStepProps {
  payload: OnboardingPayload;
  onSubmit: () => void;
  onBack: () => void;
}

export function ReviewSubmitStep({ payload, onSubmit, onBack }: ReviewSubmitStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Masking functions
  const maskEmail = (email: string): string => {
    if (!email) return "";
    const [local, domain] = email.split("@");
    if (!domain) return email;
    if (local.length <= 2) {
      return `${local.charAt(0)}*@${domain}`;
    }
    return `${local.substring(0, 2)}***@${domain}`;
  };

  const maskPhone = (phone: string): string => {
    if (!phone) return "";
    // Format: 010-1234-5678 or similar
    const cleanPhone = phone.replace(/-/g, "");
    if (cleanPhone.length >= 10) {
      const start = cleanPhone.substring(0, 3);
      const end = cleanPhone.substring(cleanPhone.length - 4);
      return `${start}-****-${end}`;
    }
    return phone; // Fallback
  };

  const handleStartAnalysis = async () => {
    setIsSubmitting(true);
    // Simulate database write / analysis startup
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubmit();
  };

  const totalInvestmentAmount = payload.portfolioAssets.reduce((sum, asset) => sum + asset.investmentAmount, 0);

  return (
    <div className="space-y-6">
      {/* Encryption Banner */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex gap-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-primary mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <p className="font-semibold text-primary mb-1">안전한 데이터 격리 및 비식별화</p>
          <p>
            귀하의 모든 금융 정보는 당사 보안 솔루션에 의해 안전하게 격리되어 관리됩니다. 
            AI 투자 분석엔진은 <span className="text-foreground font-medium">실제 금액과 성향 원본 데이터를 직접 읽지 않고</span>, 
            비식별화 데이터 모델(비중 및 상대지수)만을 활용하여 리포트를 도출합니다.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground">입력한 정보 요약</h3>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Card 1: Personal Info */}
          <div className="glass-card p-4 rounded-xl border border-border space-y-3">
            <h4 className="text-xs font-semibold text-primary flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              기본 개인정보
            </h4>
            <div className="text-xs space-y-1.5 text-muted-foreground">
              <div className="flex justify-between">
                <span>닉네임</span>
                <span className="text-foreground font-medium">{payload.personalInfo.nickname}</span>
              </div>
              <div className="flex justify-between">
                <span>이메일</span>
                <span className="text-foreground font-medium">{maskEmail(payload.personalInfo.email)}</span>
              </div>
              <div className="flex justify-between">
                <span>전화번호</span>
                <span className="text-foreground font-medium">{maskPhone(payload.personalInfo.phone)}</span>
              </div>
              <div className="flex justify-between">
                <span>연령대 / 유형</span>
                <span className="text-foreground font-medium">{payload.personalInfo.ageRange} · {payload.personalInfo.occupation}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Investment Profile */}
          <div className="glass-card p-4 rounded-xl border border-border space-y-3">
            <h4 className="text-xs font-semibold text-primary flex items-center gap-1">
              <Landmark className="h-3.5 w-3.5" />
              투자 성향 및 성격
            </h4>
            <div className="text-xs space-y-1.5 text-muted-foreground">
              <div className="flex justify-between">
                <span>투자 성향</span>
                <span className="text-foreground font-medium">{payload.investmentProfile.riskType}</span>
              </div>
              <div className="flex justify-between">
                <span>투자 목적</span>
                <span className="text-foreground font-medium">{payload.investmentProfile.investmentGoal}</span>
              </div>
              <div className="flex justify-between">
                <span>경험 수준</span>
                <span className="text-foreground font-medium">{payload.investmentProfile.investmentExperience}</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1 justify-end">
                {payload.investmentProfile.preferredAssets.map(asset => (
                  <span key={asset} className="px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground">
                    {asset}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Portfolio Summary */}
        <div className="glass-card p-4 rounded-xl border border-border space-y-3">
          <h4 className="text-xs font-semibold text-primary flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            자산 및 포트폴리오 구성 ({payload.portfolioAssets.length}개 종목)
          </h4>
          
          <div className="divide-y divide-border/50 text-xs">
            {payload.portfolioAssets.map((asset, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between text-muted-foreground first:pt-0 last:pb-0">
                <div>
                  <p className="font-semibold text-foreground">{asset.stockName} <span className="text-[10px] text-muted-foreground font-normal">({asset.ticker})</span></p>
                  <p className="text-[10px] text-muted-foreground">{asset.market} · {asset.sector}</p>
                </div>
                <div className="text-right">
                  <p className="text-foreground font-medium">목표 비중 {asset.targetRatio}%</p>
                  <p className="text-[10px] text-primary flex items-center gap-0.5 justify-end">
                    <Lock className="h-2.5 w-2.5" />
                    수량/금액 암호화 완료
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-3 flex justify-between items-center text-xs font-semibold text-foreground">
            <span>총 투자 금액</span>
            <span className="text-primary flex items-center gap-1">
              <Lock className="h-3 w-3" />
              ₩ ***** (보안 마스킹)
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="h-11 px-8 rounded-xl border-border hover:bg-muted text-foreground"
        >
          이전 단계
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
              포트폴리오 분석 중...
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
  );
}
