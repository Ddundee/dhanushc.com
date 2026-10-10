import type { Metadata } from "next"
import Music from "../../_components/music"

export const metadata: Metadata = {
    title: "music",
    description: "what dhanush is listening to right now.",
}

export default function MusicPage() {
    return (
        <div className="space-y-9">
            <div className="space-y-2">
                <h1 className="min-h-7 w-full text-5xl font-bold text-neutral-100">music</h1>
                <p className="text-lg text-neutral-400">what&apos;s in my ears</p>
            </div>
            <Music />
        </div>
    )
}
