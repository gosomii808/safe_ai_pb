"use client"

import { useState } from "react"
import {
  Eye,
  EyeOff,
  HelpCircle,
  Landmark,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PersonalInfo } from "@/lib/onboarding-types"

interface PersonalInfoStepProps {
  data: PersonalInfo
  onNext: (data: PersonalInfo) => void
}

export function PersonalInfoStep({ data, onNext }: PersonalInfoStepProps) {
  const [formData, setFormData] = useState<PersonalInfo>({
    nickname: data.nickname || "",
    email: data.email || "",
    password: data.password || "",
    phone: data.phone || "",
    ageRange: data.ageRange || "",
    occupation: data.occupation || "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({})
  const [showPassword, setShowPassword] = useState(false)

  const validate = () => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {}

    if (!formData.nickname.trim()) newErrors.nickname = "닉네임을 입력해 주세요."
    if (!formData.email.trim()) {
      newErrors.email = "이메일 주소를 입력해 주세요."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다."
    }
    if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력해 주세요."
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다."
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해 주세요."
    } else if (
      !/^\d{2,3}-\d{3,4}-\d{4}$/.test(formData.phone) &&
      !/^\d{9,11}$/.test(formData.phone)
    ) {
      newErrors.phone = "올바른 전화번호 형식으로 입력해 주세요. 예: 010-1234-5678"
    }
    if (!formData.ageRange) newErrors.ageRange = "연령대를 선택해 주세요."
    if (!formData.occupation) newErrors.occupation = "투자자 유형을 선택해 주세요."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onNext(formData)
  }

  const handleChange = (key: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div className="text-xs leading-relaxed text-muted-foreground">
          <p className="mb-1 font-semibold text-primary">개인정보 보호 안내</p>
          <p>
            이메일과 전화번호는 계정 식별과 분석 결과 확인을 위한 정보입니다.
            백엔드 저장 시 암호화하며, 비밀번호는 복호화할 수 없는 해시로만
            저장합니다.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <InputField
          icon={<User className="h-4 w-4" />}
          label="닉네임"
          error={errors.nickname}
        >
          <input
            type="text"
            value={formData.nickname}
            onChange={(e) => handleChange("nickname", e.target.value)}
            placeholder="예: 홍길동"
            className="h-11 w-full rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </InputField>

        <InputField
          icon={<Mail className="h-4 w-4" />}
          label="이메일"
          helper="로그인에 사용"
          error={errors.email}
        >
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="example@email.com"
            className="h-11 w-full rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </InputField>

        <InputField
          icon={<Lock className="h-4 w-4" />}
          label="비밀번호"
          helper="8자 이상"
          error={errors.password}
        >
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="8자 이상 입력"
              className="h-11 w-full rounded-xl border border-border bg-muted/30 px-4 pr-11 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </InputField>

        <InputField
          icon={<Phone className="h-4 w-4" />}
          label="전화번호"
          error={errors.phone}
        >
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="010-1234-5678"
            className="h-11 w-full rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </InputField>

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            icon={<HelpCircle className="h-4 w-4" />}
            label="연령대"
            error={errors.ageRange}
          >
            <select
              value={formData.ageRange}
              onChange={(e) => handleChange("ageRange", e.target.value)}
              className="h-11 w-full cursor-pointer rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">선택해 주세요</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대">40대</option>
              <option value="50대 이상">50대 이상</option>
            </select>
          </InputField>

          <InputField
            icon={<Landmark className="h-4 w-4" />}
            label="투자자 유형"
            error={errors.occupation}
          >
            <select
              value={formData.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              className="h-11 w-full cursor-pointer rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">선택해 주세요</option>
              <option value="대학생">대학생</option>
              <option value="직장인">직장인</option>
              <option value="자영업자">자영업자</option>
              <option value="프리랜서">프리랜서</option>
              <option value="은퇴자">은퇴자</option>
              <option value="기타">기타</option>
            </select>
          </InputField>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="h-11 rounded-xl px-8 font-medium">
          다음 단계
        </Button>
      </div>
    </form>
  )
}

function InputField({
  icon,
  label,
  helper,
  error,
  children,
}: {
  icon: React.ReactNode
  label: string
  helper?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <span className="text-muted-foreground">{icon}</span>
        {label}
        {helper && <span className="text-xs font-normal text-primary">({helper})</span>}
      </label>
      {children}
      {error && <p className="text-xs font-medium text-red-400">{error}</p>}
    </div>
  )
}
