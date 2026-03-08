import { Container } from "@/components/layout/container"

const AVATAR_COLORS = [
  "bg-amber-200", "bg-emerald-200", "bg-sky-200", "bg-rose-200",
  "bg-violet-200", "bg-orange-200", "bg-teal-200", "bg-pink-200"
]

const POSITIONS = [
  { top: "18%", left: "12%" },
  { top: "42%", left: "22%" },
  { top: "68%", left: "18%" },
  { top: "28%", left: "48%" },
  { top: "58%", left: "55%" },
  { top: "22%", left: "72%" },
  { top: "52%", left: "78%" },
  { top: "75%", left: "65%" },
]

function PawIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="8" cy="6" rx="2" ry="2.5" />
      <ellipse cx="16" cy="6" rx="2" ry="2.5" />
      <ellipse cx="4.5" cy="11.5" rx="1.8" ry="2.2" />
      <ellipse cx="19.5" cy="11.5" rx="1.8" ry="2.2" />
      <path d="M12 21c-3.5 0-6-2.5-6-5.5S8.5 10 12 10s6 2 6 5.5S15.5 21 12 21z" />
    </svg>
  )
}

export function CommunityStats() {
  return (
    <section className="py-20 md:py-32 bg-[var(--color-bg)] overflow-hidden">
      <Container>
        <div className="relative w-full max-w-5xl mx-auto h-[280px] sm:h-[380px] md:h-[460px] rounded-3xl bg-emerald-50/60 border border-border/50 overflow-hidden">

          {/* Map grid pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.08) 1px, transparent 0)",
              backgroundSize: "28px 28px"
            }}
          />

          {/* Decorative route paths */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M 80 180 Q 280 40, 480 220 T 880 120" fill="none" stroke="rgba(143,191,95,0.25)" strokeWidth="3" strokeDasharray="8 6" />
            <path d="M 160 350 Q 380 280, 560 400 T 780 220" fill="none" stroke="rgba(122,82,48,0.15)" strokeWidth="3" strokeDasharray="8 6" />
          </svg>

          {/* Floating pet avatars with white border + shadow */}
          {POSITIONS.map((pos, i) => (
            <div
              key={i}
              className={`absolute w-11 h-11 md:w-14 md:h-14 rounded-full border-[3px] border-white shadow-md ${AVATAR_COLORS[i]} flex items-center justify-center`}
              style={{ top: pos.top, left: pos.left }}
            >
              <PawIcon className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
            </div>
          ))}

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-border/50">
            <span className="text-sm font-semibold text-[var(--color-text)]">🌍 120+ cities worldwide</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
