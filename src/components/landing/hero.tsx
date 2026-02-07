import Link from "next/link"
import { auth } from "@/lib/auth"

export async function Hero() {
    const session = await auth()

    return (
        <section className="py-20 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Build your resume
                <span className="block text-gray-600 dark:text-gray-400">in minutes, not hours</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
                Create professional resumes with our intuitive builder.
            </p>
            <Link
                href={session ? "/dashboard" : "/api/auth/signin?callbackUrl=/dashboard"}
                className="mt-10 inline-block rounded-md bg-primary px-6 py-3 text-white hover:bg-primary-hover"
            >
                {session ? "Go to Dashboard" : "Get Started"}
            </Link>
        </section>
    )
}