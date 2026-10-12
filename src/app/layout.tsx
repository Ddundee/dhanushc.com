import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import RouterProgressBar from "@/components/router-progress-bar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import MotionProvider from "@/context/motion-provider"
import { ThemeProvider } from "next-themes"

const geist = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin", "latin-ext"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin", "latin-ext"],
})

// tints the mobile browser chrome to match the page
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
}

export const metadata: Metadata = {
    metadataBase: new URL("https://www.dhanushc.com"),
    title: {
        default: "dhanush chilakala - cs & cmda @ virginia tech",
        template: "%s | dhanush chilakala",
    },
    description:
        "Portfolio of Dhanush Chilakala, a Dallas-based CS & CMDA undergrad at Virginia Tech who loves building things, solving problems, and writing about hackathons and software.",
    keywords: [
        "Dhanush Chilakala",
        "Dhanush C",
        "Dhanush portfolio",
        "software engineer",
        "Virginia Tech",
        "CS CMDA",
        "developer portfolio",
        "Dallas",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: "https://www.dhanushc.com",
        title: "dhanush chilakala - cs & cmda @ virginia tech",
        description:
            "Dallas-based CS & CMDA undergrad at Virginia Tech who loves building things, solving problems, and sharing projects and hackathon experiences.",
        siteName: "dhanush chilakala",
    },
    twitter: {
        card: "summary_large_image",
        title: "dhanush chilakala - cs & cmda @ virginia tech",
        description:
            "Portfolio of Dhanush Chilakala, Dallas-based undergrad and developer at VT Hacks.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geist.variable} ${geistMono.variable} bg-neutral-950 font-sans antialiased selection:bg-orange-600/30`}
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <TooltipProvider>
                        <Toaster
                            closeButton
                            className="boder-orange-600 bg-orange-300/5 text-neutral-100 backdrop-blur-md"
                        />
                        <MotionProvider>
                                {children}
                        </MotionProvider>
                    </TooltipProvider>
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
