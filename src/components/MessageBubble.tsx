import { Attachment } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
  role: 'user' | 'assistant'
  content: string
  attachments?: Attachment[]
  timestamp: number
}

export function MessageBubble({ role, content, attachments, timestamp }: Props) {
  return (
    <div className={cn('max-w-[80%] rounded-2xl px-4 py-2 shadow', role === 'assistant' ? 'bg-white text-brand' : 'border border-white')}
      aria-label={role}
    >
      <p className="whitespace-pre-wrap text-sm">{content}</p>
      {attachments && attachments.map((a) => (
        <img key={a.url} src={a.url} alt={a.name} className="mt-2 rounded" />
      ))}
      <span className="block text-[10px] opacity-60 mt-1 text-right">
        {new Date(timestamp).toLocaleTimeString()}
      </span>
    </div>
  )
}
