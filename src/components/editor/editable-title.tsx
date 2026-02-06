"use client"

import { useState } from "react"
import { updateResumeTitle } from "@/lib/actions"

interface EditableTitleProps {
  resumeId: string
  initialTitle: string
}

export function EditableTitle({ resumeId, initialTitle }: EditableTitleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)

  async function handleSave() {
    if (title.trim()) {
      await updateResumeTitle(resumeId, title.trim())
    } else {
      setTitle(initialTitle)
    }
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave()
          if (e.key === "Escape") {
            setTitle(initialTitle)
            setIsEditing(false)
          }
        }}
        autoFocus
        className="rounded border border-gray-300 px-2 py-1 text-sm font-medium focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:border-gray-300 dark:focus:ring-gray-300"
      />
    )
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
      title="Click to rename"
    >
      {title}
    </button>
  )
}