'use client'
import BlogList from "../../_components/blog-list"
import Reveal from "@/components/reveal"

export default function Blog() {
    return (
        <div className="space-y-9">
            <Reveal index={0} className="space-y-2">
                <h1 className="text-4xl leading-tight tracking-[-0.025em] text-neutral-100 sm:text-5xl">
                    blog
                </h1>
                <p className="text-neutral-500">
                    writing my thoughts and maybe useful tidbits
                </p>
            </Reveal>
            <Reveal index={1}>
                <BlogList />
            </Reveal>
        </div>
    )
}
