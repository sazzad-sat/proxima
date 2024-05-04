'use server'

import { z } from 'zod'
import { auth } from '@clerk/nextjs/server'
import db from '@/server/db'
import { project } from '@/server/db/schema'
import { and, eq } from 'drizzle-orm'

const editProjectSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1).optional(),
})

export default async function editProject(formData: FormData) {
  const { userId } = auth()

  if (!userId) throw new Error('User not authenticated')

  const { id, ...data } = editProjectSchema.parse(Object.fromEntries(formData))

  await db
    .update(project)
    .set(data)
    .where(and(eq(project.id, id), eq(project.ownerId, userId)))
}
