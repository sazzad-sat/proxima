'use server'

import db from '@/server/db'
import { project } from '@/server/db/schema'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

export default async function addProject(formData: FormData) {
  const { userId } = auth()

  if (!userId) throw new Error('User not authenticated')

  const name = z.string().min(1).parse(formData.get('name'))

  await db.insert(project).values({ name, ownerId: userId })
}
