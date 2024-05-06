import { InboxIcon } from 'lucide-react'
import AddTodo from '../_components/AddTodo'
import TodoList from '../_components/TodoList'

export default async function Inbox() {
  return (
    <main className="container space-y-4 pt-8">
      <div className="mx-auto max-w-lg">
        <PageHeader />

        <AddTodo projectId={null} />

        <TodoList projectId={null} />
      </div>
    </main>
  )
}

function PageHeader() {
  return (
    <h1 className="text-3xl font-bold my-4">
      <InboxIcon className="inline mr-2 mb-0.5" size={28} /> Inbox
    </h1>
  )
}
