'use client'
import React, { useContext, useEffect } from "react"
import { ScrambleText } from "@/components/scramble-text"
import BlogList from "./_components/blog-list"
import HackathonList from "./_components/hackathon-list"
import { motion } from "motion/react"
import Link from "next/link"
import MotionContext from "@/context/motion-context"

export default function Home() {
    const ageYear =
        new Date(
            Date.now() - new Date("April 8, 2006 00:00:00 EST").getTime()
        ).getUTCFullYear() - 1970

    const { motion: shouldAnimate, setMotion } = useContext(MotionContext)

    useEffect(() => {
        return () => {if (shouldAnimate) {
            setMotion(false)
        }}
    }, [shouldAnimate, setMotion])

    return (

        <div className="space-y-12">
            {shouldAnimate ? (
                <motion.section
                    initial={{ opacity: 0, filter: "blur(12px)", scale: 0.97 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="space-y-9">
                    <div
                        className="space-y-2">
                        <h1 className="min-h-12 w-full text-5xl font-bold text-neutral-100">
                            dhanush chilakala
                        </h1>
                        <p className="text-neutral-400 text-lg">based in dallas, tx</p>
                    </div>
                    <p className="text-neutral-300 text-lg">
                        i&apos;m a {ageYear} y/o undergrad student at virginia tech majoring in cs + cmda (just a complicated name for data analytics). currently, i am a developer at vt hacks. i love building things and solving problems. if i'm not coding, i'm probably watching movies.
                    </p>
                </motion.section>
            ) : (
                <section className="space-y-9">
                    <div className="space-y-2">
                        <h1 className="min-h-12 w-full text-5xl font-bold text-neutral-100">
                            dhanush chilakala
                        </h1>
                        <p className="text-neutral-400 text-lg">based in dallas, tx</p>
                    </div>
                    <p className="text-neutral-300 text-lg">
                        i&apos;m a {ageYear} y/o undergrad student at virginia tech majoring in cs + cmda (just a complicated name for data analytics). currently, i am a developer at vt hacks. i love building things and solving problems. if i'm not coding, i'm probably watching movies.
                    </p>
                </section>
            )}
            {shouldAnimate ? (
                <motion.section
                    initial={{ opacity: 0, filter: "blur(12px)", scale: 0.97 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="space-y-3">
                    <h2 className="min-h-7 w-full text-2xl font-semibold text-neutral-100">
                        hackathons
                    </h2>
                    <HackathonList condensed />
                    <div className="flex justify-end">
                        <Link href="/hackathons" className="text-neutral-400 hover:text-neutral-200 duration-200">see more &rarr;</Link>
                    </div>
                </motion.section>
            ) : (
                <section className="space-y-3">
                    <h2 className="min-h-7 w-full text-2xl font-semibold text-neutral-100">
                        hackathons
                    </h2>
                    <HackathonList condensed />
                    <div className="flex justify-end">
                        <Link href="/hackathons" className="text-neutral-400 hover:text-neutral-200 duration-200">see more &rarr;</Link>
                    </div>
                </section>
            )}
            {/* <div className="space-y-3">
                <h2 className="min-h-7 w-full text-2xl font-semibold text-neutral-100">
                    projects
                </h2>
                <ProjectList />
            </div> */}
            {shouldAnimate ? (
                <motion.section
                    initial={{ opacity: 0, filter: "blur(12px)", scale: 0.97 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="space-y-3">
                    <h2 className="min-h-7 w-full text-2xl font-semibold text-neutral-100">
                        blog
                    </h2>
                    <BlogList />
                </motion.section>
            ) : (
                <section className="space-y-3">
                    <h2 className="min-h-7 w-full text-2xl font-semibold text-neutral-100">
                        blog
                    </h2>
                    <BlogList />
                </section>
            )}
        </div>
    )
}