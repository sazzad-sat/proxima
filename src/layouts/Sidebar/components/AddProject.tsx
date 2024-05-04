'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import addProject from '../actions/addProject'
import { useRouter } from 'next/navigation'

export default function AddProject() {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  async function handleSubmit(formData: FormData) {
    await addProject(formData)

    router.refresh()

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="size-8" size={'icon'} variant={'ghost'}>
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="flex gap-2">
          <Input
            name="name"
            type="text"
            placeholder="Project name"
            autoFocus
            autoComplete="off"
          />

          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
