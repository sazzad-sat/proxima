import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

export default async function Inbox() {
  return (
    <main className="container space-y-4 pt-8">
      <div className="mx-auto max-w-lg">
        <AddTodo projectId={null} />

        <TodoList projectId={null} />
      </div>
    </main>
  )
}
