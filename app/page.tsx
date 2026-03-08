import { Metadata } from 'next'
import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/landing/HeroSection"
import { ProblemSolution } from "@/components/landing/ProblemSolution"
import { SocialProof } from "@/components/landing/SocialProof"
import { ProductDemo } from "@/components/landing/ProductDemo"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Features } from "@/components/landing/Features"
import { CommunityStats } from "@/components/landing/CommunityStats"
import { TrustSection } from "@/components/landing/TrustSection"
import { Testimonials } from "@/components/landing/Testimonials"
import { CTASection } from "@/components/landing/CTASection"
import { LandingFooter } from "@/components/landing/LandingFooter"

export const metadata: Metadata = {
  title: 'Kanya | The Social Network for Pets',
  description: 'Connect pets nearby for playdates, friendships, and social adventures. Free to join and trusted by thousands of pet owners.',
  openGraph: {
    images: [{ url: '/landing/hero/og-image.webp' }],
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <NavBar />
      <main className="flex-1 w-full overflow-x-hidden">
        <HeroSection />
        <ProblemSolution />
        <SocialProof />
        <ProductDemo />
        <HowItWorks />
        <Features />
        <CommunityStats />
        <TrustSection />
        <Testimonials />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  )
}
