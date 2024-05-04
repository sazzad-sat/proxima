import { UserButton, SignedIn } from '@clerk/nextjs'
import Logo from '@/components/brand/Logo'
import { Inbox } from 'lucide-react'
import Project from './components/Project'
import MyProjectList from './components/MyProjectList'

export default async function Sidebar() {
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

function SidebarContent() {
  return (
    <div className="px-4 flex flex-col gap-4">
      <Project id={null} name="Inbox" icon={<Inbox size={16} />} />

      <MyProjectList />
    </div>
  )
}
