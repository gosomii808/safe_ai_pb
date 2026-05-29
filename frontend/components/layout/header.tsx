"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, LogOut, Sparkles, User } from "lucide-react"
import { AIChatModal } from "@/components/ai/chat-modal"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const router = useRouter()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [notifications] = useState([
    { id: 1, title: "기준금리 이벤트가 업데이트되었습니다", time: "최근", unread: true },
    { id: 2, title: "포트폴리오 분석 데이터가 준비되었습니다", time: "오늘", unread: true },
    { id: 3, title: "AI 리포트를 확인할 수 있습니다", time: "오늘", unread: false },
  ])

  const unreadCount = notifications.filter((item) => item.unread).length

  const handleLogout = () => {
    localStorage.removeItem("safe_pb_user_id")
    localStorage.removeItem("safe_pb_session")
    router.replace("/login")
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg lg:px-6">
        <div className="flex items-center gap-4 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <span className="font-semibold text-foreground">SafePB AI</span>
        </div>

        <div className="hidden flex-1 lg:block">
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex h-10 w-full max-w-md items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-muted"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI 어시스턴트에게 질문하기...</span>
            <span className="ml-auto rounded-md bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              AI
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl lg:hidden"
            onClick={() => setIsChatOpen(true)}
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-xl">
                <Bell className="h-5 w-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-xl">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>알림</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {unreadCount}개의 새 알림
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex cursor-pointer flex-col items-start gap-1 p-3"
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className={notification.unread ? "font-medium" : ""}>
                      {notification.title}
                    </span>
                    {notification.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>내 계정</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    로그인됨
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
