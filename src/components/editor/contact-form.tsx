"use client"

import { useState } from "react"
import { updateContactInfo } from "@/lib/actions"

interface ContactFormProps {
  resumeId: string
  initialData: {
    fullName?: string | null
    email?: string | null
    phone?: string | null
    location?: string | null
    linkedin?: string | null
    github?: string | null
    website?: string | null
  } | null
}

export function ContactForm({ resumeId, initialData }: ContactFormProps) {
  const [saving, setSaving] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSaving(true)

    await updateContactInfo(resumeId, {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      linkedin: formData.get("linkedin") as string,
      github: formData.get("github") as string,
      website: formData.get("website") as string,
    })

    setSaving(false)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          defaultValue={initialData?.fullName || ""}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={initialData?.email || ""}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          defaultValue={initialData?.phone || ""}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={initialData?.location || ""}
          placeholder="City, State"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
          LinkedIn URL
        </label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          defaultValue={initialData?.linkedin || ""}
          placeholder="https://linkedin.com/in/yourname"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="github" className="block text-sm font-medium text-gray-700">
          GitHub URL
        </label>
        <input
          type="url"
          id="github"
          name="github"
          defaultValue={initialData?.github || ""}
          placeholder="https://github.com/yourname"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Personal Website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          defaultValue={initialData?.website || ""}
          placeholder="https://yourwebsite.com"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  )
}