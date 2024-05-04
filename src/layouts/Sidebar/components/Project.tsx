'use client'

import { Button } from '@/components/ui/button'
import ProjectOptions from './ProjectOptions'
import { cn } from '@/lib/utils'
import { ProjectProvider } from '../contexts/project'

type ProjectProps = {
  id: number | null
  name: string
  className?: string
  icon?: React.ReactNode
}

export default function Project(props: ProjectProps) {
  const { id, name, className, icon } = props

  return (
    <ProjectProvider value={{ id, name }}>
      <div className="group flex hover:bg-slate-100 rounded-lg">
        <Button
          className={cn(
            'gap-4 justify-start px-2 text-base font-normal w-full hover:bg-transparent',
            className
          )}
          variant={'ghost'}
        >
          {icon} {name}
        </Button>

        {id && <ProjectOptions />}
      </div>
    </ProjectProvider>
  )
}
