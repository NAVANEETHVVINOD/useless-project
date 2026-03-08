"use server"

import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function recordSwipe(userPetId: string, targetPetId: string, direction: "left" | "right" | "super") {
  const supabase = await createClient()

  // 1. Verify Authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error("Unauthorized")
  }

  // 2. Verify the swiping pet belongs to the user
  const userPet = await prisma.pet.findUnique({
    where: { id: userPetId }
  })

  if (!userPet || userPet.ownerId !== user.id) {
    throw new Error("Unauthorized: Pet does not belong to user")
  }

  // 3. Record the swipe
  try {
    const swipe = await prisma.swipe.upsert({
      where: {
        petId_targetPetId: {
          petId: userPetId,
          targetPetId: targetPetId
        }
      },
      update: { direction },
      create: {
        userId: user.id,
        petId: userPetId,
        targetPetId: targetPetId,
        direction
      }
    })

    // Increment swipe count stats on the target pet
    await prisma.pet.update({
      where: { id: targetPetId },
      data: { swipeCount: { increment: 1 } }
    })

    // 4. Check for a match (if swiped right or super)
    let isMatch = false;
    if (direction === "right" || direction === "super") {
      // Look for a reciprocal swipe where the target pet swiped right/super on the user's pet
      const reciprocalSwipe = await prisma.swipe.findFirst({
        where: {
          petId: targetPetId,
          targetPetId: userPetId,
          direction: { in: ["right", "super"] }
        },
        include: { user: true } // Need the other user's ID
      })

      if (reciprocalSwipe) {
        // We have a match!
        isMatch = true;
        
        // Ensure both pets and users are sorted properly to maintain the unique constraint
        // (For pet1Id, pet2Id ordering convention)
        const pet1Id = userPetId < targetPetId ? userPetId : targetPetId
        const pet2Id = userPetId < targetPetId ? targetPetId : userPetId
        
        const user1Id = userPetId < targetPetId ? user.id : reciprocalSwipe.userId
        const user2Id = userPetId < targetPetId ? reciprocalSwipe.userId : user.id

        await prisma.match.upsert({
          where: {
            pet1Id_pet2Id: {
              pet1Id,
              pet2Id
            }
          },
          update: { isActive: true, unmatched: false },
          create: {
            pet1Id,
            pet2Id,
            user1Id,
            user2Id,
            isSuperLike: direction === "super" || reciprocalSwipe.direction === "super"
          }
        })

        // Also increment match counts on both pets
        await prisma.pet.updateMany({
          where: { id: { in: [userPetId, targetPetId] } },
          data: { matchCount: { increment: 1 } }
        })
      }
    }

    revalidatePath("/discover")
    return { success: true, isMatch }

  } catch (error) {
    console.error("Failed to record swipe:", error)
    return { success: false, error: "Failed to process swipe" }
  }
}
