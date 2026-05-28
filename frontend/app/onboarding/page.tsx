"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, TrendingUp } from "lucide-react"
import { InvestmentProfileStep } from "@/components/onboarding/InvestmentProfileStep"
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress"
import { PersonalInfoStep } from "@/components/onboarding/PersonalInfoStep"
import { PortfolioInputStep } from "@/components/onboarding/PortfolioInputStep"
import { ReviewSubmitStep } from "@/components/onboarding/ReviewSubmitStep"
import { submitOnboarding } from "@/lib/api"
import {
  InvestmentProfile,
  OnboardingPayload,
  PersonalInfo,
  PortfolioAssetInput,
} from "@/lib/onboarding-types"

const SUBMIT_ERROR_MESSAGE =
  "Unable to save onboarding information. Please try again in a moment."

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitError, setSubmitError] = useState("")
  const totalSteps = 4

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    nickname: "",
    email: "",
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

  const handleNextStep1 = (data: PersonalInfo) => {
    setPersonalInfo(data)
    setStep(2)
  }

  const handleNextStep2 = (data: InvestmentProfile) => {
    setInvestmentProfile(data)
    setStep(3)
  }

  const handleNextStep3 = (data: PortfolioAssetInput[]) => {
    setPortfolioAssets(data)
    setStep(4)
  }

  const handleBack = () => {
    if (step > 1) {
      setSubmitError("")
      setStep(step - 1)
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
      router.push("/portfolio")
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : SUBMIT_ERROR_MESSAGE)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">SafePB AI</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Secure API connected
        </div>
      </div>

      <main className="flex-1 my-8 flex items-center justify-center">
        <div className="w-full max-w-2xl glass-card rounded-2xl p-6 sm:p-8 space-y-8 border border-border/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-1 relative z-10">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Portfolio Onboarding
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Sensitive information is encrypted on the backend before storage.
            </p>
          </div>

          <div className="py-2 relative z-10">
            <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
          </div>

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
                errorMessage={submitError}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="text-center text-[10px] text-muted-foreground max-w-2xl mx-auto leading-relaxed border-t border-border pt-4 w-full">
        <p>
          SafePB AI stores sensitive values through backend encryption and keeps
          raw portfolio numbers out of AI report inputs.
        </p>
      </footer>
    </div>
  )
}
