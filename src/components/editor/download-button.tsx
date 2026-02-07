"use client"

import { useState } from "react"
import { pdf } from "@react-pdf/renderer"
import { ResumePDF } from "./resume-pdf"

interface DownloadButtonProps {
  resume: {
    title: string
    contactInfo: {
      fullName?: string | null
      email?: string | null
      phone?: string | null
      location?: string | null
      linkedin?: string | null
      github?: string | null
      website?: string | null
    } | null
    summary: {
      content: string
    } | null
    experiences: Array<{
      company: string
      position: string
      location?: string | null
      startDate?: Date | null
      endDate?: Date | null
      current: boolean
      description?: string | null
    }>
    education: Array<{
      institution: string
      degree: string
      field?: string | null
      startDate?: Date | null
      endDate?: Date | null
      current: boolean
      description?: string | null
    }>
    skills: Array<{
      name: string
    }>
    projects: Array<{
      name: string
      url?: string | null
      description?: string | null
    }>
  }
}

export function DownloadButton({ resume }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)

    const blob = await pdf(<ResumePDF resume={resume} />).toBlob()
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${resume.title || "resume"}.pdf`
    link.click()

    URL.revokeObjectURL(url)
    setLoading(false)
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
    >
      {loading ? "Generating..." : "Download PDF"}
    </button>
  )
}