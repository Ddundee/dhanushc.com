'use client'
import React, { useContext, useEffect } from "react"
import { ScrambleText } from "@/components/scramble-text"
import PageLayout from "@/app/_components/page-layout"
import { Caveat } from "next/font/google"
import CMDAToolTip from "@/components/cmda-tooltip"
import Link from "next/link"
import BLOGS from "./blogs"
import BlogList from "../_components/blog-list"
import { motion } from "motion/react"
import MotionContext from "@/context/motion-context"

export default function Home() {
    const { motion: shouldAnimate, setMotion } = useContext(MotionContext)

    useEffect(() => {
        return () => {
        if (shouldAnimate) {
            setMotion(false)
        }
        }
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
                    <div className="space-y-2">
                        <h1 className="min-h-7 w-full text-5xl font-bold text-neutral-100">
                            blog
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            writing my thoughts and maybe useful tidbits
                        </p>
                    </div>
                    <BlogList />
                </motion.section>
            ) : (
                <section className="space-y-9">
                    <div className="space-y-2">
                        <h1 className="min-h-7 w-full text-5xl font-bold text-neutral-100">
                            blog
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            writing my thoughts and maybe useful tidbits
                        </p>
                    </div>
                    <BlogList />
                </section>
            )}
        </div>
    )
}