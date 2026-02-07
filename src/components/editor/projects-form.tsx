"use client"

import { useState } from "react"
import { addProject, updateProject, deleteProject } from "@/lib/actions"

interface Project {
  id: string
  name: string
  url?: string | null
  description?: string | null
}

interface ProjectsFormProps {
  resumeId: string
  projects: Project[]
}

function ProjectItem({
  project,
  resumeId,
}: {
  project: Project
  resumeId: string
}) {
  const [saving, setSaving] = useState(false)
  const [isOpen, setIsOpen] = useState(!project.name)

  async function handleSubmit(formData: FormData) {
    setSaving(true)
    await updateProject(project.id, resumeId, {
      name: formData.get("name") as string,
      url: formData.get("url") as string,
      description: formData.get("description") as string,
    })
    setSaving(false)
    setIsOpen(false)
  }

  async function handleDelete() {
    if (confirm("Delete this project?")) {
      await deleteProject(project.id, resumeId)
    }
  }

  if (!isOpen) {
    return (
      <div className="flex items-center justify-between rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {project.name || "Untitled Project"}
          </p>
          {project.url && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{project.url}</p>
          )}
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
        <label htmlFor={`name-${project.id}`} className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          id={`name-${project.id}`}
          name="name"
          defaultValue={project.name}
          placeholder="My Awesome Project"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor={`url-${project.id}`} className="block text-sm font-medium text-gray-700">
          Project URL (optional)
        </label>
        <input
          type="url"
          id={`url-${project.id}`}
          name="url"
          defaultValue={project.url || ""}
          placeholder="https://github.com/you/project"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor={`description-${project.id}`} className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id={`description-${project.id}`}
          name="description"
          rows={3}
          defaultValue={project.description || ""}
          placeholder="Describe what you built and the technologies used..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export function ProjectsForm({ resumeId, projects }: ProjectsFormProps) {
  async function handleAdd() {
    await addProject(resumeId)
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} resumeId={resumeId} />
      ))}

      <form action={handleAdd}>
        <button
          type="submit"
          className="w-full rounded-md border-2 border-dashed border-primary px-4 py-3 text-sm font-medium text-primary hover:border-primary-hover hover:text-primary-hover"
        >
          + Add Project
        </button>
      </form>
    </div>
  )
}