"use client"

import { useState } from "react"
import { addEducation, updateEducation, deleteEducation } from "@/lib/actions"

interface Education {
  id: string
  institution: string
  degree: string
  field?: string | null
  startDate?: Date | null
  endDate?: Date | null
  description?: string | null
}

interface EducationFormProps {
  resumeId: string
  education: Education[]
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return ""
  return new Date(date).toISOString().split("T")[0]
}

function EducationItem({
  education,
  resumeId,
}: {
  education: Education
  resumeId: string
}) {
  const [saving, setSaving] = useState(false)
  const [isOpen, setIsOpen] = useState(!education.institution)

  async function handleSubmit(formData: FormData) {
    setSaving(true)
    await updateEducation(education.id, resumeId, {
      institution: formData.get("institution") as string,
      degree: formData.get("degree") as string,
      field: formData.get("field") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      description: formData.get("description") as string,
    })
    setSaving(false)
    setIsOpen(false)
  }

  async function handleDelete() {
    if (confirm("Delete this education?")) {
      await deleteEducation(education.id, resumeId)
    }
  }

  if (!isOpen) {
    const start = education.startDate
      ? new Date(education.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : null
    const end = education.endDate
      ? new Date(education.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : null
    const dateRange = start ? `${start} - ${end || "Present"}` : null

    return (
      <div className="flex items-center justify-between rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {education.degree || "Untitled Degree"}
            {education.field && ` in ${education.field}`}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{education.institution || "No institution"}</p>
          {dateRange && <p className="text-sm text-gray-400 dark:text-gray-500">{dateRange}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="rounded-md border border-gray-200 p-4 space-y-4 dark:border-gray-700">
      <div>
        <label htmlFor={`institution-${education.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Institution
        </label>
        <input
          type="text"
          id={`institution-${education.id}`}
          name="institution"
          defaultValue={education.institution}
          placeholder="University name"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`degree-${education.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Degree
          </label>
          <input
            type="text"
            id={`degree-${education.id}`}
            name="degree"
            defaultValue={education.degree}
            placeholder="Bachelor's, Master's, etc."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
          />
        </div>
        <div>
          <label htmlFor={`field-${education.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Field of Study
          </label>
          <input
            type="text"
            id={`field-${education.id}`}
            name="field"
            defaultValue={education.field || ""}
            placeholder="Computer Science, etc."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`startDate-${education.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <input
            type="date"
            id={`startDate-${education.id}`}
            name="startDate"
            defaultValue={formatDate(education.startDate)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
          />
        </div>
        <div>
          <label htmlFor={`endDate-${education.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <input
            type="date"
            id={`endDate-${education.id}`}
            name="endDate"
            defaultValue={formatDate(education.endDate)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`description-${education.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description (optional)
        </label>
        <textarea
          id={`description-${education.id}`}
          name="description"
          rows={3}
          defaultValue={education.description || ""}
          placeholder="Relevant coursework, honors, activities..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-900 dark:hover:text-gray-800"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export function EducationForm({ resumeId, education }: EducationFormProps) {
  async function handleAdd() {
    await addEducation(resumeId)
  }

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <EducationItem key={edu.id} education={edu} resumeId={resumeId} />
      ))}

      <form action={handleAdd}>
        <button
          type="submit"
          className="w-full rounded-md border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-white"
        >
          + Add Education
        </button>
      </form>
    </div>
  )
}