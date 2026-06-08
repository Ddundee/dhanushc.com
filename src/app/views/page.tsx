import type { Metadata } from "next"
import PageLayout from "../_components/page-layout"

const GET_URL = "https://abacus.jasoncameron.dev/get/dhanushc.com/portfolio"

export const metadata: Metadata = {
    title: "views",
}

async function getViewCount(): Promise<number | null> {
    try {
        const res = await fetch(GET_URL, { cache: "no-store" })
        if (!res.ok) return null
        const data = (await res.json()) as { value: number }
        return data.value
    } catch {
        return null
    }
}

export default async function ViewsPage() {
    const views = await getViewCount()

    return (
            <div className="w-screen h-screen flex flex-col items-center justify-center">
                <h1 className="mb-1 min-h-7 text-xl font-bold text-neutral-100">
                    views
                </h1>
                <p className="text-neutral-400">
                    {views !== null
                        ? `${views.toLocaleString()} views`
                        : "unable to load view count"}
                </p>
            </div>
    )
}
