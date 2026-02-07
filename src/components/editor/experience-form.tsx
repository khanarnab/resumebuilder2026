"use client"

import { useState } from "react"
import { addExperience, updateExperience, deleteExperience } from "@/lib/actions"

interface Experience {
    id: string
    company: string
    position: string
    location?: string | null
    startDate?: Date | null
    endDate?: Date | null
    current: boolean
    description?: string | null
}

interface ExperienceFormProps {
    resumeId: string
    experiences: Experience[]
}

function formatDate(date: Date | null | undefined): string {
    if (!date) return ""
    return new Date(date).toISOString().split("T")[0]
}

function ExperienceItem({
    experience,
    resumeId,
}: {
    experience: Experience
    resumeId: string
}) {
    const [saving, setSaving] = useState(false)
    const [isOpen, setIsOpen] = useState(!experience.company)
    const [isCurrent, setIsCurrent] = useState(experience.current)

    async function handleSubmit(formData: FormData) {
        setSaving(true)
        await updateExperience(experience.id, resumeId, {
            company: formData.get("company") as string,
            position: formData.get("position") as string,
            location: formData.get("location") as string,
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
            current: formData.get("current") === "on",
            description: formData.get("description") as string,
        })
        setSaving(false)
        setIsOpen(false)
    }

    async function handleDelete() {
        if (confirm("Delete this experience?")) {
            await deleteExperience(experience.id, resumeId)
        }
    }

    if (!isOpen) {
        const start = experience.startDate
            ? new Date(experience.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
            : null
        const end = experience.current
            ? "Present"
            : experience.endDate
                ? new Date(experience.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                : null
        const dateRange = start ? `${start} - ${end || ""}` : null

        return (
            <div className="flex items-center justify-between rounded-md border border-gray-200 p-4 dark:border-gray-700">
                <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                        {experience.position || "Untitled Position"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{experience.company || "No company"}</p>
                    {dateRange && <p className="text-sm text-gray-400 dark:text-gray-500">{dateRange}</p>}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
        )
    }

    return (
        <form action={handleSubmit} className="rounded-md border border-gray-200 p-4 space-y-4 dark:border-gray-700">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor={`company-${experience.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Company
                    </label>
                    <input
                        type="text"
                        id={`company-${experience.id}`}
                        name="company"
                        defaultValue={experience.company}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
                    />
                </div>
                <div>
                    <label htmlFor={`position-${experience.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Position
                    </label>
                    <input
                        type="text"
                        id={`position-${experience.id}`}
                        name="position"
                        defaultValue={experience.position}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
                    />
                </div>
            </div>

            <div>
                <label htmlFor={`location-${experience.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                </label>
                <input
                    type="text"
                    id={`location-${experience.id}`}
                    name="location"
                    defaultValue={experience.location || ""}
                    placeholder="City, State"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor={`startDate-${experience.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id={`startDate-${experience.id}`}
                        name="startDate"
                        defaultValue={formatDate(experience.startDate)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400"
                    />
                </div>
                <div>
                    <label htmlFor={`endDate-${experience.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        End Date
                    </label>
                    <input
                        type="date"
                        id={`endDate-${experience.id}`}
                        name="endDate"
                        defaultValue={formatDate(experience.endDate)}
                        disabled={isCurrent}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-400 disabled:bg-gray-900 disabled:text-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    name="current"
                    checked={isCurrent}
                    onChange={(e) => setIsCurrent(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor={`current-${experience.id}`} className="text-sm text-gray-700 dark:text-gray-300">
                    I currently work here
                </label>
            </div>

            <div>
                <label htmlFor={`description-${experience.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                </label>
                <textarea
                    id={`description-${experience.id}`}
                    name="description"
                    rows={4}
                    defaultValue={experience.description || ""}
                    placeholder="Describe your responsibilities and achievements..."
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

export function ExperienceForm({ resumeId, experiences }: ExperienceFormProps) {
    async function handleAdd() {
        await addExperience(resumeId)
    }

    return (
        <div className="space-y-4">
            {experiences.map((experience) => (
                <ExperienceItem key={experience.id} experience={experience} resumeId={resumeId} />
            ))}

            <form action={handleAdd}>
                <button
                    type="submit"
                    className="w-full rounded-md border-2 border-dashed border-primary px-4 py-3 text-sm font-medium text-primary hover:border-primary-hover hover:text-primary-hover"
                >
                    + Add Experience
                </button>
            </form>
        </div>
    )
}