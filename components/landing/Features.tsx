import { Container } from "@/components/layout/container"
import { SlidersHorizontal, CalendarHeart, Activity } from "lucide-react"

export function Features() {
  const cards = [
    {
      icon: <SlidersHorizontal className="w-6 h-6 text-[var(--color-primary)]" />,
      title: "Breed-Specific Filters",
      desc: "Find the right playmate with advanced filters for breed, size, temperament, and energy level."
    },
    {
      icon: <CalendarHeart className="w-6 h-6 text-[var(--color-primary)]" />,
      title: "Event Hosting",
      desc: "Host or join community events like group walks, pet meetups, and adoption drives in your area."
    },
    {
      icon: <Activity className="w-6 h-6 text-[var(--color-primary)]" />,
      title: "Activity Logs",
      desc: "Track your pet's social activity, past playdates, and connections to stay engaged."
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-white border-t border-border/50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Features
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-white rounded-[var(--radius-card)] p-8 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl border border-border bg-slate-50 flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
