import { Hash } from 'lucide-react'
import db from '@/server/db'
import { project } from '@/server/db/schema'
import { asc, eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import Project from './Project'
import AddProject from './AddProject'

export default async function MyProjectList() {
  const { userId } = auth()

  if (!userId) throw new Error('User not authenticated')

  const projects = await db
    .select()
    .from(project)
    .where(eq(project.ownerId, userId))
    .orderBy(asc(project.id))

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between text-neutral-600 mb-2">
        <div className="font-medium">My Projects</div>

        <AddProject />
      </div>

      {projects.map((project) => (
        <Project
          key={project.id}
          id={project.id}
          name={project.name}
          icon={<Hash size={16} />}
        />
      ))}
    </div>
  )
}
