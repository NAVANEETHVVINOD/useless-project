import { Pet, Message } from "@prisma/client"
import { MatchCard } from "./match-card"

interface FormattedMatch {
  matchId: string
  matchedAt: Date
  myPet: Pet
  otherPet: Pet
  lastMessage: Message | null
}

interface MatchGridProps {
  matches: FormattedMatch[]
}

export function MatchGrid({ matches }: MatchGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {matches.map((match) => (
        <MatchCard key={match.matchId} match={match} />
      ))}
    </div>
  )
}
