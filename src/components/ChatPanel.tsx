import { useState, useRef, useEffect } from 'react'
import { TargetProfile, ChatMessage } from '@/types'
import { MessageBubble } from './MessageBubble'
import { FileDropzone } from './FileDropzone'

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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[740px] px-4 md:px-6 py-6 flex flex-col gap-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
            >
              <MessageBubble
                role={m.role as any}
                content={m.content}
                attachments={m.attachments}
                timestamp={m.ts}
              />
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>
      {apiStatus !== 'ok' && (
        <div className="bg-white text-brand text-sm text-center py-2">
          {apiStatus === 'no-key'
            ? 'API key mancante'
            : 'Rate limit superato'}
        </div>
      )}
      <div className="border-t border-black/35">
        <div className="mx-auto w-full max-w-[740px] px-4 md:px-6 mb-6 mt-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Scrivi un messaggio"
            className="w-full bg-white text-brand placeholder-brand/60 rounded-xl px-3 py-2 resize-none outline-none"
            rows={3}
          />
          <FileDropzone onFiles={setFiles} accept="image/*" />
          <div className="flex justify-end mt-2">
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
          </div>
        </div>
      </div>
    </div>
  )
}
