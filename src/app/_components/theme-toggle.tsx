"use client"

import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"

type Theme = "light" | "dark"

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // the theme is only known on the client, so hold the slot until then
    useEffect(() => setMounted(true), [])

    const switchTo = useCallback(
        (next: Theme) => {
            if (next === resolvedTheme) return
            const root = document.documentElement
            const apply = () => {
                root.classList.add("theme-switching")
                root.classList.remove("light", "dark")
                root.classList.add(next)
                root.style.colorScheme = next
                setTheme(next)
            }

            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            if (!document.startViewTransition || reduce) {
                apply()
                requestAnimationFrame(() => root.classList.remove("theme-switching"))
                return
            }
            // crossfade old and new snapshots so the whole page changes as one
            document.startViewTransition(apply).finished.finally(() => root.classList.remove("theme-switching"))
        },
        [resolvedTheme, setTheme]
    )

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (
                document.activeElement?.tagName === "INPUT" ||
                document.activeElement?.tagName === "TEXTAREA" ||
                event.metaKey ||
                event.ctrlKey ||
                event.altKey ||
                event.shiftKey
            ) {
                return
            }
            if (event.key.toLowerCase() === "l") switchTo("light")
            if (event.key.toLowerCase() === "d") switchTo("dark")
        }

        window.addEventListener("keydown", handleKeyPress)
        return () => window.removeEventListener("keydown", handleKeyPress)
    }, [switchTo])

    if (!mounted) return <span className="invisible ml-auto" aria-hidden>[l]ight</span>

    const next: Theme = resolvedTheme === "light" ? "dark" : "light"

    return (
        <button
            type="button"
            onClick={() => switchTo(next)}
            aria-label={`switch to ${next} mode`}
            className="ml-auto cursor-pointer text-neutral-500 transition-colors duration-200 hover:text-neutral-200"
        >
            [{next[0]}]{next.slice(1)}
        </button>
    )
}
