"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { motion } from 'motion/react'
import { EASE } from "@/components/reveal"

const pages = [
    {
        title: "[h]ome",
        url: "/"
    },
    {
        title: "h[a]ckathons",
        url: "/hackathons"
    },
    {
        title: "[b]log",
        url: "/blog"
    },
    {
        title: "[m]usic",
        url: "/music"
    }
]

export default function Navbar() {
    const pathname = usePathname() || "/"
    const router = useRouter()


    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (
                document.activeElement?.tagName === "INPUT" ||
                document.activeElement?.tagName === "TEXTAREA" ||
                event.target instanceof HTMLInputElement ||
                event.metaKey ||
                event.ctrlKey ||
                event.altKey ||
                event.shiftKey
            ) {
                return
            }

            for (const page of pages) {
                const index = page.title.indexOf("[")
                if (event.key.toLowerCase() === page.title.charAt(index + 1)) {
                    router.push(page.url)
                }
            }
        }

        window.addEventListener("keydown", handleKeyPress)
        return () => window.removeEventListener("keydown", handleKeyPress)
    }, [router])

    return (
        <motion.nav
            initial={{ opacity: 0, y: -6, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="w-full max-w-screen-md gap-3 flex">
            {pages.map(page => {
                if (pathname == page.url) return <p key={page.url} className="text-neutral-200">{page.title}</p>
                else return <Link key={page.url} href={page.url} className="text-neutral-400 hover:text-neutral-200 transition-colors duration-200">{page.title}</Link>
            })}
        </motion.nav>
    )
}
