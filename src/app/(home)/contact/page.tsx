//  import ContactForm from "@/components/contact-form";
import PageLayout from "../../_components/page-layout"

export default async function Home() {
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    return (
        <PageLayout>
            <div>
                <h1 className="mb-1 min-h-7 w-full text-xl font-bold text-neutral-100">
                    {/* <ScrambleText minors="contact me" /> */}
                    contact me
                </h1>
                <p className="text-neutral-400">get in touch!</p>
            </div>
            {/* <ContactForm /> */}
        </PageLayout>
    )
}
