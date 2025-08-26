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
    <header
      className={`sticky top-0 z-50 h-16 border-b border-white/10 bg-[#0B0B0B]/90 backdrop-blur-sm transition-transform ${
        scrolled ? 'scale-[0.92]' : ''
      }`}
    >
      <div className="flex items-center justify-between h-full px-6 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/logo-flirtai.svg" alt="logo" width={24} height={24} />
          <span className="font-semibold text-white">FlirtAI</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            aria-label="help"
            onClick={onHelpClick}
            className="text-white/70 hover:text-white"
          >
            <HelpCircle size={20} />
          </button>
          <button aria-label="theme" className="text-white/70 hover:text-white">
            <SunMoon size={20} />
          </button>
          <div className="bg-[#E50914] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center select-none hover:bg-[#E50914]/90 cursor-pointer">
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  )
}
