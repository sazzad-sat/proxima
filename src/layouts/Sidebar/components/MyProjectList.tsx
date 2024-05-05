'use client'

import AddProject from './AddProject'
import { Hash } from 'lucide-react'
import Project from './Project'
import { usePathname, useRouter } from 'next/navigation'
import Route from '@/configs/routes'

export default function MyProjectList({
  projects,
}: {
  projects: { id: number; name: string }[]
}) {
  const path = usePathname()
  const router = useRouter()

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between text-neutral-600 mb-2">
        <div className="font-medium">My Projects</div>

        <AddProject />
      </div>

      {projects.map(({ id, name }) => (
        <Project
          key={id}
          id={id}
          name={name}
          icon={<Hash size={16} />}
          active={path === Route.Projects + '/' + id}
          onClick={() => router.push(Route.Projects + '/' + id)}
        />
      ))}
    </div>
  )
}
