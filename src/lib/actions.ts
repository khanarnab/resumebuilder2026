"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function createResume() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/api/auth/signin")
  }

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: "Untitled Resume",
      contactInfo: {
        create: {},
      },
    },
  })

  redirect(`/editor/${resume.id}`)
}

export async function getResumes() {
  const session = await auth()

  if (!session?.user?.id) {
    return []
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      updatedAt: true,
    },
  })

  return resumes
}

export async function deleteResume(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  await prisma.resume.delete({
    where: {
      id,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")

  return { success: true }
}

export async function getResume(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      contactInfo: true,
      summary: true,
      experiences: { orderBy: { sortOrder: "asc" } },
      education: { orderBy: { sortOrder: "asc" } },
      skills: { orderBy: { sortOrder: "asc" } },
      projects: { orderBy: { sortOrder: "asc" } },
    },
  })

  return resume
}

export async function updateContactInfo(
  resumeId: string,
  data: {
    fullName?: string
    email?: string
    phone?: string
    location?: string
    linkedin?: string
    github?: string
    website?: string
  }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  // Verify ownership
  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  await prisma.contactInfo.upsert({
    where: { resumeId },
    update: data,
    create: { resumeId, ...data },
  })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function updateSummary(resumeId: string, content: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  await prisma.summary.upsert({
    where: { resumeId },
    update: { content },
    create: { resumeId, content },
  })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function addExperience(resumeId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  const count = await prisma.experience.count({ where: { resumeId } })

  await prisma.experience.create({
    data: {
      resumeId,
      company: "",
      position: "",
      sortOrder: count,
    },
  })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function updateExperience(
  id: string,
  resumeId: string,
  data: {
    company?: string
    position?: string
    location?: string
    startDate?: string
    endDate?: string
    current?: boolean
    description?: string
  }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  await prisma.experience.update({
    where: { id },
    data: {
      company: data.company,
      position: data.position,
      location: data.location,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      current: data.current,
      description: data.description,
    },
  })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function deleteExperience(id: string, resumeId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  await prisma.experience.delete({ where: { id } })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function addEducation(resumeId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  const count = await prisma.education.count({ where: { resumeId } })

  await prisma.education.create({
    data: {
      resumeId,
      institution: "",
      degree: "",
      sortOrder: count,
    },
  })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function updateEducation(
  id: string,
  resumeId: string,
  data: {
    institution?: string
    degree?: string
    field?: string
    startDate?: string
    endDate?: string
    current?: boolean
    description?: string
  }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  await prisma.education.update({
    where: { id },
    data: {
      institution: data.institution,
      degree: data.degree,
      field: data.field,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      current: data.current,
      description: data.description,
    },
  })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function deleteEducation(id: string, resumeId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  await prisma.education.delete({ where: { id } })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function addSkill(resumeId: string, name: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  const count = await prisma.skill.count({ where: { resumeId } })

  await prisma.skill.create({
    data: {
      resumeId,
      name,
      sortOrder: count,
    },
  })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function deleteSkill(id: string, resumeId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  await prisma.skill.delete({ where: { id } })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function addProject(resumeId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  const count = await prisma.project.count({ where: { resumeId } })

  await prisma.project.create({
    data: {
      resumeId,
      name: "",
      sortOrder: count,
    },
  })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function updateProject(
  id: string,
  resumeId: string,
  data: {
    name?: string
    url?: string
    description?: string
  }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  await prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      url: data.url,
      description: data.description,
    },
  })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function deleteProject(id: string, resumeId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  })

  if (!resume) {
    return { error: "Not found" }
  }

  await prisma.project.delete({ where: { id } })

  revalidatePath(`/editor/${resumeId}`)

  return { success: true }
}

export async function updateResumeTitle(id: string, title: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  await prisma.resume.update({
    where: { id, userId: session.user.id },
    data: { title },
  })

  revalidatePath(`/editor/${id}`)
  revalidatePath("/dashboard")

  return { success: true }
}

export async function duplicateResume(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const original = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
    include: {
      contactInfo: true,
      summary: true,
      experiences: true,
      education: true,
      skills: true,
      projects: true,
    },
  })

  if (!original) {
    return { error: "Not found" }
  }

  // Find existing copies to determine the next number
  const baseTitle = original.title.replace(/ \(Copy( \d+)?\)$/, "")
  const existingCopies = await prisma.resume.findMany({
    where: {
      userId: session.user.id,
      title: {
        startsWith: baseTitle,
      },
    },
    select: { title: true },
  })

  // Find the highest copy number
  let maxNumber = 0
  const copyPattern = new RegExp(`^${baseTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\(Copy( (\\d+))?\\)$`)

  for (const resume of existingCopies) {
    const match = resume.title.match(copyPattern)
    if (match) {
      const num = match[2] ? parseInt(match[2]) : 1
      maxNumber = Math.max(maxNumber, num)
    }
  }

  const newTitle = maxNumber === 0
    ? `${baseTitle} (Copy)`
    : `${baseTitle} (Copy ${maxNumber + 1})`

  const duplicate = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: newTitle,
      contactInfo: original.contactInfo
        ? {
          create: {
            fullName: original.contactInfo.fullName,
            email: original.contactInfo.email,
            phone: original.contactInfo.phone,
            location: original.contactInfo.location,
            linkedin: original.contactInfo.linkedin,
            github: original.contactInfo.github,
            website: original.contactInfo.website,
          },
        }
        : undefined,
      summary: original.summary
        ? {
          create: {
            content: original.summary.content,
          },
        }
        : undefined,
      experiences: {
        create: original.experiences.map((exp) => ({
          company: exp.company,
          position: exp.position,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current,
          description: exp.description,
          sortOrder: exp.sortOrder,
        })),
      },
      education: {
        create: original.education.map((edu) => ({
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field,
          startDate: edu.startDate,
          endDate: edu.endDate,
          current: edu.current,
          description: edu.description,
          sortOrder: edu.sortOrder,
        })),
      },
      skills: {
        create: original.skills.map((skill) => ({
          name: skill.name,
          sortOrder: skill.sortOrder,
        })),
      },
      projects: {
        create: original.projects.map((project) => ({
          name: project.name,
          url: project.url,
          description: project.description,
          sortOrder: project.sortOrder,
        })),
      },
    },
  })

  revalidatePath("/dashboard")

  return { success: true, id: duplicate.id }
}