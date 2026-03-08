import { Metadata } from "next"
import { PetOnboardingWizard } from "@/components/onboarding/wizard"

export const metadata: Metadata = {
    title: "Create Pet Profile - Kanya",
    description: "Tell us about your pet to start finding playdates",
}

export default function OnboardingPage() {
    return (
        <div className="container max-w-3xl mx-auto py-10 px-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Create Pet Profile</h1>
                <p className="text-muted-foreground mt-2">
                    Let&apos;s build a stunning profile for your pet so they can find their perfect match.
                </p>
            </div>
            <PetOnboardingWizard />
        </div>
    )
}
