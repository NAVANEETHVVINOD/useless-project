import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { SettingsForm } from "@/components/profile/settings-form"

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const supabase = await createClient()

  // 1. Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/login")
  }

  // 2. Fetch User and Pet from DB
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      pets: {
        orderBy: { createdAt: 'asc' },
        take: 1
      }
    }
  })

  if (!dbUser) {
    redirect("/login")
  }

  const primaryPet = dbUser.pets[0]

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-muted/20 pt-16">
      <div className="max-w-2xl w-full mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-primary-dark">Settings</h1>
          <p className="text-muted-foreground">Manage your account and pet preferences.</p>
        </div>

        <SettingsForm user={dbUser} pet={primaryPet || null} />
        
      </div>
    </div>
  )
}
