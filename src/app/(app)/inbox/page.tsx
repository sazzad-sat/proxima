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
    <div className="flex justify-between items-center my-4 mb-8 pb-2 border-b">
      <h1 className="text-3xl font-bold">
        <InboxIcon className="inline mr-2 mb-0.5" size={28} /> Inbox
      </h1>
    </div>
  )
}
