import { Container } from "@/components/layout/container"
import { ShieldCheck, Flag, Users } from "lucide-react"

export function TrustSection() {
  const items = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[var(--color-primary)]" />,
      title: "Verified owner profiles",
      desc: "We verify every pet owner before they can connect with others on the platform."
    },
    {
      icon: <Flag className="w-5 h-5 text-[var(--color-primary)]" />,
      title: "Reporting system",
      desc: "Flag inappropriate behavior — our team reviews reports promptly."
    },
    {
      icon: <Users className="w-5 h-5 text-[var(--color-primary)]" />,
      title: "Moderated interactions",
      desc: "Conversations and meetups are designed to keep pets and owners safe."
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-white border-t border-border/30">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text)] mb-4">
              Safe and Verified Community
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Trust is at the core of Kanya. We've built systems to make sure every interaction is safe and genuine.
            </p>
          </div>

          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-bg)] flex items-center justify-center border border-border/50">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text)] mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
