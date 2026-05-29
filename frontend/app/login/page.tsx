"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loginUser } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await loginUser(email, password)
      localStorage.setItem("safe_pb_user_id", result.userId)
      localStorage.setItem("safe_pb_session", result.session)
      router.push("/portfolio")
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary/20 via-background to-background p-12 lg:flex">
        <Brand />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-foreground">
            AI가 분석하는
            <br />
            <span className="text-primary">나만의 투자 포트폴리오</span>
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            저장된 포트폴리오와 시장 데이터를 기반으로 투자 현황과 리스크를
            설명합니다.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 Arch. All rights reserved.
        </p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="lg:hidden">
            <Brand />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">로그인</h2>
            <p className="text-muted-foreground">
              회원가입 때 입력한 이메일과 비밀번호로 로그인하세요.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">이메일</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  className="h-12 w-full rounded-xl border border-border bg-muted/50 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  required
                  className="h-12 w-full rounded-xl border border-border bg-muted/50 pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-xl text-base font-medium"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  로그인 중...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  로그인
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            아직 계정이 없나요?{" "}
            <Link href="/onboarding" className="font-medium text-primary hover:underline">
              무료로 시작하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/arch_logo.png"
        alt="Arch"
        className="h-10 w-10 rounded-xl object-cover"
      />
      <span className="text-xl font-bold text-foreground">Arch</span>
    </div>
  )
}
