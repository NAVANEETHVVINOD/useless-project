import { Container } from "@/components/layout/container"
import { PawPrint, Heart, MapPin } from "lucide-react"

export function SocialProof() {
  const stats = [
    { icon: <PawPrint className="w-5 h-5 text-[var(--color-primary)]" />, number: "25K+", label: "pets registered" },
    { icon: <Heart className="w-5 h-5 text-rose-400" />, number: "10K+", label: "matches made" },
    { icon: <MapPin className="w-5 h-5 text-sky-500" />, number: "120+", label: "cities" },
  ]

  return (
    <section className="py-16 md:py-20 bg-[var(--color-bg)] border-y border-border/30">
      <Container>
        <div className="grid grid-cols-3 gap-4 md:gap-8 text-center max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="p-4 md:p-6 rounded-2xl bg-white border border-border/50 shadow-sm">
              <div className="mx-auto flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 mb-3">
                {s.icon}
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-[var(--color-text)] mb-1">{s.number}</h3>
              <p className="text-xs md:text-sm font-medium text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
