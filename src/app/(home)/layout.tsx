import PageLayout from "../_components/page-layout"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <PageLayout>
            {children}
        </PageLayout>
    )
}
