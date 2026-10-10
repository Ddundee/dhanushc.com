"use client"

import { useContext, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import MotionContext from "@/context/motion-context"

// ease-out-quint: fast start, long soft landing
export const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
    children: ReactNode
    className?: string
    // position in the page, used to stagger siblings
    index?: number
    as?: "div" | "section"
}

export default function Reveal({ children, className, index = 0, as = "div" }: Props) {
    const { firstLoad } = useContext(MotionContext)
    const reduce = useReducedMotion()
    const Tag = as === "section" ? motion.section : motion.div

    // landing gets the full staggered entrance; later navigations just settle in quickly
    const hidden = reduce
        ? { opacity: 0 }
        : firstLoad
          ? { opacity: 0, y: 12, filter: "blur(6px)" }
          : { opacity: 0, y: 4 }

    return (
        <Tag
            initial={hidden}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
                duration: firstLoad ? 0.7 : 0.3,
                ease: EASE,
                delay: firstLoad ? 0.1 + index * 0.08 : index * 0.04,
            }}
            className={className}
        >
            {children}
        </Tag>
    )
}
