"use client"
import { cn } from "@/lib/utils";
import { motion } from 'motion/react'
import { EASE } from "@/components/reveal"
import Views from "./views";

export default function Footer({
    className,
    countOnVisit = true,
}: {
    className: string
    countOnVisit?: boolean
}) {

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className={cn("mt-9 flex w-full max-w-screen-md flex-row justify-between gap-4 font-mono text-sm", className)}>
            <div>
                <a
                    className="select-none rounded-sm py-1 pr-4 text-neutral-500 no-underline transition-colors duration-200 hover:text-orange-600"
                    target="_blank"
                    href="mailto:dhanush@dhanushc.com"
                    rel="noreferrer"
                >
                    email
                </a>
                <a
                    className="select-none rounded-sm py-1 pr-4 text-neutral-500 no-underline transition-colors duration-200 hover:text-orange-600"
                    target="_blank"
                    href="https://www.github.com/ddundee"
                    rel="noreferrer"
                >
                    github
                </a>
                <a
                    className="select-none rounded-sm py-1 pr-4 text-neutral-500 no-underline transition-colors duration-200 hover:text-orange-600"
                    target="_blank"
                    href="https://www.linkedin.com/in/dhanush-chilakala/"
                    rel="noreferrer"
                >
                    linkedin
                </a>
            </div>
            <Views countOnVisit={countOnVisit} />
        </motion.footer>
    )
}
