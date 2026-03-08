import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Discover - Kanya",
    description: "Find the perfect playdate for your pet",
}

export default function DiscoverPage() {
    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Discover</h1>
            <div className="bg-muted rounded-xl p-12 text-center border-2 border-dashed border-border/50">
                <p className="text-muted-foreground">
                    The discovery and swipe features are currently under development. <br />
                    Check back soon to find playdates!
                </p>
            </div>
        </div>
    )
}
