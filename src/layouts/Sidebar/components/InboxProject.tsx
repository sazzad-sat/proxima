'use client'

import { Inbox } from 'lucide-react'
import Project from './Project'
import { usePathname, useRouter } from 'next/navigation'
import Route from '@/configs/routes'

export default function InboxProject() {
  const path = usePathname()
  const router = useRouter()

  const isActive = path === Route.Inbox

  return (
    <Project
      id={null}
      name={'Inbox'}
      icon={<Inbox size={16} />}
      active={isActive}
      onClick={() => router.push(Route.Inbox)}
    />
  )
}
