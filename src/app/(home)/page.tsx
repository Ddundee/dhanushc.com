'use client'
import BlogList from "../_components/blog-list"
import HackathonList from "../_components/hackathon-list"
import Link from "next/link"
import Reveal from "@/components/reveal"

export default function Home() {
    const ageYear =
        new Date(
            Date.now() - new Date("April 8, 2006 00:00:00 EST").getTime()
        ).getUTCFullYear() - 1970

    return (
        <div className="space-y-16">
            <Reveal as="section" index={0} className="space-y-9">
                <div className="space-y-2">
                    <h1 className="text-4xl leading-tight tracking-[-0.025em] text-neutral-100 sm:text-5xl">
                        dhanush chilakala
                    </h1>
                    <p className="text-neutral-500">based in northlake, tx</p>
                </div>
                <p className="max-w-[60ch] text-lg leading-relaxed text-neutral-300">
                    i&apos;m a {ageYear} y/o undergrad student at virginia tech majoring in cs + cmda (just a complicated name for data analytics). currently, i am helping organize vthacks as a software developer.
                </p>
            </Reveal>
            <Reveal as="section" index={1} className="space-y-6 border-t border-neutral-800 pt-6">
                <h2 className="font-mono text-sm text-neutral-500">
                    hackathons
                </h2>
                <HackathonList condensed />
                <div className="flex justify-end">
                    <Link href="/hackathons" className="font-mono text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-200">see more &rarr;</Link>
                </div>
            </Reveal>
            {/* <div className="space-y-3">
                <h2 className="font-mono text-sm text-neutral-500">
                    projects
                </h2>
                <ProjectList />
            </div> */}
            <Reveal as="section" index={2} className="space-y-6 border-t border-neutral-800 pt-6">
                <h2 className="font-mono text-sm text-neutral-500">
                    blog
                </h2>
                <BlogList />
            </Reveal>
        </div>
    )
}
