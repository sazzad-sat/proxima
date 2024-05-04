import AddTodo from './_comps/AddTodo'
import TodoList from './_comps/TodoList'

export default async function Home() {
  return (
    <main className="container space-y-4 pt-8">
      <div className="mx-auto max-w-lg">
        <AddTodo />

        <TodoList />
      </div>
    </main>
  )
}
