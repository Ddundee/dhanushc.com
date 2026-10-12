import type { Metadata } from "next"
import Music from "../../_components/music"
import Reveal from "@/components/reveal"

export const metadata: Metadata = {
    title: "music",
    description: "what dhanush is listening to right now.",
}

export default function MusicPage() {
    return (
        <div className="space-y-9">
            <Reveal index={0} className="space-y-2">
                <h1 className="text-4xl leading-tight tracking-[-0.025em] text-neutral-100 sm:text-5xl">music</h1>
                <p className="text-neutral-500">what&apos;s in my ears</p>
            </Reveal>
            <Music />
        </div>
    )
}
