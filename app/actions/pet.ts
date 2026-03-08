"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { PetProfileSchema } from "@/lib/validations/pet";
import { redirect } from "next/navigation";

export async function createPetProfile(formData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "You must be logged in to create a pet profile." };
  }

  try {
    // Parse the incoming data against our Zod schema
    // Coerce dates if they come as strings
    if (typeof formData.birthday === 'string') {
      formData.birthday = new Date(formData.birthday);
    }
    
    const parsed = PetProfileSchema.parse(formData);

    await prisma.pet.create({
      data: {
        ownerId: user.id,
        name: parsed.name,
        species: parsed.species,
        breed: parsed.breed,
        birthday: parsed.birthday,
        gender: parsed.gender,
        size: parsed.size,
        bio: parsed.bio,
        photos: parsed.photos as any,          // Prisma JSON mapping
        personality: parsed.personality as any, // Prisma JSON mapping
        isActive: true,
      }
    });

    // Also update User preferences if they evolved during onboarding
    await prisma.user.update({
      where: { id: user.id },
      data: {
        preferences: parsed.preferences as any
      }
    });

  } catch (error: any) {
    console.error("Failed to create pet profile:", error);
    return { error: error?.message || "Something went wrong saving your profile." };
  }
  return { success: true };
}
