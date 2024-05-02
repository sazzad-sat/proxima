'use client'

import { addTodo } from '@/actions/todo'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Cross, Link, SendHorizonal, X } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

export default function AddTodo() {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button variant={'ghost'} className="h-auto p-2" asChild>
          <div className="flex gap-2 p-2 bg-gray-200 rounded-lg shadow-md mb-6 cursor-pointer">
            <Input
              readOnly
              className="cursor-pointer"
              onFocus={(e) => e.currentTarget.blur()}
              type="text"
              placeholder="Task name"
            />

            <Button size={'icon'}>
              <SendHorizonal fill="white" size={20} />
            </Button>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddTodoDialog />
      </DialogContent>
    </Dialog>
  )
}

export function AddTodoDialog() {
  const form = useRef<HTMLFormElement>(null)
  const imgInput = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileList | null>(null)

  function removeFile(index: number) {
    if (!files) return

    const fileBuffer = new DataTransfer()

    for (let i = 0; i < files.length; i++) {
      if (i === index) continue
      fileBuffer.items.add(files[i])
    }

    imgInput.current!.files = fileBuffer.files
    setFiles(fileBuffer.files)
  }

  return (
    <form
      ref={form}
      action={async (formData: FormData) => {
        await addTodo('/', formData)
        form.current?.reset()
      }}
      className="pt-4 flex flex-col gap-4"
    >
      <Input
        name="text"
        type="text"
        placeholder="Task name"
        autoFocus
        autoComplete="off"
      />

      <div className="flex justify-between">
        <input
          ref={imgInput}
          className="hidden"
          type="file"
          name="images"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => e.target.files && setFiles(e.target.files)}
          multiple
        />

        <Button
          size={'icon'}
          variant={'ghost'}
          className="size-8"
          onClick={() => imgInput.current?.click()}
        >
          <Link size={16} />
        </Button>

        <Button type="submit" className="self-end" size={'icon'}>
          <SendHorizonal fill="white" size={20} />
        </Button>
      </div>

      <div>
        {files && (
          <div className="flex gap-4">
            {Array.from(files).map((file, i) => (
              <div
                key={i}
                className="relative rounded-lg bg-gray-300 shadow shadow-black/25"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt="image"
                  className="object-contain size-24 rounded-lg"
                  width={100}
                  height={100}
                />
                <Button
                  className="absolute -top-2 -right-2 size-5 rounded-full shadow shadow-black/50"
                  variant={'secondary'}
                  size={'icon'}
                  onClick={() => removeFile(i)}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  )
}
