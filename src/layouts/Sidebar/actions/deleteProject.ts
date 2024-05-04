'use server'

import db from '@/server/db'
import { project } from '@/server/db/schema'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export default async function deleteProject(formData: FormData) {
  const { userId } = auth()

  if (!userId) throw new Error('User not authenticated')

  const id = z.coerce.number().parse(formData.get('id'))

  await db
    .delete(project)
    .where(and(eq(project.id, id), eq(project.ownerId, userId)))
}
