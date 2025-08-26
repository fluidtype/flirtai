import { useState, useRef, useEffect } from 'react'
import { TargetProfile, ChatMessage } from '@/types'
import { MessageBubble } from './MessageBubble'
import { Send, Paperclip } from 'lucide-react'

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
  const fileRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col w-full max-w-[780px] mx-auto">
      <div className="flex-1 px-4 md:px-6 pt-4 pb-24 flex flex-col gap-4 h-[calc(100vh-64px-92px-16px)] overflow-y-auto">
        {messages.length === 0 && (
          <p className="max-w-[520px] mx-auto text-white/70 text-center">Start your first conversation</p>
        )}
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
      <div className="sticky bottom-0 w-full px-4 md:px-6 pb-4">
        <div className="max-w-[780px] mx-auto">
          <div className="flex items-center gap-2 rounded-xl bg-[#0B0B0B]/95 text-[#E50914] px-4 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-[#E50914]">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const f = e.target.files ? Array.from(e.target.files) : []
                setFiles(f)
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              title="Upload file"
              className="w-8 h-8 rounded-full bg-[#E50914] text-white flex items-center justify-center hover:bg-white/10 transition"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your message…"
              className="flex-1 bg-transparent placeholder-[#E50914]/60 text-[#E50914] resize-none outline-none"
              rows={1}
            />
            <button
              onClick={() => {
                onSend(text, files)
                setText('')
                setFiles([])
              }}
              disabled={streaming}
              className="w-8 h-8 rounded-full bg-[#E50914] text-white flex items-center justify-center hover:bg-white/10 transition focus:ring-2 focus:ring-[#E50914] disabled:opacity-50"
              aria-label="invia"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
