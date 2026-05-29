"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const userId = window.localStorage.getItem("safe_pb_user_id")
    const session = window.localStorage.getItem("safe_pb_session")

    if (!userId || !session) {
      const next = encodeURIComponent(pathname || "/portfolio")
      router.replace(`/login?next=${next}`)
      return
    }

    setAllowed(true)
  }, [pathname, router])

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          로그인 상태를 확인하고 있습니다.
        </div>
      </div>
    )
  }

  return <>{children}</>
}
