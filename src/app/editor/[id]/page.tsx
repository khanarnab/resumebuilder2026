import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { getResume } from "@/lib/actions"
import { Editor } from "@/components/editor/editor"

export const metadata = {
  title: "Editor",
}

interface EditorPageProps {
  params: Promise<{ id: string }>
}

export default async function EditorPage({ params }: EditorPageProps) {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/editor")
  }

  const { id } = await params
  const resume = await getResume(id)

  if (!resume) {
    notFound()
  }

  return <Editor resume={resume} />
}