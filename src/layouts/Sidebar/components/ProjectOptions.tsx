import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '../../../components/ui/button'
import EditProject from './EditProject'
import DeleteProject from './DeleteProject'

export default function ProjectOptions() {
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  function closeDialog() {
    setDialogOpen(false)
  }

  const editDialog = <EditProject onSuccess={closeDialog} />
  const deleteDialog = <DeleteProject onSuccess={closeDialog} />

  const [currentDialog, setCurrentDialog] = useState<ReactNode>(editDialog)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownButtonMore open={open} />

        <DropdownMenuContent>
          <DialogTrigger asChild onClick={() => setCurrentDialog(editDialog)}>
            <DropdownMenuItem>
              <Edit className="size-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={() => setCurrentDialog(deleteDialog)}>
            <DropdownMenuItem className="text-red-500 hover:text-red-600">
              <Trash className="size-4 mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      {currentDialog}
    </Dialog>
  )
}

function DropdownButtonMore({ open }: { open: boolean }) {
  return (
    <DropdownMenuTrigger asChild>
      <Button
        className={cn(
          'hover:bg-transparent group-hover:opacity-100 focus-visible:opacity-100',
          open ? 'opacity-100' : 'opacity-0'
        )}
        variant={'ghost'}
        size={'icon'}
      >
        <MoreHorizontal size={16} />
      </Button>
    </DropdownMenuTrigger>
  )
}
