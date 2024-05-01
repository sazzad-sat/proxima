'use client'

import { addTodo } from '@/actions/todo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendHorizonal } from 'lucide-react'
import { useRef } from 'react'

export default function AddTodo() {
  const form = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={form}
      action={async (formData: FormData) => {
        await addTodo('/', formData)
        form.current?.reset()
      }}
      className="flex gap-2 p-2 bg-gray-200 rounded-lg shadow-md mb-6"
    >
      <Input name="text" type="text" placeholder="Task name" />

      <Button size={'icon'}>
        <SendHorizonal fill="white" size={20} />
      </Button>
    </form>
  )
}
