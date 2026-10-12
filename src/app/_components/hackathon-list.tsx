import React from "react"
import HACKATHONS from "../../data/hackathons"

export default function HackathonList({condensed}: {condensed?: boolean}) {

    const upcoming = HACKATHONS.filter((h) => h.upcoming)
    const awardedRest = HACKATHONS.filter((h) => h.award && !h.upcoming)
    const hackathonList = condensed
        ? [...awardedRest].slice(0, 3)
        : HACKATHONS
    return (
        // index layout: date in its own mono column, entry on the right. stacks on mobile
        <div className="space-y-6">
            {hackathonList.map((hackathon) => (
                <div key={hackathon.name} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <span className="font-mono text-sm leading-7 text-neutral-500">
                        {hackathon.date}
                    </span>
                    <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            {hackathon.link ? (
                                <a
                                    href={hackathon.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-lg text-neutral-100 transition-colors duration-200 hover:text-orange-600"
                                >
                                    {hackathon.name}
                                </a>
                            ) : (
                                <p className="text-lg text-neutral-100">
                                    {hackathon.name}
                                </p>
                            )}
                            {hackathon.upcoming && (
                                <span className="font-mono text-xs text-neutral-500">
                                    soon
                                </span>
                            )}
                            {hackathon.award && (
                                <span className="font-mono text-xs text-orange-600">
                                    {hackathon.award}
                                </span>
                            )}
                        </div>
                        {!hackathon.upcoming && <p className="max-w-[60ch] text-sm leading-relaxed text-neutral-500">
                            <span className="text-neutral-300">{hackathon.project}</span> / {hackathon.description}
                        </p>}
                    </div>
                </div>
            ))}
        </div>
    )
}
