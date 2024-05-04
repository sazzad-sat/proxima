import db from '@/server/db'
import { todo } from '@/server/db/schema'
import { asc, eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { Accordion } from '@/components/ui/accordion'
import Todo from './Todo'

export default async function TodoList() {
  const { userId } = auth()

  const todos = await db
    .select({
      id: todo.id,
      text: todo.text,
      status: todo.status,
      images: todo.images,
    })
    .from(todo)
    .where(eq(todo.creatorId, userId!))
    .orderBy(asc(todo.id))

  return (
    <Accordion type="single" collapsible className="space-y-2">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} images={todo.images as any} />
      ))}
    </Accordion>
  )
}
