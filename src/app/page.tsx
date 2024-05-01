import db from '@/db'
import { todo } from '@/db/schema'
import Todo from './_comps/Todo'
import AddTodo from './_comps/AddTodo'
import { asc } from 'drizzle-orm'
import { Accordion } from '@/components/ui/accordion'

export default async function Home() {
  const todos = await db
    .select({
      id: todo.id,
      text: todo.text,
      status: todo.status,
    })
    .from(todo)
    .orderBy(asc(todo.id))

  return (
    <main className="container space-y-4 pt-8">
      <div className="mx-auto max-w-lg">
        <AddTodo />

        <Accordion type="single" collapsible className="space-y-2">
          {todos.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </Accordion>
      </div>
    </main>
  )
}
