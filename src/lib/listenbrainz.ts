const API_URL = "https://api.listenbrainz.org/1"

export type Track = {
    title: string
    artists: string
    album: string
    image: string | null
    url: string
}

export type MusicData = {
    nowPlaying: Track | null
    lastPlayed: (Track & { playedAt: string }) | null
    // most played over the last 30 days
    albums: (Track & { plays: number })[]
    top: (Track & { plays: number })[]
}

type Metadata = {
    track_name: string
    artist_name: string
    release_name?: string
    caa_id?: number
    caa_release_mbid?: string
    mbid_mapping?: { caa_id?: number; caa_release_mbid?: string }
    additional_info?: { origin_url?: string; spotify_id?: string }
}

async function listenbrainz(path: string) {
    const user = process.env.LISTENBRAINZ_USER
    if (!user) throw new Error("missing LISTENBRAINZ_USER")

    const res = await fetch(`${API_URL}/${path.replace(":user", encodeURIComponent(user))}`, {
        cache: "no-store",
    })
    // 204 = stats not calculated yet
    if (res.status === 204) return null
    if (!res.ok) throw new Error(`listenbrainz ${path} ${res.status}`)
    return res.json()
}

function spotifyTrackUrl(m: Metadata) {
    const info = m.additional_info
    if (info?.origin_url?.includes("open.spotify.com/track")) return info.origin_url
    if (info?.spotify_id) return info.spotify_id
    return null
}

// spotify's oembed needs no auth and covers everything, so it backfills art
// that the cover art archive doesn't have. memoized per worker instance.
const oembedCache = new Map<string, string | null>()
async function spotifyArt(trackUrl: string) {
    if (oembedCache.has(trackUrl)) return oembedCache.get(trackUrl)!
    try {
        const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(trackUrl)}`)
        const art = res.ok ? ((await res.json()).thumbnail_url ?? null) : null
        oembedCache.set(trackUrl, art)
        return art
    } catch {
        return null
    }
}

async function toTrack(m: Metadata): Promise<Track> {
    const caaId = m.mbid_mapping?.caa_id ?? m.caa_id
    const caaRelease = m.mbid_mapping?.caa_release_mbid ?? m.caa_release_mbid
    const spotifyUrl = spotifyTrackUrl(m)

    let image = caaId && caaRelease ? `https://coverartarchive.org/release/${caaRelease}/${caaId}-250.jpg` : null
    if (!image && spotifyUrl) image = await spotifyArt(spotifyUrl)

    return {
        title: m.track_name.toLowerCase(),
        artists: m.artist_name.toLowerCase(),
        album: (m.release_name ?? "").toLowerCase(),
        image,
        url: spotifyUrl ?? `https://open.spotify.com/search/${encodeURIComponent(`${m.track_name} ${m.artist_name}`)}`,
    }
}

type Listen = { track_metadata: Metadata; listened_at: number }

const MONTH_S = 30 * 24 * 60 * 60

// tally plays per key, most played first; ties go to whatever was played more recently
function rank(listens: Listen[], keyOf: (m: Metadata) => string, limit: number) {
    const counts = new Map<string, { listen: Listen; plays: number }>()
    for (const l of listens) {
        const key = keyOf(l.track_metadata).toLowerCase()
        const entry = counts.get(key)
        if (entry) entry.plays++
        // listens arrive newest first, so the first one seen is the latest
        else counts.set(key, { listen: l, plays: 1 })
    }
    return [...counts.values()].sort((a, b) => b.plays - a.plays).slice(0, limit)
}

let cached: { data: MusicData; at: number } | null = null

export async function getMusic(): Promise<MusicData> {
    // the month of listens is a big payload, so don't refetch it more than every 30s
    if (cached && Date.now() - cached.at < 30_000) return cached.data

    const [playing, history] = await Promise.all([
        listenbrainz("user/:user/playing-now").catch(() => null),
        // 1000 is the api max, plenty for a month for most people
        listenbrainz("user/:user/listens?count=1000"),
    ])

    const all: Listen[] = history?.payload?.listens ?? []
    const cutoff = Date.now() / 1000 - MONTH_S
    const month = all.filter((l) => l.listened_at >= cutoff)

    // key on the release alone so "artist feat. x" tracks from one album still collapse
    const topAlbums = rank(
        month,
        (m) => m.mbid_mapping?.caa_release_mbid ?? m.release_name ?? `${m.track_name}|${m.artist_name}`,
        12
    )
    const topTracks = rank(month, (m) => `${m.track_name}|${m.artist_name}`, 5)

    const nowMeta: Metadata | undefined = playing?.payload?.listens?.[0]?.track_metadata
    const latest = all[0]

    const [nowPlaying, lastPlayed, albums, top] = await Promise.all([
        nowMeta ? toTrack(nowMeta) : null,
        latest
            ? toTrack(latest.track_metadata).then((t) => ({
                  ...t,
                  playedAt: new Date(latest.listened_at * 1000).toISOString(),
              }))
            : null,
        Promise.all(
            topAlbums.map(async ({ listen, plays }) => {
                const m = listen.track_metadata
                const t = await toTrack(m)
                const album = m.release_name || m.track_name
                return {
                    ...t,
                    url: `https://open.spotify.com/search/${encodeURIComponent(`${album} ${m.artist_name}`)}`,
                    plays,
                }
            })
        ),
        Promise.all(topTracks.map(async ({ listen, plays }) => ({ ...(await toTrack(listen.track_metadata)), plays }))),
    ])

    // playing-now listens aren't mapped to musicbrainz yet, so borrow art from history
    if (nowPlaying && !nowPlaying.image) {
        nowPlaying.image =
            [lastPlayed, ...top].find((t) => t?.title === nowPlaying.title && t.artists === nowPlaying.artists)
                ?.image ?? null
    }

    const data = { nowPlaying, lastPlayed, albums, top }
    cached = { data, at: Date.now() }
    return data
}
