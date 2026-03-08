"use client"

import { User, Pet } from "@prisma/client"
import { logout } from "@/app/actions/auth"
import { LogOut, Save, ShieldAlert, Trash2 } from "lucide-react"

interface SettingsFormProps {
  user: User
  pet: Pet | null
}

export function SettingsForm({ user, pet }: SettingsFormProps) {
  
  return (
    <div className="space-y-8">
      {/* Pet Settings */}
      {pet && (
        <section className="bg-card rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Pet Profile: {pet.name}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea 
                className="w-full min-h-[100px] rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={pet.bio || ""}
                placeholder={`Tell us about ${pet.name}...`}
              />
            </div>
            
            <button className="flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors">
              <Save size={18} />
              Save Profile Changes
            </button>
          </div>
        </section>
      )}

      {/* Account Settings */}
      <section className="bg-card rounded-2xl border p-6 shadow-sm space-y-6">
        <h2 className="text-xl font-bold mb-2">Account Details</h2>
        
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Email Address</span>
          <span className="font-medium">{user.email}</span>
        </div>

        <div className="pt-4 border-t flex flex-col gap-3">
          <button 
            onClick={() => logout()}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors"
          >
            <LogOut size={20} />
            Log Out
          </button>

          <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-destructive/10 text-destructive font-bold hover:bg-destructive/20 transition-colors mt-8">
            <Trash2 size={20} />
            Delete Account permanently
          </button>
        </div>
      </section>
    </div>
  )
}
