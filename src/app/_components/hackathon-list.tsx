import React from "react"
import HACKATHONS from "../../data/hackathons"

export default function HackathonList({condensed}: {condensed?: boolean}) {

    const upcoming = HACKATHONS.filter((h) => h.upcoming)
    const awardedRest = HACKATHONS.filter((h) => h.award && !h.upcoming)
    const hackathonList = condensed
        ? [...awardedRest].slice(0, 3)
        : HACKATHONS
    return (
        <div className="space-y-4">
            {hackathonList.map((hackathon) => (
                <div key={hackathon.name} className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2 min-w-0">
                            {hackathon.link ? (
                                <a
                                    href={hackathon.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-lg font-medium text-neutral-200/70 hover:text-orange-600 duration-200 truncate"
                                >
                                    {hackathon.name}
                                </a>
                            ) : (
                                <p className="text-lg font-medium text-neutral-200/70 truncate">
                                    {hackathon.name}
                                </p>
                            )}
                            {hackathon.upcoming && (
                                <span className="text-sm text-neutral-500 whitespace-nowrap">
                                    soon
                                </span>
                            )}
                            {hackathon.award && (
                                <span className="text-sm text-orange-600/80 whitespace-nowrap">
                                    {hackathon.award}
                                </span>
                            )}
                        </div>
                        <span className="text-md text-neutral-600 whitespace-nowrap">
                            {hackathon.date}
                        </span>
                    </div>
                    {!hackathon.upcoming && <p className="text-neutral-500 text-sm">
                        {hackathon.project} — {hackathon.description}
                    </p>}
                </div>
            ))}
        </div>
    )
}
