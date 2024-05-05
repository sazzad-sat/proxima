'use client'

import { deleteTodo, updateTodoStatus } from '@/actions/todo'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { todo } from '@/server/db/schema'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  id: number
  text: string
  status: StatusEnum
  images: { key: string; url: string }[]
}

type StatusEnum = typeof todo.$inferSelect.status

export default function Todo(props: Props) {
  return (
    <AccordionItem
      value={props.id.toString()}
      className="w-full px-4 flex gap-4 items-start rounded-lg bg-neutral-100 shadow cursor-default"
    >
      <TodoCheckbox {...props} />

      <div className="w-full h-full">
        <AccordionTrigger className="flex gap-2 items-center py-4 hover:no-underline">
          <div
            className={cn(
              'flex gap-2 items-center',
              props.status === 'done' &&
                'line-through hover:line-through text-neutral-600'
            )}
          >
            {props.text}

            {props.status === 'in-progress' && (
              <div className="size-2 rounded-full bg-blue-500" />
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-4">
          <TodoOptions {...props} />

          <TodoImages {...props} />
        </AccordionContent>
      </div>
    </AccordionItem>
  )
}

function TodoCheckbox({ id, status }: Props) {
  async function onCheckedChange(checked: boolean) {
    await updateTodoStatus('/', {
      id: id,
      status: checked ? 'done' : 'pending',
    })
  }

  return (
    <Checkbox
      checked={status === 'done'}
      className="mt-5"
      onCheckedChange={onCheckedChange}
    />
  )
}

function TodoOptions(props: Props) {
  return (
    <div className="flex justify-between items-center">
      <UpdateStatus {...props} />

      <DeleteTodo {...props} />
    </div>
  )
}

function TodoImages(props: Props) {
  if (!(props.images instanceof Array)) return

  return (
    <div className="flex gap-4">
      {props.images.map((image) => (
        <div
          key={image.key}
          className="rounded-lg bg-gray-300 shadow shadow-black/25"
        >
          <Image
            src={image.url}
            alt="image"
            className="object-contain size-24 rounded-lg"
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  )
}

function UpdateStatus({ id, status }: Props) {
  const statuses: StatusEnum[] = ['pending', 'in-progress', 'done']

  const [statusVal, setStatusVal] = useState(status)

  useEffect(() => {
    setStatusVal(status)
  }, [status])

  function getStatusStyle(sts: StatusEnum) {
    if (sts === 'pending') return 'bg-red-200 hover:bg-red-300'
    if (sts === 'in-progress') return 'bg-blue-200 hover:bg-blue-300'
    if (sts === 'done') return 'bg-green-200 hover:bg-green-300'
  }

  function onStatusClick(sts: StatusEnum) {
    setStatusVal(sts)
    updateTodoStatus('/', { id, status: sts })
  }

  return (
    <div className="divide-x divide-neutral-400/60 rounded-lg overflow-clip">
      {statuses.map((sts) => (
        <Button
          key={sts}
          className={cn(
            'h-7 px-1.5 bg-neutral-200 hover:bg-neutral-300 capitalize rounded-none',
            sts === statusVal && getStatusStyle(sts)
          )}
          size={'sm'}
          variant={'secondary'}
          onClick={() => onStatusClick(sts)}
        >
          {sts.replace('-', ' ')}
        </Button>
      ))}
    </div>
  )
}

function DeleteTodo({ id }: Props) {
  return (
    <form action={deleteTodo.bind(null, '/')}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        className={'h-7 text-red-500 hover:text-red-600'}
        size={'sm'}
        variant={'outline'}
      >
        Delete
      </Button>
    </form>
  )
}
