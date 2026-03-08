import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ChatInterface } from "@/components/matches/chat-interface"

export const dynamic = 'force-dynamic'

interface ChatPageProps {
  params: {
    matchId: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { matchId } = params
  const supabase = await createClient()

  // 1. Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/login")
  }

  // 2. Fetch the match and ensure user belongs to it
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      pet1: true,
      pet2: true,
      messages: {
        orderBy: { createdAt: 'asc' } // Oldest to newest for chat
      }
    }
  })

  if (!match || (match.user1Id !== user.id && match.user2Id !== user.id)) {
    redirect("/matches")
  }

  // 3. Determine "my pet" vs "their pet" for the UI
  const isUser1 = match.user1Id === user.id
  const myPet = isUser1 ? match.pet1 : match.pet2
  const otherPet = isUser1 ? match.pet2 : match.pet1

  // Note: We're rendering a Client Component here which will handle
  // Supabase Realtime for instant message delivery
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background pt-16">
      <ChatInterface 
        matchId={matchId} 
        currentUserId={user.id} 
        otherPet={otherPet} 
        initialMessages={match.messages} 
      />
    </div>
  )
}
