"use client"
import Image from 'next/image'
import { HelpCircle, SunMoon } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  onHelpClick?: () => void
  userInitials: string
}

export function Header({ onHelpClick, userInitials }: Props) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`sticky top-0 z-10 h-16 flex items-center justify-between border-b border-black/35 px-4 md:px-6 bg-transparent transition-transform ${scrolled ? 'scale-95 opacity-90' : ''}`}>
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
