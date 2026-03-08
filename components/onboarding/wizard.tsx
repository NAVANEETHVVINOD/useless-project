"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PetProfileSchema, PetProfileFormData, SPECIES, SIZES, GENDERS } from "@/lib/validations/pet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { createPetProfile } from "@/app/actions/pet"
import { ImageUploader } from "@/components/onboarding/image-uploader"

export function PetOnboardingWizard() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const form = useForm<PetProfileFormData>({
    // We optionally bypass deep zod validation on incomplete steps by validating just the current fields before next()
    resolver: zodResolver(PetProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      species: undefined,
      breed: "",
      gender: undefined,
      size: undefined,
      photos: [],
      personality: [],
      bio: "",
      preferences: {
        maxDistance: 25,
        speciesFilter: [],
        ageRange: { min: 0, max: 20 }
      }
    } as any
  })

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(["name", "species", "breed", "gender", "size"]);
    } else if (step === 2) {
      // skipping photo validation for mockup purposes until connected to Supabase
      isValid = true; 
    } else if (step === 3) {
      isValid = await form.trigger(["bio", "personality"]);
    }

    if (isValid) {
      setStep((s) => Math.min(s + 1, 4))
    }
  }

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1))
  }

  async function onSubmit(data: PetProfileFormData) {
    if (step !== 4) return;
    setIsSubmitting(true)
    setErrorMsg(null)

    // Make sure date is provided or stubbed for MVP
    if (!data.birthday) {
        data.birthday = new Date("2020-01-01"); // Mock birthday for now
    }

    try {
      const res = await createPetProfile(data)
      if (res && res.error) {
        setErrorMsg(res.error)
      }
    } catch (e) {
      setErrorMsg("Failed to create profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-none shadow-none md:border md:shadow-sm">
      <CardContent className="pt-6">
        <div className="mb-8 flex gap-2">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? "bg-primary" : "bg-muted"}`} />
            ))}
        </div>

        {errorMsg && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-6 relative">
                {errorMsg}
            </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* STEP 1: Basic Info */}
            <div className={step === 1 ? "block" : "hidden"}>
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pet Name</FormLabel>
                            <FormControl><Input placeholder="Bella" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="species" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Species</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select species" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {SPECIES.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="breed" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Breed</FormLabel>
                            <FormControl><Input placeholder="Golden Retriever" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {GENDERS.map(g => <SelectItem key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="size" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {SIZES.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
            </div>

            {/* STEP 2: Photos */}
            <div className={step === 2 ? "block" : "hidden"}>
                <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>
                <FormField control={form.control} name="photos" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <ImageUploader 
                                value={field.value as string[]} 
                                onChange={field.onChange} 
                                maxPhotos={6} 
                            />
                        </FormControl>
                        <FormDescription>
                            Your pet's main profile picture will be the first photo you upload.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            {/* STEP 3: Bio */}
            <div className={step === 3 ? "block" : "hidden"}>
                <h2 className="text-xl font-semibold mb-4">Personality & Bio</h2>
                <FormField control={form.control} name="bio" render={({ field }) => (
                    <FormItem>
                        <FormLabel>About your pet</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Tell others what makes your pet special..." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormDescription>Minimum 50 characters</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            {/* STEP 4: Preferences */}
            <div className={step === 4 ? "block" : "hidden"}>
                <h2 className="text-xl font-semibold mb-4">Discovery Preferences</h2>
                <p className="text-muted-foreground">Who are you looking to match with?</p>
                {/* Distance slider, age slider, etc will go here. Stub for now. */}
                <div className="p-6 bg-muted rounded-md mt-6 text-center text-sm">
                    Preferences UI will be implemented here. For now, we'll use defaults.
                </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
                <Button variant="ghost" type="button" onClick={prevStep} disabled={step === 1 || isSubmitting}>
                    Back
                </Button>
                
                {step < 4 ? (
                     <Button type="button" onClick={nextStep}>Next Step</Button>
                ) : (
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Complete Profile
                    </Button>
                )}
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
