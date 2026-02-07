"use client"

import { useState } from "react"
import { updateSummary } from "@/lib/actions"

interface SummaryFormProps {
  resumeId: string
  initialData: { content: string } | null
}

export function SummaryForm({ resumeId, initialData }: SummaryFormProps) {
  const [saving, setSaving] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSaving(true)
    await updateSummary(resumeId, formData.get("content") as string)
    setSaving(false)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Summary
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          defaultValue={initialData?.content || ""}
          placeholder="Experienced software developer with 5+ years..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
        <p className="mt-1 text-xs text-gray-500">
          2-4 sentences highlighting your experience and goals
        </p>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  )
}