import { Container } from "@/components/layout/container"
import { UserPlus, Compass, MessageCircleHeart } from "lucide-react"

export function HowItWorks() {
  const items = [
    {
      icon: <UserPlus className="w-6 h-6 text-[var(--color-primary)]" />,
      title: "Create pet profile",
      desc: "Add your pet's photos, breed, age, and personality to build a profile that attracts compatible matches."
    },
    {
      icon: <Compass className="w-6 h-6 text-[var(--color-primary)]" />,
      title: "Discover nearby pets",
      desc: "Browse pets close to you using smart filters for breed, size, energy level, and distance."
    },
    {
      icon: <MessageCircleHeart className="w-6 h-6 text-[var(--color-primary)]" />,
      title: "Match and connect",
      desc: "When both pets match, start chatting with the owner and arrange a safe playdate."
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-[var(--color-bg)]/50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-[var(--radius-card)] p-8 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg)] flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
