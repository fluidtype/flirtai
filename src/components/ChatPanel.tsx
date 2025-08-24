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
    <div className="flex flex-col flex-1 min-h-[calc(100vh-64px)]">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[740px] mx-auto w-full px-4 md:px-4 lg:px-6 pt-4 pb-24 flex flex-col gap-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${m.role === 'user' ? 'flex justify-end' : 'flex justify-start'} my-1`}
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
          {apiStatus === 'no-key' ? 'API key mancante' : 'Rate limit superato'}
        </div>
      )}
      <div className="sticky bottom-0 border-t border-black/35 bg-[#050505]">
        <div className="max-w-[740px] mx-auto w-full px-4 md:px-4 lg:px-6 pt-2.5 md:pt-3 pb-4 md:pb-5 lg:pb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Scrivi un messaggio"
            className="w-full bg-[#0B0B0B] text-brand placeholder-brand/60 rounded-xl px-4 py-3 resize-none outline-none border border-brand"
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
              className="border border-brand text-brand rounded-lg px-4 py-2 disabled:opacity-50 hover:shadow-[0_0_10px_rgba(229,9,20,0.5)]"
            >
              Invia
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
