import { useRef } from 'react'

type Props = {
  onFiles: (files: File[]) => void
  accept?: string
  maxFiles?: number
}

export function FileDropzone({ onFiles, accept, maxFiles = 5 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="border border-dashed border-white rounded-xl p-4 text-center cursor-pointer"
    >
      <p>Trascina o clicca per caricare</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || [])
          onFiles(files.slice(0, maxFiles))
        }}
      />
    </div>
  )
}
