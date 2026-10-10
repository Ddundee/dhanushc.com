"use client"

import { useCallback, useEffect, useState, type SyntheticEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import type { MusicData } from "@/lib/listenbrainz"
import { cn } from "@/lib/utils"
import Reveal, { EASE } from "@/components/reveal"

const POLL_MS = 30_000

// fade covers in once they've actually loaded instead of letting them pop in
const fadeOnLoad = {
    onLoad: (e: SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.dataset.loaded = "true"
    },
}
const FADE_CLASS = "opacity-0 transition-[opacity,filter,scale] data-[loaded=true]:opacity-100"

function timeAgo(iso: string, now: number) {
    const s = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000))
    if (s < 60) return "just now"
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
}

function Equalizer() {
    return (
        <span className="inline-flex h-3 items-end gap-[2px]" aria-hidden>
            {[0, 0.2, 0.4].map((delay) => (
                <span
                    key={delay}
                    className="animate-eq h-full w-[3px] origin-bottom rounded-full bg-orange-600"
                    style={{ animationDelay: `${delay}s` }}
                />
            ))}
        </span>
    )
}

// pulls the most prominent saturated color out of a cover, nudged light enough to read on the dark bg.
// needs the image loaded with crossOrigin="anonymous"; returns null if the canvas is tainted.
function coverColor(img: HTMLImageElement) {
    const size = 32
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return null

    let pixels: Uint8ClampedArray
    try {
        ctx.drawImage(img, 0, 0, size, size)
        pixels = ctx.getImageData(0, 0, size, size).data
    } catch {
        return null
    }

    // bucket similar colors, weighting saturated pixels so a vivid accent beats a dull background
    const buckets = new Map<number, { weight: number; r: number; g: number; b: number }>()
    for (let i = 0; i < pixels.length; i += 4) {
        const [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]]
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const light = (max + min) / 510
        if (light < 0.1 || light > 0.94) continue
        const sat = max === min ? 0 : (max - min) / (255 - Math.abs(max + min - 255))
        const weight = 1 + sat * 4
        const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4)
        const bucket = buckets.get(key) ?? { weight: 0, r: 0, g: 0, b: 0 }
        bucket.weight += weight
        bucket.r += r * weight
        bucket.g += g * weight
        bucket.b += b * weight
        buckets.set(key, bucket)
    }

    let best: { weight: number; r: number; g: number; b: number } | undefined
    for (const bucket of buckets.values()) if (!best || bucket.weight > best.weight) best = bucket
    if (!best) return null

    const [r, g, b] = [best.r, best.g, best.b].map((c) => c / best.weight / 255)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2
    const d = max - min
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
    let h = 0
    if (d !== 0) {
        if (max === r) h = ((g - b) / d) % 6
        else if (max === g) h = (b - r) / d + 2
        else h = (r - g) / d + 4
        h *= 60
    }
    // near-greyscale covers stay grey instead of getting a random hue boosted
    const sat = s < 0.12 ? s : Math.max(s, 0.55)
    const light = Math.min(Math.max(l, 0.62), 0.78)
    return `hsl(${Math.round((h + 360) % 360)} ${Math.round(sat * 100)}% ${Math.round(light * 100)}%)`
}

export default function Music() {
    const [data, setData] = useState<MusicData | null>(null)
    const [error, setError] = useState(false)
    const [now, setNow] = useState(() => Date.now())
    const [hovered, setHovered] = useState<number | null>(null)
    const [hoveredTop, setHoveredTop] = useState<number | null>(null)
    const [colors, setColors] = useState<Record<string, string>>({})

    const load = useCallback(async () => {
        try {
            const res = await fetch("/api/music")
            if (!res.ok) throw new Error()
            setData(await res.json())
            setError(false)
        } catch {
            setError(true)
        }
    }, [])

    useEffect(() => {
        load()
        const poll = setInterval(load, POLL_MS)
        const tick = setInterval(() => setNow(Date.now()), 1000)
        return () => {
            clearInterval(poll)
            clearInterval(tick)
        }
    }, [load])

    const np = data?.nowPlaying

    if (error && !data) {
        return (
            <Reveal index={1}>
                <p className="text-neutral-500">the music api&apos;s taking a nap. try again in a bit.</p>
            </Reveal>
        )
    }

    const last = data?.lastPlayed
    const featured = np ?? last
    const caption = data?.albums[hovered ?? 0]

    return (
        <div className="space-y-12">
            {/* now playing / last played */}
            <Reveal as="section" index={1} className="relative">
                <AnimatePresence>
                    {featured?.image && (
                        <motion.img
                            key={featured.image}
                            src={featured.image}
                            alt=""
                            aria-hidden
                            initial={{ opacity: 0 }}
                            animate={{ opacity: np ? 0.35 : 0.15 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            className="pointer-events-none absolute -left-8 -top-8 h-48 w-48 scale-150 rounded-full blur-3xl saturate-150"
                        />
                    )}
                </AnimatePresence>

                <div className="relative flex items-center gap-5">
                    {featured?.image ? (
                        <a href={featured.url} target="_blank" rel="noreferrer" className="shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                key={featured.image}
                                src={featured.image}
                                alt={featured.album}
                                {...fadeOnLoad}
                                className={cn(
                                    "size-24 rounded-sm object-cover shadow-lg shadow-black/40 duration-500 sm:size-28",
                                    FADE_CLASS
                                )}
                            />
                        </a>
                    ) : (
                        <div className="size-24 shrink-0 animate-pulse rounded-sm bg-neutral-900 sm:size-28" />
                    )}

                    <motion.div
                        // re-keyed per song so the text crossfades when the track changes
                        key={featured ? `${featured.title}|${featured.artists}` : "loading"}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="min-w-0 flex-1 space-y-1"
                    >
                        <p className="flex items-center gap-2 text-neutral-500">
                            {np ? (
                                <>
                                    <Equalizer />
                                    listening now
                                </>
                            ) : last ? (
                                `last played, ${timeAgo(last.playedAt, now)}`
                            ) : (
                                "loading..."
                            )}
                        </p>
                        {featured && (
                            <>
                                <a
                                    href={featured.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block truncate text-lg text-neutral-100 underline decoration-neutral-600 underline-offset-4 transition-colors duration-200 hover:text-orange-600 hover:decoration-orange-600"
                                >
                                    {featured.title}
                                </a>
                                <p className="truncate text-neutral-400">
                                    {featured.artists}
                                    {featured.album && ` / ${featured.album}`}
                                </p>
                            </>
                        )}
                    </motion.div>
                </div>
            </Reveal>

            {/* most played albums, last 30 days */}
            <Reveal as="section" index={2} className="space-y-3">
                <div className="flex items-baseline justify-between">
                    <h2 className="text-2xl font-semibold text-neutral-100">recently played</h2>
                    <span className="text-sm text-neutral-600">most played, last 30 days</span>
                </div>
                <div
                    className="grid grid-cols-3 gap-1.5 sm:grid-cols-4"
                    onMouseLeave={() => setHovered(null)}
                >
                    {data
                        ? data.albums.map((t, i) => (
                              <motion.a
                                  key={t.url}
                                  href={t.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  onMouseEnter={() => setHovered(i)}
                                  onFocus={() => setHovered(i)}
                                  initial={{ opacity: 0, scale: 0.96 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.035 }}
                                  className="group relative aspect-square overflow-hidden bg-neutral-900"
                              >
                                  {t.image && (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                          src={t.image}
                                          alt={`${t.album || t.title} by ${t.artists}`}
                                          loading="lazy"
                                          crossOrigin="anonymous"
                                          onLoad={(e) => {
                                              fadeOnLoad.onLoad(e)
                                              const c = coverColor(e.currentTarget)
                                              if (c) setColors((prev) => ({ ...prev, [t.url]: c }))
                                          }}
                                          className={cn(
                                              "size-full object-cover grayscale duration-500 group-hover:scale-105 group-hover:grayscale-0 group-focus-visible:grayscale-0",
                                              FADE_CLASS,
                                              // brightness, not opacity, so it doesn't fight the load fade
                                              hovered !== null && hovered !== i && "brightness-50"
                                          )}
                                      />
                                  )}
                              </motion.a>
                          ))
                        : Array.from({ length: 12 }, (_, i) => (
                              <div key={i} className="aspect-square animate-pulse bg-neutral-900" />
                          ))}
                </div>
                <div className="flex min-h-6 items-baseline justify-between gap-4">
                    {caption && (
                        <>
                            <p className="truncate">
                                <span
                                    className="text-neutral-200 transition-colors duration-300"
                                    style={{ color: colors[caption.url] }}
                                >
                                    {caption.album || caption.title}
                                </span>{" "}
                                <span className="text-neutral-500">{caption.artists}</span>
                            </p>
                            <span
                                className="shrink-0 tabular-nums text-neutral-600 transition-colors duration-300"
                                style={{ color: colors[caption.url] }}
                            >
                                {caption.plays} plays
                            </span>
                        </>
                    )}
                </div>
            </Reveal>

            {/* top tracks, last 30 days */}
            {data && data.top.length > 0 && (
                <Reveal as="section" index={3} className="space-y-3">
                    <div className="flex items-baseline justify-between">
                        <h2 className="text-2xl font-semibold text-neutral-100">on repeat</h2>
                        <span className="text-sm text-neutral-600">last 30 days</span>
                    </div>
                    <ol className="space-y-3" onMouseLeave={() => setHoveredTop(null)}>
                        {data.top.map((t, i) => {
                            const active = hoveredTop === i
                            const dimmed = hoveredTop !== null && !active
                            const color = active ? (colors[t.url] ?? "#ea580c") : undefined
                            return (
                                <motion.li
                                    key={t.url}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.05 }}
                                >
                                    <a
                                        href={t.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        onMouseEnter={() => setHoveredTop(i)}
                                        onFocus={() => setHoveredTop(i)}
                                        onBlur={() => setHoveredTop(null)}
                                        className={cn("flex items-center gap-4 duration-300", dimmed && "opacity-40")}
                                    >
                                        <span
                                            className="w-5 text-sm tabular-nums text-neutral-600 duration-300"
                                            style={{ color }}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {t.image && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={t.image}
                                                alt=""
                                                loading="lazy"
                                                crossOrigin="anonymous"
                                                onLoad={(e) => {
                                                    fadeOnLoad.onLoad(e)
                                                    const c = coverColor(e.currentTarget)
                                                    if (c) setColors((prev) => ({ ...prev, [t.url]: c }))
                                                }}
                                                className={cn(
                                                    "size-10 rounded-sm object-cover duration-300",
                                                    FADE_CLASS,
                                                    dimmed && "grayscale"
                                                )}
                                            />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-neutral-200 duration-300" style={{ color }}>
                                                {t.title}
                                            </p>
                                            <p className="truncate text-sm text-neutral-500">{t.artists}</p>
                                        </div>
                                        <span
                                            className="shrink-0 text-sm tabular-nums text-neutral-600 duration-300"
                                            style={{ color }}
                                        >
                                            {t.plays} plays
                                        </span>
                                    </a>
                                </motion.li>
                            )
                        })}
                    </ol>
                </Reveal>
            )}
        </div>
    )
}
