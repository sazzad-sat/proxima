'use server'

import db from '@/server/db'
import { todo } from '@/server/db/schema'
import utApi from '@/server/uploadthing'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const addTodoSchema = z.object({
  text: z.string().min(1),
  images: z.array(z.any()).max(5),
  projectId: z.coerce.number().nullable(),
})

export async function addTodo(path: string, formData: FormData) {
  const { userId } = auth()

  if (!userId) throw new Error('User not authenticated')

  const todoParsed = addTodoSchema.parse({
    text: formData.get('text'),
    images: formData.getAll('images'),
    projectId: formData.get('projectId'),
  })

  const validImages = todoParsed.images.filter((image) => image.size !== 0)

  const imageResponse =
    validImages.length === 0 ? [] : await utApi.uploadFiles(todoParsed.images)

  const imageUrls = imageResponse.map((image) => {
    if (image.error) throw image.error
    return { key: image.data.key, url: image.data.url }
  })

  await db.insert(todo).values({
    text: todoParsed.text,
    images: imageUrls,
    creatorId: userId,
    projectId: todoParsed.projectId,
  })

  if (path) revalidatePath(path)
}

export async function updateTodoStatus(
  path: string,
  { id, status }: { id: number; status: typeof todo.$inferSelect.status }
) {
  const { userId } = auth()

  if (!userId) throw new Error('User not authenticated')

  const todoResponse = await db
    .select({ creatorId: todo.creatorId })
    .from(todo)
    .where(eq(todo.id, id))

  if (!todoResponse[0]) throw new Error('Todo not found')

  if (todoResponse[0].creatorId !== userId)
    throw new Error('User not authorized')

  await db.update(todo).set({ status }).where(eq(todo.id, id))

  if (path) revalidatePath(path)
}

export async function deleteTodo(path: string, formData: FormData) {
  const { userId } = auth()

  if (!userId) throw new Error('User not authenticated')

  const id = z.number().parse(Number(formData.get('id')))

  const todos = await db
    .select({ images: todo.images, creatorId: todo.creatorId })
    .from(todo)
    .where(eq(todo.id, id))

  if (!todos[0]) throw new Error('Todo not found')

  if (todos[0].creatorId !== userId) throw new Error('User not authorized')

  const imageKeys = (todos[0].images as any[])?.map((img) => img.key)

  const imageResponse = await utApi.deleteFiles(imageKeys)
  if (!imageResponse.success) throw new Error("Couldn't delete images")

  await db.delete(todo).where(eq(todo.id, id))

  if (path) revalidatePath(path)
}
