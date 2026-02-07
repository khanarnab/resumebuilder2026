import Link from "next/link"
import { auth } from "@/lib/auth"

export async function CTASection() {
    const session = await auth()

    return (
        <section className="py-20">
            <div className="rounded-2xl px-6 py-16 text-center border border-gray-200 bg-gray-800 p-8 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-white">Ready to build your resume?</h2>
                <Link
                    href={session ? "/dashboard" : "/api/auth/signin?callbackUrl=/dashboard"}
                    className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-white hover:bg-primary-hover"
                >
                    {session ? "Go to Dashboard" : "Get Started"}
                </Link>
            </div>
        </section>
    )
}