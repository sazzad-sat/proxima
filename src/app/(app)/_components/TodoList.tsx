import db from '@/server/db'
import { todo } from '@/server/db/schema'
import { and, asc, eq, isNull } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { Accordion } from '@/components/ui/accordion'
import Todo from './Todo'

export default async function TodoList({
  projectId,
}: {
  projectId: number | null
}) {
  const { userId } = auth()

  const todos = await db
    .select({
      id: todo.id,
      text: todo.text,
      status: todo.status,
      images: todo.images,
    })
    .from(todo)
    .where(
      and(
        projectId ? eq(todo.projectId, projectId) : isNull(todo.projectId),
        eq(todo.creatorId, userId!)
      )
    )
    .orderBy(asc(todo.id))

  const noTodos = todos.length === 0

  if (noTodos)
    return (
      <div className="w-full mt-4 p-4 bg-neutral-200 rounded-lg">
        <p className="text-center text-neutral-400 text-sm">
          No task on this project
        </p>
      </div>
    )

  return (
    <Accordion type="single" collapsible className="space-y-2">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} images={todo.images as any} />
      ))}
    </Accordion>
  )
}
