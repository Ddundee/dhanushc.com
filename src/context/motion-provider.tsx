"use client"

import { useRef, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { MotionConfig } from "motion/react"
import MotionContext from "./motion-context"

type Props = {
    children: ReactNode
}

export default function MotionProvider({ children }: Props) {
    const pathname = usePathname()
    const landing = useRef(pathname)
    const [navigated, setNavigated] = useState(false)

    // flip during render (not in an effect) so the incoming page mounts with the right animation
    if (!navigated && pathname !== landing.current) setNavigated(true)

    return (
        <MotionContext.Provider value={{ firstLoad: !navigated }}>
            {/* drops transform animations site-wide for people who ask for less motion */}
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </MotionContext.Provider>
    )
}
