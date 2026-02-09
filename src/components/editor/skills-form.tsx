"use client"

import { useState } from "react"
import { addSkill, deleteSkill } from "@/lib/actions"

interface Skill {
  id: string
  name: string
}

interface SkillsFormProps {
  resumeId: string
  skills: Skill[]
}

export function SkillsForm({ resumeId, skills }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [adding, setAdding] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newSkill.trim()) return

    setAdding(true)
    await addSkill(resumeId, newSkill.trim())
    setNewSkill("")
    setAdding(false)
  }

  async function handleDelete(id: string) {
    await deleteSkill(id, resumeId)
  }

  return (
    <div className="space-y-4">
      {/* Skill Tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.id}
            className="inline-flex items-center gap-1 rounded-full bg-gray-300 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            {skill.name}
            <button
              onClick={() => handleDelete(skill.id)}
              className="ml-1 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">No skills added yet</p>
        )}
      </div>

      {/* Add Skill Form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g., JavaScript)"
          className="flex-1 rounded-md border border-gray-500 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
        <button
          type="submit"
          disabled={adding || !newSkill.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  )
}