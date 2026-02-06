import Link from "next/link"
import { auth, signOut } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

export async function Navbar() {
    const session = await auth()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold">
                    ResumeBuilder
                </Link>

                <nav className="flex items-center gap-2">
                    <ThemeToggle />
                    {session?.user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="text-sm font-bold text-gray-700 hover:text-gray-900 dark:text-white"
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
                                    className="text-sm font-bold text-gray-700 hover:text-gray-900 dark:text-white"
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