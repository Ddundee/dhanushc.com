"use client"
import React from 'react'
import BLOGS from '../(home)/blog/blogs'
import Link from 'next/link'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const MAX_BLOGS_PER_PAGE = 5;

export default function BlogList() {

    const maxNumPages = Math.ceil(BLOGS.length / MAX_BLOGS_PER_PAGE);

    const [page, setPage] = React.useState(1);
    return (
        <div className="space-y-6">
            {/* <p className='text-white'>{page}</p> */}
            {
                BLOGS.map((blog, i) => (
                    // same index layout as the hackathon list
                    <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6" key={blog.url}>
                        <span className="font-mono text-sm leading-7 text-neutral-500">{blog.published ? blog.date : "coming soon"}</span>
                        {blog.published ? <Link
                            href={blog.url}
                            className="text-lg text-neutral-100 transition-colors duration-200 hover:text-orange-600"
                        >
                            {blog.title}
                        </Link> : <p
                            className="text-lg text-neutral-500"
                        >
                            {blog.title}
                        </p>}
                    </div>
                ))
            }
            {/* <Pagination>
                <PaginationContent className='w-full border border-red-500 dark bg-red-500'>
                    <PaginationItem>
                        <PaginationPrevious isActive={page !== 1} onClick={() => {
                            if (page > 1) setPage(page - 1)
                        }} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination> */}
        </div>
    )
}
