import Route from '@/configs/routes'
import db from '@/server/db'
import { project } from '@/server/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { RedirectType, redirect } from 'next/navigation'

export default async function Projects() {
  const { userId } = auth()

  const projects = await db
    .selectDistinct({ id: project.id })
    .from(project)
    .where(eq(project.ownerId, userId!))

  if (projects.length === 0) redirect(Route.Inbox, RedirectType.replace)

  redirect(Route.Projects + '/' + projects[0].id, RedirectType.replace)
}
