'use server'

import db from '@/db'
import { todo } from '@/db/schema'
import { eq } from 'drizzle-orm'
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

export async function updateTodoStatus(
  path: string,
  { id, status }: { id: number; status: typeof todo.$inferSelect.status }
) {
  await db.update(todo).set({ status }).where(eq(todo.id, id))

  if (path) revalidatePath(path)
}

export async function deleteTodo(path: string, formData: FormData) {
  const schema = z.object({
    id: z.number(),
  })

  const { id } = schema.parse({
    id: Number(formData.get('id')),
  })

  await db.delete(todo).where(eq(todo.id, id))

  if (path) revalidatePath(path)
}
