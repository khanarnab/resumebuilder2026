import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getResumes, createResume, deleteResume } from "@/lib/actions"
import Link from "next/link"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard")
  }

  const resumes = await getResumes()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create and manage your resumes
          </p>
        </div>
        <form action={createResume}>
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            New Resume
          </button>
        </form>
      </div>

      {resumes.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-gray-500">No resumes yet</p>
          <form action={createResume} className="mt-4">
            <button
              type="submit"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Create Your First Resume
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <h2 className="font-semibold text-gray-900">{resume.title}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Updated {resume.updatedAt.toLocaleDateString()}
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/editor/${resume.id}`}
                  className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    "use server"
                    await deleteResume(resume.id)
                  }}
                >
                  <button
                    type="submit"
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}