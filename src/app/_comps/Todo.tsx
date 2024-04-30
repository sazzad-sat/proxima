import { Checkbox } from '@/components/ui/checkbox'

type Props = {
  id: number
  text: string
  status: string
}

export default function Todo(props: Props) {
  return (
    <div className="w-full p-4 flex gap-4 items-center rounded-lg bg-neutral-100 shadow cursor-default">
      <Checkbox />
      <span>{props.text}</span>
    </div>
  )
}
