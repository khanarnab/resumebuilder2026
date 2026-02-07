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