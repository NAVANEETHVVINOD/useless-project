import { Container } from "@/components/layout/container"
import { AlertCircle, ShieldOff, Users2, Zap, ShieldCheck, MapPinned } from "lucide-react"

export function ProblemSolution() {
  const problems = [
    {
      icon: <AlertCircle className="w-5 h-5 text-rose-400" />,
      title: "Hard to find compatible pets",
      desc: "Randomly meeting pets at parks is unreliable. Compatibility matters."
    },
    {
      icon: <ShieldOff className="w-5 h-5 text-rose-400" />,
      title: "Unsafe meetups",
      desc: "Meeting strangers with their pets without any verification is risky."
    },
    {
      icon: <Users2 className="w-5 h-5 text-rose-400" />,
      title: "No platform for socialization",
      desc: "There's no easy way to find and organize pet playdates nearby."
    }
  ]

  const solutions = [
    {
      icon: <Zap className="w-5 h-5 text-[var(--color-primary)]" />,
      title: "Smart pet matching",
      desc: "Our algorithm matches pets based on breed, temperament, and energy level."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[var(--color-primary)]" />,
      title: "Verified pet owners",
      desc: "Every profile is verified to ensure safe and trusted interactions."
    },
    {
      icon: <MapPinned className="w-5 h-5 text-[var(--color-primary)]" />,
      title: "Location-based playdates",
      desc: "Find pets near you and organize playdates at trusted, nearby spots."
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-white border-t border-border/30">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text)] mb-4">
            The Problem
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Pet owners face real challenges when trying to socialize their pets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {problems.map((p, i) => (
            <div key={i} className="bg-rose-50/50 rounded-[var(--radius-card)] p-6 border border-rose-100">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text)] mb-4">
            The Solution
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Kanya gives pet owners a safe, structured, and fun way to find friends for their pets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div key={i} className="bg-green-50/50 rounded-[var(--radius-card)] p-6 border border-green-100">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
