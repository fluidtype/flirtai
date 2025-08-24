import { useState, useRef, useEffect } from 'react'
import { TargetProfile, ChatMessage } from '@/types'
import { MessageBubble } from './MessageBubble'
import { FileDropzone } from './FileDropzone'

interface Props {
  target: TargetProfile
  messages: ChatMessage[]
  onSend: (text: string, attachments: File[]) => void
  onStop: () => void
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 px-4 py-6">
        {messages.map((m) => (
          <div key={m.id} className={m.role === 'user' ? 'text-right flex justify-end' : 'flex justify-start'}>
            <MessageBubble role={m.role as any} content={m.content} attachments={m.attachments} timestamp={m.ts} />
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-4 flex flex-col gap-2 border-t border-black/40">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-white text-brand rounded-xl px-3 py-2 resize-none"
          rows={3}
        />
        <FileDropzone onFiles={setFiles} accept="image/*" />
        <button
          onClick={() => {
            onSend(text, files)
            setText('')
            setFiles([])
          }}
          disabled={streaming}
          className="bg-white text-brand rounded-xl px-4 py-2 disabled:opacity-50"
        >
          Invia
        </button>
        {apiStatus === 'no-key' && <p className="text-sm">API key mancante</p>}
        {apiStatus === 'rate-limited' && <p className="text-sm">Rate limit superato</p>}
      </div>
    </div>
  )
}
