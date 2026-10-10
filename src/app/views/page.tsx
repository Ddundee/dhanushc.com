"use client"
import SlotCounter from 'react-slot-counter';
import { useEffect, useState } from "react"
import { motion } from 'motion/react';
import { EASE } from '@/components/reveal';

const STREAM_URL = "https://abacus.jasoncameron.dev/stream/dhanushc.com/portfolio"

export default function ViewsPage() {

    const [streams, setStreams] = useState<number>(-1);

    useEffect(() => {
        const es = new EventSource(STREAM_URL);
        es.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setStreams(data.value);
        }
        return () => {
            es.close();
        }
    }, []);

    return (
            <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="w-screen h-screen flex flex-col items-center justify-center">
                <h1 className="mb-1 min-h-7 text-xl font-bold text-neutral-100">
                    views
                </h1>
                <p className="text-neutral-400 items-center">
                    {streams !== -1
                        ?  <SlotCounter value={streams} />
                        : "unable to load view count"}
                </p>
            </motion.div>
    )
}
