import db from '@/db'
import { todo } from '@/db/schema'
import Todo from './_comps/Todo'
import AddTodo from './_comps/AddTodo'

export default async function Home() {
  const todos = await db
    .select({
      id: todo.id,
      text: todo.text,
      status: todo.status,
    })
    .from(todo)

  return (
    <main className="container space-y-4 pt-8">
      <div className="mx-auto max-w-lg space-y-2">
        <AddTodo />

        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </main>
  )
}
