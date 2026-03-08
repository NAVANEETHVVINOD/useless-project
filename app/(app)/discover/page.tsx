import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { SwipeEngine } from "@/components/discover/swipe-engine"

export default async function DiscoverPage() {
  const supabase = await createClient()

  // 1. Get current authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/login")
  }

  // 2. Fetch user's primary pet
  // For MVP, we assume the user has at least one pet. 
  // We'll use their first created pet as the "swiping" profile.
  const userPet = await prisma.pet.findFirst({
    where: { ownerId: user.id },
    orderBy: { createdAt: 'asc' }
  })

  // 3. If no pet exists, redirect to onboarding
  if (!userPet) {
    redirect("/onboarding")
  }

  // 4. Fetch potential matches (Pets)
  // Get pets NOT owned by the user AND NOT already swiped by the user's pet
  const swipedTargetIds = await prisma.swipe.findMany({
    where: { petId: userPet.id },
    select: { targetPetId: true }
  }).then((swipes: { targetPetId: string }[]) => swipes.map(s => s.targetPetId))

  const potentialPets = await prisma.pet.findMany({
    where: {
      ownerId: { not: user.id },
      id: { notIn: swipedTargetIds },
      isActive: true
    },
    take: 20, // Load 20 pets at a time
    orderBy: { popularityScore: 'desc' }
  })

  return (
    <div className="flex-1 flex flex-col pt-16 h-full overflow-hidden bg-muted/30">
      <div className="flex-1 max-w-md w-full mx-auto p-4 flex flex-col justify-center relative">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary-dark">Discover New Friends</h1>
        {potentialPets.length > 0 ? (
          <SwipeEngine initialPets={potentialPets} userPet={userPet} />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center h-96 bg-card rounded-xl shadow-sm border border-border/50">
            <div className="text-4xl mb-4">🐾</div>
            <h2 className="text-xl font-bold mb-2">No more pets around!</h2>
            <p className="text-muted-foreground text-sm">
              You've seen all the pets in your area. Come back later for more potential friends!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
