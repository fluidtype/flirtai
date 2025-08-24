import Image from 'next/image'
import { HelpCircle, SunMoon } from 'lucide-react'

type Props = {
  onHelpClick?: () => void
  userInitials: string
}

export function Header({ onHelpClick, userInitials }: Props) {
  return (
    <header className="sticky top-0 z-10 h-16 flex items-center justify-between border-b border-brand/40 px-4 md:px-6 bg-[#050505]/80 backdrop-blur">
      <div className="flex items-center gap-2">
        <Image src="/logo-flirtai.svg" alt="logo" width={24} height={24} />
        <span className="font-semibold text-white">FlirtAI Control</span>
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="help" onClick={onHelpClick} className="text-secondary hover:text-white">
          <HelpCircle size={20} />
        </button>
        <button aria-label="theme" className="text-secondary hover:text-white">
          <SunMoon size={20} />
        </button>
        <div className="w-8 h-8 rounded-full border border-brand text-brand flex items-center justify-center font-semibold">
          {userInitials}
        </div>
      </div>
    </header>
  )
}
