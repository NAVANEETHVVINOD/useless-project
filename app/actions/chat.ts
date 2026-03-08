"use server"

import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function sendMessage(matchId: string, content: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  if (!content.trim()) {
    return { error: "Message is empty" }
  }

  try {
    // 1. Verify user is part of the match
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      select: { user1Id: true, user2Id: true }
    })

    if (!match || (match.user1Id !== user.id && match.user2Id !== user.id)) {
      return { error: "Not authorized to send messages in this match" }
    }

    // 2. Create the message
    const message = await prisma.message.create({
      data: {
        matchId,
        senderId: user.id,
        content: content.trim(),
        type: "text"
      }
    })

    // Optionally revalidate if needed, though real-time should handle the UI
    revalidatePath(`/matches/${matchId}`)
    revalidatePath('/matches')

    return { success: true, message }
  } catch (error: any) {
    console.error("Failed to send message:", error)
    return { error: error?.message || "Something went wrong sending your message." }
  }
}
