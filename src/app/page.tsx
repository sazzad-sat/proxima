import db from '@/db'
import { todo } from '@/db/schema'
import Todo from './_comps/Todo'
import AddTodo from './_comps/AddTodo'
import { asc, eq } from 'drizzle-orm'
import { Accordion } from '@/components/ui/accordion'
import Sidebar from './_comps/Sidebar'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
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
    <div className="min-h-screen grid grid-cols-[auto_1fr]">
      <Sidebar />

      <main className="container space-y-4 pt-8">
        <div className="mx-auto max-w-lg">
          <AddTodo />

          <Accordion type="single" collapsible className="space-y-2">
            {todos.map((todo) => (
              <Todo key={todo.id} {...todo} images={todo.images as any} />
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  )
}
