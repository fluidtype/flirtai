import { useState, useRef, useEffect } from 'react'
import { TargetProfile, ChatMessage } from '@/types'
import { MessageBubble } from './MessageBubble'
import { FileDropzone } from './FileDropzone'
import { Send } from 'lucide-react'

interface Props {
  target: TargetProfile
  messages: ChatMessage[]
  onSend: (text: string, attachments: File[]) => void
  streaming: boolean
  apiStatus: 'ok' | 'no-key' | 'rate-limited'
}

export function ChatPanel({ target, messages, onSend, streaming, apiStatus }: Props) {
  const [text, setText] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col w-full max-w-[740px] mx-auto min-h-[calc(100vh-64px)]">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24 flex flex-col gap-4">
        {messages.map((m, i) => (
          <div
            key={m.id}
            className={`${m.role === 'user' ? 'flex justify-end' : 'flex justify-start'} my-1`}
          >
            <MessageBubble
              role={m.role as any}
              content={m.content}
              attachments={m.attachments}
              timestamp={m.ts}
              index={i}
            />
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {apiStatus !== 'ok' && (
        <div className="bg-white text-brand text-sm text-center py-2">
          {apiStatus === 'no-key' ? 'API key mancante' : 'Rate limit superato'}
        </div>
      )}
      <div className="sticky bottom-0 border-t border-black/35 px-6 pt-3 pb-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,#FF3350,#E50914,#C40811)] opacity-60" />
          <div className="flex items-end gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your message…"
              className="w-full bg-white text-brand placeholder-brand/60 rounded-xl px-4 py-3 resize-none outline-none"
              rows={3}
            />
            <button
              onClick={() => {
                onSend(text, files)
                setText('')
                setFiles([])
              }}
              disabled={streaming}
              className="bg-brand rounded-full p-3 text-white disabled:opacity-50 hover:scale-95 transition"
              aria-label="invia"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <FileDropzone onFiles={setFiles} accept="image/*" />
      </div>
    </div>
  )
}
