"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, PawPrint } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

export function NavBar() {
    const pathname = usePathname()
    const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup")

    if (isAuthPage) return null

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/playdates", label: "Playdates" },
        { href: "/adoption", label: "Adoption" },
        { href: "/discover", label: "Discover" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur shadow-sm supports-[backdrop-filter]:bg-white/60 dark:bg-background/80 dark:border-border">
            <div className="container mx-auto px-6 flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 mr-8">
                        <PawPrint className="h-6 w-6 text-[var(--color-primary)]" />
                        <span className="font-bold text-xl text-[var(--color-text)] dark:text-foreground">
                            Kanya
                        </span>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors hover:text-[var(--color-primary)]",
                                    pathname === link.href ? "text-[var(--color-text)] font-semibold dark:text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Menu & CTA */}
                <div className="flex items-center gap-4">
                    <Link href="/signup" className="hidden md:block">
                        <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white rounded-[var(--radius-pill)] font-semibold px-6">
                            Create Your Pet Profile
                        </Button>
                    </Link>
                    
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <Link href="/" className="flex items-center gap-2 mb-8">
                                <PawPrint className="h-6 w-6 text-[var(--color-primary)]" />
                                <span className="font-bold text-xl text-[var(--color-text)] dark:text-foreground">
                                    Kanya
                                </span>
                            </Link>
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-[var(--color-primary)]",
                                            pathname === link.href ? "text-[var(--color-text)] dark:text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="h-px bg-border my-2" />
                                <Link href="/signup">
                                    <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white rounded-[var(--radius-pill)] font-semibold">
                                        Create Your Pet Profile
                                    </Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
