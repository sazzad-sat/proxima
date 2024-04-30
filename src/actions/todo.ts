'use server'

import db from '@/db'
import { todo } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function addTodo(path: string, formData: FormData) {
  const todoData = z.object({
    text: z.string().min(1),
  })

  const todoParsed = todoData.parse({
    text: formData.get('text'),
  })

  await db.insert(todo).values(todoParsed)

  if (path) revalidatePath(path)
}
