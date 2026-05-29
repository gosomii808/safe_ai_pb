import { Sidebar } from "@/components/layout/sidebar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Header } from "@/components/layout/header"
import { AIChatbot } from "@/components/ai-chatbot"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="lg:pl-64">
          <Header />
          <main className="min-h-[calc(100vh-4rem)] pb-20 lg:pb-0">
            {children}
          </main>
        </div>
        <MobileNav />
        <AIChatbot />
      </div>
    </AuthGuard>
  )
}
