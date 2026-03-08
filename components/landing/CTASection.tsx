"use client"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

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

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-[var(--color-primary)] via-emerald-600 to-teal-700 text-white relative overflow-hidden">
      {/* Paw pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute top-8 left-12 rotate-12"><PawSvg className="w-14 h-14 text-white" /></div>
        <div className="absolute top-20 right-24 -rotate-12"><PawSvg className="w-10 h-10 text-white" /></div>
        <div className="absolute bottom-12 left-1/3 rotate-6"><PawSvg className="w-12 h-12 text-white" /></div>
        <div className="absolute bottom-20 right-12 -rotate-6"><PawSvg className="w-16 h-16 text-white" /></div>
        <div className="absolute top-1/2 left-8 rotate-[20deg]"><PawSvg className="w-8 h-8 text-white" /></div>
        <div className="absolute top-1/3 right-1/4 -rotate-[15deg]"><PawSvg className="w-11 h-11 text-white" /></div>
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Your Pet&apos;s Next Best Friend Is Waiting
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8">
            Free to join • Takes less than 2 minutes
          </p>
          <Link href="/signup">
            <Button className="bg-white text-[var(--color-primary)] hover:bg-white/90 rounded-[var(--radius-pill)] py-4 px-8 text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all h-auto">
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
