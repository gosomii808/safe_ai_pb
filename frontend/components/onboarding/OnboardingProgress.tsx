"use client"

import { cn } from "@/lib/utils"
import { User, ShieldAlert, PieChart, FileText } from "lucide-react"

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { label: "개인정보", icon: User },
  { label: "투자 성향", icon: ShieldAlert },
  { label: "자산 입력", icon: PieChart },
  { label: "최종 확인", icon: FileText },
];

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar Container */}
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-muted-foreground/20" />
        
        {/* Active Line */}
        <div 
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-300 ease-out" 
          style={{ width: `${progressPercent}%` }}
        />

        {/* Step Circles */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.label} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isActive && "border-primary bg-background text-primary scale-110 shadow-lg shadow-primary/20",
                  !isCompleted && !isActive && "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span 
                className={cn(
                  "absolute top-12 whitespace-nowrap text-xs font-medium transition-colors duration-300",
                  isActive && "text-primary font-semibold",
                  isCompleted && "text-foreground",
                  !isCompleted && !isActive && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
