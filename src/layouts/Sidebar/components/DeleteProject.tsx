import deleteProject from '../actions/deleteProject'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { useProject } from '../contexts/project'

export default function DeleteProject(props: { onSuccess?: () => void }) {
  const router = useRouter()

  const { id } = useProject()

  const { onSuccess } = props

  async function handleSubmit(formData: FormData) {
    await deleteProject(formData)

    router.refresh()
    onSuccess?.()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you Sure?</DialogTitle>
        <DialogDescription>You cannot undo this action.</DialogDescription>
      </DialogHeader>

      <form action={handleSubmit} className="flex gap-2 justify-end">
        <Input name="id" type="hidden" value={id} />

        <DialogClose>
          <Button variant={'outline'}>Cancel</Button>
        </DialogClose>
        <Button variant={'destructive'} type="submit">
          Delete
        </Button>
      </form>
    </DialogContent>
  )
}
