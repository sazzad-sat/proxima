import { createContext, useContext } from 'react'

const ProjectContext = createContext<{
  id: number | null
  name: string
} | null>(null)

export const ProjectProvider = ProjectContext.Provider

export function useProject() {
  const project = useContext(ProjectContext)

  if (!project || !project.id) {
    throw new Error('Project not found')
  }

  return { ...project, id: project.id! }
}
