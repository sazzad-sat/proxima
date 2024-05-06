import { UserButton, SignedIn } from '@clerk/nextjs'
import Logo from '@/components/brand/Logo'
import MyProjectList from './components/MyProjectList'
import InboxProject from './components/InboxProject'
import db from '@/server/db'
import { project } from '@/server/db/schema'
import { asc, eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import Route from '@/configs/routes'

export default function Sidebar() {
  return (
    <aside className="max-w-sm w-screen bg-neutral-200">
      <SiderbarHeader />

      <SidebarContent />
    </aside>
  )
}

function SiderbarHeader() {
  return (
    <div className="w-full flex justify-between p-4 mb-4">
      <Logo />

      <SignedIn>
        <UserButton
          afterSwitchSessionUrl={Route.Inbox}
          appearance={{
            elements: {
              userButtonAvatarBox: {
                height: '2rem',
                width: '2rem',
              },
            },
          }}
        />
      </SignedIn>
    </div>
  )
}

async function SidebarContent() {
  const { userId } = auth()

  if (!userId) throw new Error('User not authenticated')

  const projects = await db
    .select()
    .from(project)
    .where(eq(project.ownerId, userId))
    .orderBy(asc(project.id))

  return (
    <div className="px-4 flex flex-col gap-4">
      <InboxProject />

      <MyProjectList projects={projects} />
    </div>
  )
}
