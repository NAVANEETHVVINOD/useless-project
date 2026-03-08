import { Container } from "@/components/layout/container"
import { Star } from "lucide-react"

const TESTIMONIAL_COLORS = ["bg-amber-100", "bg-emerald-100", "bg-sky-100"]

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah & Max",
      quote: "Max finally has a regular play buddy. Setting up playdates has never been easier — we found a match on day one!",
      rating: 5,
    },
    {
      name: "David & Luna",
      quote: "The verified profiles gave me peace of mind. Luna now has a group of friends we trust completely.",
      rating: 5,
    },
    {
      name: "Emily & Charlie",
      quote: "We discovered a local puppy meetup group through Kanya. Charlie looks forward to every weekend now.",
      rating: 5,
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-[var(--color-bg)]/50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]">
            Testimonials
          </h2>
        </div>

        {/* Mobile: horizontally scrollable, Desktop: grid */}
        <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide">
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-[280px] w-[85vw] md:w-auto snap-center bg-white rounded-[var(--radius-card)] p-8 border border-border/50 shadow-sm flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${TESTIMONIAL_COLORS[i]} rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center`}>
                  <span className="text-lg font-bold text-[var(--color-text)]/60">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text)]">{t.name}</h4>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-muted-foreground leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
