import { AppNavigation } from "@/components/navigation/app-navigation"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
      <AppNavigation />
    </div>
  )
}
