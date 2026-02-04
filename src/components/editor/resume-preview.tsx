interface ResumePreviewProps {
  resume: {
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

function formatDate(date: Date | null | undefined): string {
  if (!date) return ""
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const { contactInfo, summary, experiences, education, skills, projects } = resume

  return (
    <div className="h-full overflow-y-auto bg-white p-6 text-[10px] leading-tight">
      {/* Header / Contact */}
      <div className="text-center border-b border-gray-200 pb-3 mb-3">
        <h1 className="text-lg font-bold text-gray-900">
          {contactInfo?.fullName || "Your Name"}
        </h1>
        <div className="mt-1 flex flex-wrap justify-center gap-x-2 text-gray-600">
          {contactInfo?.email && <span>{contactInfo.email}</span>}
          {contactInfo?.phone && <span>• {contactInfo.phone}</span>}
          {contactInfo?.location && <span>• {contactInfo.location}</span>}
        </div>
        <div className="mt-1 flex flex-wrap justify-center gap-x-2 text-gray-500">
          {contactInfo?.linkedin && <span>LinkedIn</span>}
          {contactInfo?.github && <span>GitHub</span>}
          {contactInfo?.website && <span>Website</span>}
        </div>
      </div>

      {/* Summary */}
      {summary?.content && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase text-gray-700 mb-1">Summary</h2>
          <p className="text-gray-600">{summary.content}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase text-gray-700 mb-1">Experience</h2>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <span className="font-semibold">{exp.position || "Position"}</span>
                <span className="text-gray-500">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <div className="text-gray-600">
                {exp.company}{exp.location && `, ${exp.location}`}
              </div>
              {exp.description && (
                <p className="mt-1 text-gray-600">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase text-gray-700 mb-1">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <span className="font-semibold">
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                </span>
                <span className="text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <div className="text-gray-600">{edu.institution}</div>
              {edu.description && (
                <p className="mt-1 text-gray-600">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase text-gray-700 mb-1">Skills</h2>
          <p className="text-gray-600">{skills.map(s => s.name).join(", ")}</p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-3">
          <h2 className="text-xs font-bold uppercase text-gray-700 mb-1">Projects</h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-2">
              <span className="font-semibold">{project.name || "Project"}</span>
              {project.url && (
                <span className="text-gray-500 ml-1">({project.url})</span>
              )}
              {project.description && (
                <p className="mt-1 text-gray-600">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}