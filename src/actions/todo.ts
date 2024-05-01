'use server'

import db from '@/db'
import { todo } from '@/db/schema'
import utApi from '@/server/uploadthing'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const addTodoSchema = z.object({
  text: z.string().min(1),
  images: z.array(z.any()).max(5),
})

export async function addTodo(path: string, formData: FormData) {
  const todoParsed = addTodoSchema.parse({
    text: formData.get('text'),
    images: formData.getAll('images'),
  })

  const imageResponse = await utApi.uploadFiles(todoParsed.images)

  const imageUrls = imageResponse.map((image) => {
    if (image.error) throw image.error
    return { key: image.data.key, url: image.data.url }
  })

  await db.insert(todo).values({ text: todoParsed.text, images: imageUrls })

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

  const todos = await db
    .select({ images: todo.images })
    .from(todo)
    .where(eq(todo.id, id))

  if (!todos[0]) throw new Error('Todo not found')

  const imageKeys = (todos[0].images as any[])?.map((img) => img.key)

  const imageResponse = await utApi.deleteFiles(imageKeys)
  if (!imageResponse.success) throw new Error("Couldn't delete images")

  await db.delete(todo).where(eq(todo.id, id))

  if (path) revalidatePath(path)
}
