"use client"

import { Bell, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { AIChatModal } from "@/components/ai/chat-modal"

export function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [notifications] = useState([
    { id: 1, title: "FOMC 회의 결과 발표", time: "10분 전", unread: true },
    { id: 2, title: "포트폴리오 리밸런싱 추천", time: "1시간 전", unread: true },
    { id: 3, title: "AI 리포트가 생성되었습니다", time: "3시간 전", unread: false },
  ])

  const unreadCount = notifications.filter(n => n.unread).length

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
                <div className="flex w-full items-center justify-between">
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
                <span>김투자</span>
                <span className="text-xs font-normal text-muted-foreground">
                  investor@example.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>프로필 설정</DropdownMenuItem>
            <DropdownMenuItem>구독 관리</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </header>

      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
