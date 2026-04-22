"use client"
import { cn } from "@/lib/utils";
import RESUME_LINK from "@/util/resumeLink";
import { useEffect, useState } from "react";
import { motion } from 'motion/react'
import Views from "./views";

export default function Footer({ className }: { className: string }) {

    return (
        <motion.footer
            initial={{ opacity: 0, filter: "blur(12px)", scale: 0.97 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className={cn("mt-9 flex w-full max-w-screen-md flex-row gap-4 justify-between", className)}>
            <div>
                <a
                    className="select-none rounded-sm px-2 py-1 text-neutral-400 no-underline duration-100 hover:bg-orange-300/5 hover:text-orange-600"
                    target="_blank"
                    href="mailto:dhanush@dhanushc.com"
                    rel="noreferrer"
                >
                    email
                </a>
                <a
                    className="select-none rounded-sm px-2 py-1 text-neutral-400 no-underline duration-100 hover:bg-orange-300/5 hover:text-orange-600"
                    target="_blank"
                    href="https://www.github.com/ddundee"
                    rel="noreferrer"
                >
                    github
                </a>
                <a
                    className="select-none rounded-sm px-2 py-1 text-neutral-400 no-underline duration-100 hover:bg-orange-300/5 hover:text-orange-600"
                    target="_blank"
                    href="https://www.linkedin.com/in/dhanush-chilakala/"
                    rel="noreferrer"
                >
                    linkedin
                </a>
                <a
                    className="select-none rounded-sm px-2 py-1 text-neutral-400 no-underline duration-100 hover:bg-orange-300/5 hover:text-orange-600"
                    target="_blank"
                    href={RESUME_LINK}
                    rel="noreferrer"
                >
                    resume
                </a>
            </div>
            <Views />
        </motion.footer>
    )
}
