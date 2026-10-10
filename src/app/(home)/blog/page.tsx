'use client'
import BlogList from "../../_components/blog-list"
import Reveal from "@/components/reveal"

export default function Blog() {
    return (
        <div className="space-y-9">
            <Reveal index={0} className="space-y-2">
                <h1 className="min-h-7 w-full text-5xl font-bold text-neutral-100">
                    blog
                </h1>
                <p className="text-neutral-400 text-lg">
                    writing my thoughts and maybe useful tidbits
                </p>
            </Reveal>
            <Reveal index={1}>
                <BlogList />
            </Reveal>
        </div>
    )
}
