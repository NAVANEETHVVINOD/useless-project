"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AuthSchema, LoginSchema } from "@/lib/validations/auth";
import { z } from "zod";

export async function login(data: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/discover");
}

export async function signup(data: z.infer<typeof AuthSchema>) {
  const validatedFields = AuthSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, firstName } = validatedFields.data;

  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`,
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
          firstName: firstName || null,
        }
      });
    } catch (e) {
      console.error("Prisma sync error", e);
      // Optional: Handle unique constraint error if user already exists in DB
    }
  }

  redirect(`/auth/verify?email=${email}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
