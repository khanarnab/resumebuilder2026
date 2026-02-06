import Link from "next/link";
export function Hero() { 
    return <section className="py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Build your resume<span className="block text-gray-600 dark:text-gray-400">in minutes, not hours</span></h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">Create professional resumes with our intuitive builder.</p>
        <Link href="/api/auth/signin?callbackUrl=/dashboard" className="mt-10 inline-block rounded-md bg-gray-900 dark:bg-white px-6 py-3 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">Get Started</Link></section> }