import { Inbox } from 'lucide-react'

type Props = { message: string }

export function EmptyState({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center text-white/80 p-8 gap-2">
      <Inbox className="w-8 h-8" />
      <p>{message}</p>
    </div>
  )
}
