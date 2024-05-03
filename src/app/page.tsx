import AddTodo from './_comps/AddTodo'
import Sidebar from './_comps/Sidebar'
import TodoList from './_comps/TodoList'

export default async function Home() {
  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr]">
      <Sidebar />

      <main className="container space-y-4 pt-8">
        <div className="mx-auto max-w-lg">
          <AddTodo />

          <TodoList />
        </div>
      </main>
    </div>
  )
}
