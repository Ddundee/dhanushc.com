"use client";
import RESUME_LINK from '@/util/resumeLink';
import React, { useEffect } from 'react'

export default function Page() {

    useEffect(() => {
        window.location.href = RESUME_LINK;
    }, [])

    return (

        <div className="relative flex min-h-screen flex-col items-center justify-between pb-14">


            <div className="relative z-10 flex w-screen flex-col items-center gap-9 px-4 py-14">
                <div className="h-12 w-full" />
                <main className="w-full max-w-screen-md space-y-9">
                    <div className='w-full h-full justify-center flex-col flex items-center'>
                        <div
                            className="text-neutral-400 no-underline"
                        >
                            redirecting to resume...
                        </div>
                        <div className='text-neutral-400'>
                            if you are not automatically redirected, <a className='text-neutral-100 underline' href={RESUME_LINK}
                                rel="noreferrer">click here to view my resume</a>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}
