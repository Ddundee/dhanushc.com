"use client";
import React, { useEffect } from 'react'

const SLIDES_LINK = "https://docs.google.com/presentation/d/1WUJwhG8wTVC0pXnipokOYWGDVZUpqgT3t0TWCDm1hK4/edit?usp=sharing";

export default function Page() {

    useEffect(() => {
        window.open(SLIDES_LINK, "_self");
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
                            redirecting to slides...
                        </div>
                        <div className='text-neutral-400'>
                            if you are not automatically redirected, <a className='text-neutral-100 underline' href={SLIDES_LINK}
                                rel="noreferrer">click here to view my slides</a>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}
