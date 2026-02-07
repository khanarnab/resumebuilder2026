"use client"

import { useState } from "react"
import Link from "next/link"
import { ContactForm } from "./contact-form"
import { SummaryForm } from "./summary-form"
import { ExperienceForm } from "./experience-form"
import { EducationForm } from "./education-form"
import { SkillsForm } from "./skills-form"
import { ProjectsForm } from "./projects-form"
import { EditableTitle } from "./editable-title"
import { ResumePreview } from "./resume-preview"
import { DownloadButton } from "./download-button"

type Section = "contact" | "summary" | "experience" | "education" | "skills" | "projects"

interface ResumeData {
    id: string
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
        id: string
        company: string
        position: string
        location?: string | null
        startDate?: Date | null
        endDate?: Date | null
        current: boolean
        description?: string | null
    }>
    education: Array<{
        id: string
        institution: string
        degree: string
        field?: string | null
        startDate?: Date | null
        endDate?: Date | null
        current: boolean
        description?: string | null
    }>
    skills: Array<{
        id: string
        name: string
    }>
    projects: Array<{
        id: string
        name: string
        url?: string | null
        description?: string | null
    }>
}

interface EditorProps {
    resume: ResumeData
}

const sections: { id: Section; label: string }[] = [
    { id: "contact", label: "Contact" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
]

export function Editor({ resume }: EditorProps) {
    const [activeSection, setActiveSection] = useState<Section>("contact")

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        ← Back
                    </Link>
                    <EditableTitle resumeId={resume.id} initialTitle={resume.title} />
                </div>
                <DownloadButton resume={resume} />
            </div>

            {/* Editor Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-55 border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-600">
                    <nav className="space-y-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${activeSection === section.id
                                    ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Form Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto max-w-2xl">
                        {activeSection === "contact" && (
                            <>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your personal details</p>
                                <div className="mt-6">
                                    <ContactForm resumeId={resume.id} initialData={resume.contactInfo} />
                                </div>
                            </>
                        )}

                        {activeSection === "summary" && (
                            <>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Professional Summary</h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">A brief overview of your experience</p>
                                <div className="mt-6">
                                    <SummaryForm resumeId={resume.id} initialData={resume.summary} />
                                </div>
                            </>
                        )}

                        {activeSection === "experience" && (
                            <>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Work Experience</h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your employment history</p>
                                <div className="mt-6">
                                    <ExperienceForm resumeId={resume.id} experiences={resume.experiences} />
                                </div>
                            </>
                        )}

                        {activeSection === "education" && (
                            <>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your academic background</p>
                                <div className="mt-6">
                                    <EducationForm resumeId={resume.id} education={resume.education} />
                                </div>
                            </>
                        )}

                        {activeSection === "skills" && (
                            <>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your key abilities</p>
                                <div className="mt-6">
                                    <SkillsForm resumeId={resume.id} skills={resume.skills} />
                                </div>
                            </>
                        )}

                        {activeSection === "projects" && (
                            <>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your notable work</p>
                                <div className="mt-6">
                                    <ProjectsForm resumeId={resume.id} projects={resume.projects} />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Preview Area */}
                <div className="w-80 border-l border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-600">
                    <div className="aspect-[8.5/11] rounded-lg bg-white shadow-lg overflow-hidden">
                        <ResumePreview resume={resume} />
                    </div>
                </div>
            </div>
        </div>
    )
}