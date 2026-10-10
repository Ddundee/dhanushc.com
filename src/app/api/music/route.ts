import { getMusic } from "@/lib/listenbrainz"

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        const data = await getMusic()
        return Response.json(data, {
            headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30" },
        })
    } catch (err) {
        console.error(err)
        return Response.json({ error: "music unavailable" }, { status: 502 })
    }
}
