import Link from "next/link"
import { auth, signOut } from "@/lib/auth"

export async function Navbar() {
    const session = await auth()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold">
                    ResumeBuilder
                </Link>

                <nav>
                    {session?.user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-gray-700 hover:text-gray-900"
                            >
                                Dashboard
                            </Link>
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut({ redirectTo: "/" })
                                }}
                            >
                                <button
                                    type="submit"
                                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Sign Out
                                </button>
                            </form>
                            {session.user.image && (
                                <img
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    className="h-8 w-8 rounded-full"
                                />
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/api/auth/signin?callbackUrl=/dashboard"
                            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
                        >
                            Sign In
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}