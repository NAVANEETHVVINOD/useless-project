import { Container } from "@/components/layout/container"
import { Heart } from "lucide-react"

export function ProductDemo() {
  const steps = [
    {
      title: "Create pet profile",
      description: "Add photos, breed, age, personality traits, and playdate preferences."
    },
    {
      title: "Discover nearby pets",
      description: "Browse curated pet profiles filtered by location, breed, and energy level."
    },
    {
      title: "Match and arrange playdates",
      description: "When you both like each other's profiles, chat and set up a safe meet-up."
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Text & Steps */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-6 tracking-tight">
              How Kanya Works
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              A high-fidelity matching experience designed for pet owners who care about compatibility.
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-bg)] text-[var(--color-primary)] flex items-center justify-center font-bold text-lg border border-[var(--color-primary)]/20 shadow-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: UI Preview */}
          <div className="relative flex justify-center">
            {/* Decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--color-primary)]/10 rounded-full blur-3xl -z-10" />

            {/* Phone Mockup Frame */}
            <div className="relative w-[280px] h-[560px] sm:w-[300px] sm:h-[600px] bg-black rounded-[48px] shadow-2xl border-[8px] border-black overflow-hidden ring-1 ring-border/10">
              {/* Dynamic Island Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20" />

              {/* App UI Canvas */}
              <div className="w-full h-full bg-slate-50 relative flex flex-col pt-12">
                {/* Mock Header */}
                <div className="px-5 flex items-center justify-between mb-4">
                  <div className="w-6 h-6 rounded-full bg-slate-200" />
                  <div className="flex space-x-2 bg-slate-200 p-1 rounded-full">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-bold shadow-sm">Matching</span>
                    <span className="px-3 py-1 text-slate-500 rounded-full text-xs font-semibold">Matched</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-200" />
                </div>

                {/* Mock Card */}
                <div className="flex-1 px-4 pb-8">
                  <div className="w-full h-[85%] bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden relative flex flex-col">
                    <div className="flex-1 bg-gradient-to-br from-amber-100 to-amber-50 relative flex items-center justify-center">
                      {/* SVG Paw Illustration */}
                      <svg className="w-20 h-20 text-amber-300/60" viewBox="0 0 24 24" fill="currentColor">
                        <ellipse cx="8" cy="7" rx="2.5" ry="3" />
                        <ellipse cx="16" cy="7" rx="2.5" ry="3" />
                        <ellipse cx="4.5" cy="13" rx="2" ry="2.5" />
                        <ellipse cx="19.5" cy="13" rx="2" ry="2.5" />
                        <path d="M12 22c-4 0-7-3-7-6.5S8 10 12 10s7 2 7 5.5S16 22 12 22z" />
                      </svg>
                      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500 fill-current" />
                      </div>
                    </div>
                    <div className="p-4 bg-white relative">
                      <div className="absolute -top-3 right-4 bg-[var(--color-primary)] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">2 km away</div>
                      <h4 className="text-lg font-bold text-[var(--color-text)]">Milo</h4>
                      <p className="text-xs text-slate-500 mb-1">Golden Retriever</p>
                      <p className="text-xs text-slate-400">2 years</p>
                      <div className="flex justify-between mt-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 text-lg">✕</div>
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[var(--color-primary)]">
                          <Heart className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
