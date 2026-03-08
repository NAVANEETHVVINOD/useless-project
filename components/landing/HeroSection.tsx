"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, MapPin, Sparkles } from "lucide-react"

function PawSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="8" cy="6" rx="2.5" ry="3" />
      <ellipse cx="16" cy="6" rx="2.5" ry="3" />
      <ellipse cx="4.5" cy="12" rx="2" ry="2.5" />
      <ellipse cx="19.5" cy="12" rx="2" ry="2.5" />
      <path d="M12 22c-4 0-7-3-7-6.5S8 10 12 10s7 2 7 5.5S16 22 12 22z" />
    </svg>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] pt-16 pb-12 md:pt-28 md:pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-[var(--color-primary)]/10 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-[var(--color-secondary)]/10 blur-3xl opacity-50 pointer-events-none" />

      <Container>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] leading-[1.1] mb-6 tracking-tight"
            >
              Find the Perfect Companion for Your Pet
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base md:text-lg text-muted-foreground mb-8 max-w-[480px]"
            >
              Connect pets nearby for playdates, friendships, and social adventures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mb-6"
            >
              <Link href="/signup">
                <Button className="w-full sm:w-auto bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white rounded-[var(--radius-pill)] h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all">
                  Create Your Pet Profile
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="outline" className="w-full sm:w-auto rounded-[var(--radius-pill)] h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-white text-[var(--color-text)] border-border hover:bg-muted transition-all">
                  Explore Pets Nearby
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm font-medium text-muted-foreground"
            >
              Free to join • Trusted by thousands of pet owners
            </motion.p>
          </div>

          {/* Right Content - Swipe Cards */}
          <div className="relative flex justify-center items-center h-[420px] md:h-[500px] z-10">
            {/* Card 3 (Back) */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 4 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute w-[240px] h-[320px] sm:w-[280px] sm:h-[380px] md:w-[300px] md:h-[400px] bg-white rounded-[var(--radius-card)] shadow-lg border border-border/50 right-2 sm:right-4 md:right-8"
            />

            {/* Card 2 (Middle) */}
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute w-[240px] h-[320px] sm:w-[280px] sm:h-[380px] md:w-[300px] md:h-[400px] bg-white/90 rounded-[var(--radius-card)] shadow-lg border border-border/50 left-2 sm:left-4 md:left-8 backdrop-blur-sm"
            />

            {/* Card 1 (Front) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [-5, 5, -5] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.2 },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
              className="absolute w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] md:w-[320px] md:h-[420px] bg-white rounded-[var(--radius-card)] shadow-2xl overflow-hidden border border-border flex flex-col"
            >
              <div className="relative w-full h-[65%] bg-gradient-to-br from-amber-100 to-emerald-50 flex items-center justify-center">
                <PawSvg className="w-24 h-24 text-[var(--color-primary)]/30" />

                {/* Floating Tags */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Heart className="w-3 h-3 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                  <span className="text-[10px] sm:text-xs font-bold text-[var(--color-text)]">Super Like</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] sm:text-xs font-bold text-[var(--color-text)]">2 km away</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-end bg-white relative">
                {/* Floating matched tag */}
                <div className="absolute -top-3.5 right-3 bg-[var(--color-primary)] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-[10px] font-bold">Matched profiles</span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">Milo</h3>
                  <span className="bg-muted px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold">2 yrs</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 sm:mb-4">Golden Retriever</p>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3 sm:gap-4 mt-auto">
                  <button className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-400 hover:bg-rose-100 hover:scale-105 transition-all shadow-sm" aria-label="Pass">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <button className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-100 hover:scale-105 transition-all shadow-sm" aria-label="Star">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  </button>
                  <button className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 hover:scale-105 transition-all shadow-sm" aria-label="Like">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
