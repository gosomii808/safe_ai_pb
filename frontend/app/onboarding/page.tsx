"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import { InvestmentProfileStep } from "@/components/onboarding/InvestmentProfileStep"
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress"
import { PersonalInfoStep } from "@/components/onboarding/PersonalInfoStep"
import { PortfolioInputStep } from "@/components/onboarding/PortfolioInputStep"
import { ReviewSubmitStep } from "@/components/onboarding/ReviewSubmitStep"
import { submitOnboarding } from "@/lib/api"
import type {
  InvestmentProfile,
  OnboardingPayload,
  PersonalInfo,
  PortfolioAssetInput,
} from "@/lib/onboarding-types"

const SUBMIT_ERROR_MESSAGE =
  "회원가입 정보를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요."

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitError, setSubmitError] = useState("")
  const totalSteps = 4

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    nickname: "",
    email: "",
    password: "",
    phone: "",
    ageRange: "",
    occupation: "",
  })

  const [investmentProfile, setInvestmentProfile] = useState<InvestmentProfile>({
    riskType: "",
    investmentGoal: "",
    investmentExperience: "",
    preferredAssets: [],
  })

  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAssetInput[]>([])

  const handleBack = () => {
    if (step > 1) {
      setSubmitError("")
      setStep((current) => current - 1)
    }
  }

  const handleFinalSubmit = async () => {
    const finalPayload: OnboardingPayload = {
      personalInfo,
      investmentProfile,
      portfolioAssets,
    }

    setSubmitError("")

    try {
      const result = await submitOnboarding(finalPayload)
      localStorage.setItem("safe_pb_user_id", result.userId)
      localStorage.setItem("safe_pb_session", result.session)
      router.push("/portfolio")
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : SUBMIT_ERROR_MESSAGE)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <img
            src="/arch_logo.png"
            alt="Arch"
            className="h-9 w-9 rounded-xl object-cover"
          />
          <span className="text-lg font-bold text-foreground">Arch</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          보안 저장 연결됨
        </div>
      </div>

      <main className="my-8 flex flex-1 items-center justify-center">
        <div className="glass-card relative w-full max-w-2xl space-y-8 overflow-hidden rounded-2xl border border-border/80 p-6 shadow-2xl sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative z-10 space-y-1">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              포트폴리오 회원가입
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              입력한 개인정보와 포트폴리오 수치는 백엔드에서 암호화해 저장합니다.
            </p>
          </div>

          <div className="relative z-10 py-2">
            <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
          </div>

          <div className="relative z-10 border-t border-border/50 pt-4">
            {step === 1 && (
              <PersonalInfoStep
                data={personalInfo}
                onNext={(data) => {
                  setPersonalInfo(data)
                  setStep(2)
                }}
              />
            )}
            {step === 2 && (
              <InvestmentProfileStep
                data={investmentProfile}
                onNext={(data) => {
                  setInvestmentProfile(data)
                  setStep(3)
                }}
                onBack={handleBack}
              />
            )}
            {step === 3 && (
              <PortfolioInputStep
                data={portfolioAssets}
                onNext={(data) => {
                  setPortfolioAssets(data)
                  setStep(4)
                }}
                onBack={handleBack}
              />
            )}
            {step === 4 && (
              <ReviewSubmitStep
                payload={{ personalInfo, investmentProfile, portfolioAssets }}
                onSubmit={handleFinalSubmit}
                onBack={handleBack}
                errorMessage={submitError}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-2xl border-t border-border pt-4 text-center text-[10px] leading-relaxed text-muted-foreground">
        <p>
          Arch는 민감 정보를 암호화 저장하며, AI 리포트에는 원본 수량과
          매수금액을 직접 노출하지 않습니다.
        </p>
      </footer>
    </div>
  )
}
