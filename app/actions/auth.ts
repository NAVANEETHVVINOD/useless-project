"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function login(data: any) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/discover");
}

export async function signup(data: any) {
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
      }
    }
  });

  if (error) {
    return { error: error.message };
  }

  if (authData.user) {
    try {
      // Sync the Supabase user to the Prisma database
      await prisma.user.create({
        data: {
          id: authData.user.id,
          email: authData.user.email!,
          firstName: data.firstName || null,
        }
      });
    } catch (e) {
      console.error("Prisma sync error", e);
      // Optional: Handle unique constraint error if user already exists in DB
    }
  }

  redirect("/discover");
}
