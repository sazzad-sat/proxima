'use client'

import { Button } from '@/components/ui/button'
import ProjectOptions from './ProjectOptions'
import { cn } from '@/lib/utils'
import { ProjectProvider } from '../contexts/project'

type ProjectProps = {
  id: number | null
  name: string
  active?: boolean
  className?: string
  icon?: React.ReactNode
  onClick?: () => void
}

export default function Project(props: ProjectProps) {
  const { id, name, className, icon, active, onClick } = props

  return (
    <ProjectProvider value={{ id, name }}>
      <div
        className={cn(
          'group flex hover:bg-slate-100 rounded-lg',
          active && 'bg-slate-100'
        )}
      >
        <Button
          className={cn(
            'gap-4 justify-start px-2 text-base font-normal w-full hover:bg-transparent',
            className
          )}
          variant={'ghost'}
          onClick={onClick}
        >
          {icon} {name}
        </Button>

        {id && <ProjectOptions />}
      </div>
    </ProjectProvider>
  )
}
