import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { MatchGrid } from "@/components/matches/match-grid"

export const dynamic = 'force-dynamic'

export default async function MatchesPage() {
  const supabase = await createClient()

  // 1. Get current authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/login")
  }

  // 2. Fetch matches where the user is either user1 or user2
  const matches = await prisma.match.findMany({
    where: {
      OR: [
        { user1Id: user.id },
        { user2Id: user.id }
      ],
      isActive: true,
      unmatched: false
    },
    include: {
      pet1: true,
      pet2: true,
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    },
    orderBy: { matchedAt: 'desc' }
  })

  // Format matches to easily identify the "other" pet for rendering
  const formattedMatches = matches.map(match => {
    const isUser1 = match.user1Id === user.id
    const myPet = isUser1 ? match.pet1 : match.pet2
    const otherPet = isUser1 ? match.pet2 : match.pet1
    
    return {
      matchId: match.id,
      matchedAt: match.matchedAt,
      myPet,
      otherPet,
      lastMessage: match.messages[0] || null
    }
  })

  return (
    <div className="flex-1 flex flex-col pt-16 h-full bg-background overflow-y-auto">
      <div className="max-w-screen-md w-full mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-2 text-primary-dark">Matches</h1>
        <p className="text-muted-foreground mb-8">
          Here are the pets who liked {formattedMatches.length > 0 ? formattedMatches[0].myPet.name : 'you'} back!
        </p>
        
        {formattedMatches.length > 0 ? (
          <MatchGrid matches={formattedMatches} />
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border rounded-xl bg-muted/20">
            <div className="text-5xl mb-4 opacity-50">💔</div>
            <h2 className="text-xl font-bold mb-2">No matches yet</h2>
            <p className="text-muted-foreground">
              Keep swiping on the Discover page to find new friends for your pet!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
