"use client"

import { useState } from "react"
import { PersonalInfo } from "@/lib/onboarding-types"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Mail, Phone, User, Landmark, HelpCircle } from "lucide-react"

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onNext: (data: PersonalInfo) => void;
}

export function PersonalInfoStep({ data, onNext }: PersonalInfoStepProps) {
  const [formData, setFormData] = useState<PersonalInfo>({
    nickname: data.nickname || "",
    email: data.email || "",
    phone: data.phone || "",
    ageRange: data.ageRange || "",
    occupation: data.occupation || "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {};

    if (!formData.nickname.trim()) {
      newErrors.nickname = "닉네임을 입력해 주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일 주소를 입력해 주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해 주세요.";
    } else if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(formData.phone) && !/^\d{9,11}$/.test(formData.phone)) {
      newErrors.phone = "올바른 전화번호 형식 또는 숫자만 입력해 주세요. (예: 010-1234-5678)";
    }

    if (!formData.ageRange) {
      newErrors.ageRange = "연령대를 선택해 주세요.";
    }

    if (!formData.occupation) {
      newErrors.occupation = "직업 또는 투자자 유형을 선택해 주세요.";
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

  const handleChange = (key: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Security Banner */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex gap-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-primary mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <p className="font-semibold text-primary mb-1">민감 정보 암호화 안내</p>
          <p>
            이메일과 전화번호는 자산 분석 결과를 안전하게 전달하고 본인을 식별하기 위한 민감정보입니다.
            <span className="text-foreground font-medium"> 입력한 모든 개인정보는 백엔드 저장 시 즉시 강력하게 암호화(AES-256 등) 처리</span>되며,
            외부에 유출되지 않도록 철저히 보호됩니다.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Nickname */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <User className="h-4 w-4 text-muted-foreground" />
            닉네임
          </label>
          <input
            type="text"
            value={formData.nickname}
            onChange={(e) => handleChange("nickname", e.target.value)}
            placeholder="홍길동"
            className="h-11 w-full rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {errors.nickname && (
            <p className="text-xs text-red-400 font-medium">{errors.nickname}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-muted-foreground" />
            이메일 <span className="text-xs text-primary font-normal">(암호화 대상)</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="example@email.com"
            className="h-11 w-full rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {errors.email && (
            <p className="text-xs text-red-400 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-muted-foreground" />
            전화번호 <span className="text-xs text-primary font-normal">(암호화 대상)</span>
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="010-1234-5678"
            className="h-11 w-full rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {errors.phone && (
            <p className="text-xs text-red-400 font-medium">{errors.phone}</p>
          )}
        </div>

        {/* Grid for Select inputs */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Age Range */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
              연령대
            </label>
            <select
              value={formData.ageRange}
              onChange={(e) => handleChange("ageRange", e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-background text-muted-foreground">선택해 주세요</option>
              <option value="20대" className="bg-background text-foreground">20대</option>
              <option value="30대" className="bg-background text-foreground">30대</option>
              <option value="40대" className="bg-background text-foreground">40대</option>
              <option value="50대 이상" className="bg-background text-foreground">50대 이상</option>
            </select>
            {errors.ageRange && (
              <p className="text-xs text-red-400 font-medium">{errors.ageRange}</p>
            )}
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Landmark className="h-4 w-4 text-muted-foreground" />
              투자자 유형
            </label>
            <select
              value={formData.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-muted/30 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-background text-muted-foreground">선택해 주세요</option>
              <option value="대학생" className="bg-background text-foreground">대학생</option>
              <option value="직장인" className="bg-background text-foreground">직장인</option>
              <option value="자영업자" className="bg-background text-foreground">자영업자</option>
              <option value="프리랜서" className="bg-background text-foreground">프리랜서</option>
              <option value="은퇴자" className="bg-background text-foreground">은퇴자</option>
              <option value="기타" className="bg-background text-foreground">기타</option>
            </select>
            {errors.occupation && (
              <p className="text-xs text-red-400 font-medium">{errors.occupation}</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" className="h-11 px-8 rounded-xl font-medium">
          다음 단계
        </Button>
      </div>
    </form>
  );
}
