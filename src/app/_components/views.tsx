"use client"

import NumberFlow from '@number-flow/react'
import { useEffect, useState } from "react";

const HIT_URL = "https://abacus.jasoncameron.dev/hit/dhanushc.com/portfolio"
const GET_URL = "https://abacus.jasoncameron.dev/get/dhanushc.com/portfolio"
const STREAM_URL = "https://abacus.jasoncameron.dev/stream/dhanushc.com/portfolio"

export default function Views({ countOnVisit = true }: { countOnVisit?: boolean }) {
    const [streams, setStreams] = useState<number>(-1);

    useEffect(() => {
        if (!countOnVisit) {
            const fetchViews = async () => {
                const res = await fetch(GET_URL)
                const data = await res.json()
                setStreams(data.value)
            }
            fetchViews()
            return
        }

        const fetchViews = async () => {
            const res = await fetch(HIT_URL)
            console.log(res.json())
        }
        fetchViews();
    }, [countOnVisit]);


    useEffect(() => {
        if (!countOnVisit) return

        const es = new EventSource(STREAM_URL);
        es.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setStreams(data.value);
        }
        return () => {
            es.close();
        }
    }, [countOnVisit]);

    return (
        <div>
            {streams !== -1 && (
                <p className="text-neutral-400 text-sm"><NumberFlow value={streams} /> views</p>
            )}
        </div>
    )
}
