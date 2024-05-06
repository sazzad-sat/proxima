import { auth } from '@clerk/nextjs/server'
import AddTodo from '../../_components/AddTodo'
import TodoList from '../../_components/TodoList'
import db from '@/server/db'
import { project } from '@/server/db/schema'
import { and, eq } from 'drizzle-orm'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'

export default async function Project({ params }: { params: { id: string } }) {
  if (isNaN(+params.id)) throw new Error('Invalid project id')

  const { userId } = auth()

  const projectRes = await db
    .select({ name: project.name })
    .from(project)
    .where(and(eq(project.id, +params.id), eq(project.ownerId, userId!)))

  if (projectRes.length === 0) {
    return (
      <ProjectPageContainer>
        <h1 className="text-3xl font-bold text-neutral-500 mt-12 text-center">
          Project not found
        </h1>
      </ProjectPageContainer>
    )
  }

  return (
    <ProjectPageContainer>
      <PageHeader projectName={projectRes[0].name} />

      <AddTodo projectId={Number(params.id)} />

      <TodoList projectId={Number(params.id)} />
    </ProjectPageContainer>
  )
}

function ProjectPageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="container space-y-4 pt-8">
      <div className="mx-auto max-w-lg">{children}</div>
    </main>
  )
}

function PageHeader({ projectName }: { projectName: string }) {
  return (
    <div className="flex justify-between items-center my-4 mb-8 pb-2 border-b">
      <h1 className="text-3xl font-bold">{projectName}</h1>
      <Button className="gap-2 text-gray-600" variant={'ghost'}>
        <Users size={20} /> Share
      </Button>
    </div>
  )
}
