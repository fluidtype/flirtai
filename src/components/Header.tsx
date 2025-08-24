import Image from 'next/image'
import { HelpCircle, SunMoon } from 'lucide-react'

type Props = {
  onHelpClick?: () => void
  userInitials: string
}

export function Header({ onHelpClick, userInitials }: Props) {
  return (
    <header className="sticky top-0 z-10 h-16 flex items-center justify-between border-b border-black/40 px-4 bg-brand/90 backdrop-blur">
      <div className="flex items-center gap-2">
        <Image src="/logo-flirtai.svg" alt="logo" width={24} height={24} />
        <span className="font-semibold">FlirtAI</span>
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="help" onClick={onHelpClick} className="text-white/90 hover:text-white">
          <HelpCircle size={20} />
        </button>
        <button aria-label="theme" className="text-white/90 hover:text-white">
          <SunMoon size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-white text-brand flex items-center justify-center font-semibold">
          {userInitials}
        </div>
      </div>
    </header>
  )
}
