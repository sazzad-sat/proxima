import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import editProject from '../actions/editProject'
import { useProject } from '../contexts/project'
import { useRouter } from 'next/navigation'

export default function EditProject({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter()

  const { id, name } = useProject()

  async function handleSubmitAction(formData: FormData) {
    await editProject(formData)

    router.refresh()
    onSuccess?.()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Project</DialogTitle>
      </DialogHeader>

      <form action={handleSubmitAction} className="flex gap-2">
        <Input name="id" type="hidden" value={id} />

        <Input
          name="name"
          type="text"
          defaultValue={name}
          placeholder="Project name"
          autoFocus
          autoComplete="off"
        />

        <Button type="submit">Edit</Button>
      </form>
    </DialogContent>
  )
}
