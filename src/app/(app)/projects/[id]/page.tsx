import AddTodo from '../../_components/AddTodo'
import TodoList from '../../_components/TodoList'

export default async function Project({ params }: { params: { id: string } }) {
  if (isNaN(+params.id)) throw new Error('Invalid project id')

  return (
    <main className="container space-y-4 pt-8">
      <div className="mx-auto max-w-lg">
        <AddTodo projectId={Number(params.id)} />

        <TodoList projectId={Number(params.id)} />
      </div>
    </main>
  )
}
