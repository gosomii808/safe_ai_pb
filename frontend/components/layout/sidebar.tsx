"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  PieChart,
  FileText,
  Calendar,
  Shield,
  Settings,
  Bot,
  LogOut,
  TrendingUp,
} from "lucide-react"
import { AIChatModal } from "@/components/ai/chat-modal"

const navItems = [
  { href: "/portfolio", label: "포트폴리오 분석", icon: PieChart },
  { href: "/ai-report", label: "AI 리포트", icon: FileText },
  { href: "/events", label: "경제 이벤트", icon: Calendar },
  { href: "/security", label: "보안 센터", icon: Shield },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <TrendingUp className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">SafePB AI</h1>
          <p className="text-xs text-muted-foreground">AI 자산관리</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-smooth",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          설정
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
          로그아웃
        </Link>
      </div>


    </aside>
  )
}
