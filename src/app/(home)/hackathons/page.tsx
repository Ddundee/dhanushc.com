'use client'
import HackathonList from "../../_components/hackathon-list"
import Reveal from "@/components/reveal"

export default function Hackathons() {
    return (
        <div className="space-y-9">
            <Reveal index={0} className="space-y-2">
                <h1 className="text-4xl leading-tight tracking-[-0.025em] text-neutral-100 sm:text-5xl">
                    hackathons
                </h1>
                <p className="text-neutral-500">competitions i&apos;ve participated in</p>
            </Reveal>
            <Reveal index={1}>
                <HackathonList />
            </Reveal>
        </div>
    )
}
