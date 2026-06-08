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
        <div className="space-y-3">
            {/* <p className='text-white'>{page}</p> */}
            {
                BLOGS.map((blog, i) => (
                    <div className="flex justify-between gap-2" key={blog.url}>
                        {blog.published ? <Link
                            href={blog.url}
                            className={`text-lg font-medium text-neutral-200/70 hover:text-orange-600 duration-200`}
                        >
                            {blog.title}
                        </Link> : <p
                            className={`text-lg font-medium text-neutral-200/50`}
                        >
                            {blog.title}
                        </p>}
                        <span className="text-md text-neutral-600">{blog.published ? blog.date : "coming soon"}</span>
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
