import { Attachment } from '@/types'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type Props = {
  role: 'user' | 'assistant'
  content: string
  attachments?: Attachment[]
  timestamp: number
  index?: number
}

export function MessageBubble({ role, content, attachments, timestamp, index = 0 }: Props) {
  return (
    <div className="flex flex-col max-w-[90%] md:max-w-[75%]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
        className={cn(
          'rounded-xl px-3 py-2',
          role === 'assistant'
            ? 'bg-[#E50914] text-white shadow-[0_2px_6px_rgba(0,0,0,0.5)]'
            : 'bg-transparent text-[#E50914] border border-[#E50914]/80'
        )}
        aria-label={role}
      >
        <p className="whitespace-pre-wrap text-[15px] leading-[22px] max-w-[72ch]">{content}</p>
        {attachments &&
          attachments.map((a) => (
            <img key={a.url} src={a.url} alt={a.name} className="mt-2 rounded" />
          ))}
      </motion.div>
      <span className="mt-1 text-[10px] text-white/50">
        {new Date(timestamp).toLocaleTimeString()}
      </span>
    </div>
  )
}
