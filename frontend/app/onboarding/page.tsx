"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { OnboardingPayload, PersonalInfo, InvestmentProfile, PortfolioAssetInput } from "@/lib/onboarding-types"
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress"
import { PersonalInfoStep } from "@/components/onboarding/PersonalInfoStep"
import { InvestmentProfileStep } from "@/components/onboarding/InvestmentProfileStep"
import { PortfolioInputStep } from "@/components/onboarding/PortfolioInputStep"
import { ReviewSubmitStep } from "@/components/onboarding/ReviewSubmitStep"
import { TrendingUp, ShieldCheck } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    nickname: "",
    email: "",
    phone: "",
    ageRange: "",
    occupation: "",
  });

  const [investmentProfile, setInvestmentProfile] = useState<InvestmentProfile>({
    riskType: "",
    investmentGoal: "",
    investmentExperience: "",
    preferredAssets: [],
  });

  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAssetInput[]>([]);

  const handleNextStep1 = (data: PersonalInfo) => {
    setPersonalInfo(data);
    setStep(2);
  };

  const handleNextStep2 = (data: InvestmentProfile) => {
    setInvestmentProfile(data);
    setStep(3);
  };

  const handleNextStep3 = (data: PortfolioAssetInput[]) => {
    setPortfolioAssets(data);
    setStep(4);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const submitOnboarding = async (payload: OnboardingPayload) => {
    // TODO: POST /users/onboarding 또는 POST /portfolio API 연동하여 DB 저장 및 분석 트리거링 구현 필요
    // 
    // 예시:
    // try {
    //   const response = await fetch("http://localhost:3000/api/users/onboarding", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });
    //   if (response.ok) {
    //     router.push("/portfolio");
    //   } else {
    //     console.error("온보딩 데이터 전송 실패");
    //   }
    // } catch (err) {
    //   console.error("네트워크 에러", err);
    // }
    //
    // *주의*: 이메일, 전화번호, 금액 및 수량 정보는 전송 시 혹은 백엔드 수신 즉시 암호화 처리 예정입니다.
    
    console.log("Onboarding Form Payload:", JSON.stringify(payload, null, 2));
    
    // API 호출을 대체하여 로컬 스토리지에 모의 저장 (추후 대시보드에서 활용 가능)
    localStorage.setItem("user_onboarding", JSON.stringify(payload));
    
    // 분석 페이지로 이동
    router.push("/portfolio");
  };

  const handleFinalSubmit = () => {
    const finalPayload: OnboardingPayload = {
      personalInfo,
      investmentProfile,
      portfolioAssets,
    };
    submitOnboarding(finalPayload);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Upper Logo Section */}
      <div className="mx-auto w-full max-w-2xl flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">SafePB AI</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          보안 서버 연동 중 (금융 정보 암호화 적용)
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <main className="flex-1 my-8 flex items-center justify-center">
        <div className="w-full max-w-2xl glass-card rounded-2xl p-6 sm:p-8 space-y-8 border border-border/80 shadow-2xl relative overflow-hidden">
          {/* Decorative gradients inside card */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="space-y-1 relative z-10">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              자산관리 온보딩
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              PB 수준의 정밀한 분석을 누구나, 민감 정보는 안전하게 암호화 처리됩니다.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="py-2 relative z-10">
            <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
          </div>

          {/* Step Form Render */}
          <div className="pt-4 border-t border-border/50 relative z-10">
            {step === 1 && (
              <PersonalInfoStep data={personalInfo} onNext={handleNextStep1} />
            )}
            {step === 2 && (
              <InvestmentProfileStep
                data={investmentProfile}
                onNext={handleNextStep2}
                onBack={handleBack}
              />
            )}
            {step === 3 && (
              <PortfolioInputStep
                data={portfolioAssets}
                onNext={handleNextStep3}
                onBack={handleBack}
              />
            )}
            {step === 4 && (
              <ReviewSubmitStep
                payload={{ personalInfo, investmentProfile, portfolioAssets }}
                onSubmit={handleFinalSubmit}
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="text-center text-[10px] text-muted-foreground max-w-2xl mx-auto leading-relaxed border-t border-border pt-4 w-full">
        <p>
          SafePB AI는 사용자의 이메일, 전화번호, 투자 성향, 투자 금액, 보유 수량 등 모든 민감한 정보를 암호화(AES-256) 처리하며, 
          금융보안 표준 규정을 준수합니다.
        </p>
        <p className="mt-1">
          AI 분석 가이드 및 리포트 작성 시 원본값은 노출되지 않으며 오직 비식별화된 요약 지표와 통계 모델만을 활용합니다.
        </p>
      </footer>
    </div>
  );
}
