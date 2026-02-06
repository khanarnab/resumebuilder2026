import Link from "next/link";
export function CTASection() {
    return <section className="py-20">
        <div className="rounded-2xl px-6 py-16 text-center border border-gray-200 bg-gray-800 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-white">Ready to build your resume?</h2>
            <Link href="/api/auth/signin?callbackUrl=/dashboard" className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-gray-900 hover:bg-gray-200">Get Started</Link>
        </div>
    </section>
}