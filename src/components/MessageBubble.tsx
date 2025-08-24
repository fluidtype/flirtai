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
    <div
      className={cn(
        'rounded-lg px-4 py-2 max-w-[90%] md:max-w-[75%] border border-brand',
        role === 'assistant'
          ? 'bg-[#0F0A0A] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]'
          : 'text-brand'
      )}
      aria-label={role}
    >
      {role === 'assistant' && (
        <div className="text-secondary text-xs mb-1">assistant@flirtai</div>
      )}
      <p className="whitespace-pre-wrap text-sm">
        {role === 'user' ? `> ${content}` : content}
      </p>
      {attachments &&
        attachments.map((a) => (
          <img key={a.url} src={a.url} alt={a.name} className="mt-2 rounded" />
        ))}
      <span className="block text-[10px] text-secondary mt-1 text-right">
        {new Date(timestamp).toLocaleTimeString()}
      </span>
    </div>
  )
}
