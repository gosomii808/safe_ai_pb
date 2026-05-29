"use client"

import { Bot, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { sendChatbotMessage } from "@/lib/api"

interface Message {
  role: "assistant" | "user"
  content: string
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "안녕하세요! Arch AI 어시스턴트입니다. 투자 리스크, 시장 비중, 최근 경제 이벤트 등 궁금하신 사항을 자유롭게 물어보세요.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")

    // 1. 사용자 메시지 추가
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    // 2. localStorage에서 safe_pb_user_id 확인
    const userId = typeof window !== "undefined" ? localStorage.getItem("safe_pb_user_id") : null

    if (!userId) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "온보딩을 먼저 완료해 주세요. 온보딩 완료 후 포트폴리오 맞춤 안내 서비스를 제공받으실 수 있습니다.",
        },
      ])
      return
    }

    setIsLoading(true)

    try {
      // 3. API 호출
      const data = await sendChatbotMessage(userId, userMessage)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ])
    } catch (error) {
      // 4. 에러 시 fallback 안내
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "현재 서비스 요청량이 많아 일시적으로 연결에 실패했습니다. 임시 조치나 통신 장애 현상일 수 있으니 잠시 후 다시 시도해 주시기 바랍니다. (오류가 지속될 경우 고객센터로 문의 주세요.)",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 lg:bottom-6 lg:right-6",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <Bot className="h-6 w-6" />
      </button>

      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 flex h-[500px] w-full flex-col rounded-t-3xl border border-border bg-card shadow-2xl transition-all duration-300 lg:bottom-6 lg:right-6 lg:h-[600px] lg:w-96 lg:rounded-3xl",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0 lg:translate-y-8"
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI 어시스턴트</h3>
              <p className="text-xs text-muted-foreground">항상 대기중</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div 
          ref={chatContainerRef}
          className="flex-1 space-y-4 overflow-y-auto p-4"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 max-w-[80%] rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span>답변을 생성하는 중입니다...</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="h-11 w-11 rounded-xl"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

