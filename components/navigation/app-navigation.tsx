"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageCircle, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function AppNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Discover",
      href: "/discover",
      icon: Home
    },
    {
      label: "Matches",
      href: "/matches",
      icon: MessageCircle
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings
    }
  ]

  // Only show nav on main app pages, hide on specific chat interfaces
  // A simple heuristic: hide if pathname goes deeper than /matches (i.e. /matches/123)
  const isChatRoom = pathname.startsWith("/matches/") && pathname.length > 9

  if (isChatRoom) return null

  return (
    <nav className="h-16 bg-card border-t shrink-0 flex items-center justify-around px-2 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-50">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || (item.href !== "/discover" && pathname.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center p-2 min-w-[64px] rounded-xl transition-all duration-200",
              isActive 
                ? "text-primary scale-110" 
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Icon 
              className={cn(
                "w-6 h-6 mb-1 transition-all",
                isActive && "fill-primary/20"
              )} 
            />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
