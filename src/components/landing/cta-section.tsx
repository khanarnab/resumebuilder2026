import Link from "next/link";
export function CTASection() { return <section className="py-20"><div className="rounded-2xl bg-gray-900 px-6 py-16 text-center"><h2 className="text-3xl font-bold text-white">Ready to build your resume?</h2><Link href="/auth/signin" className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-gray-900">Get Started</Link></div></section> }
