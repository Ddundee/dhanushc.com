'use client'
import HackathonList from "../../_components/hackathon-list"
import Reveal from "@/components/reveal"

export default function Hackathons() {
    return (
        <div className="space-y-9">
            <Reveal index={0} className="space-y-2">
                <h1 className="min-h-7 w-full text-5xl font-bold text-neutral-100">
                    hackathons
                </h1>
                <p className="text-neutral-400 text-lg">competitions i&apos;ve participated in</p>
            </Reveal>
            <Reveal index={1}>
                <HackathonList />
            </Reveal>
        </div>
    )
}
