import type { Metadata } from 'next'
import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
import { ToastViewport } from '@/components/ToastViewport'
import { Splash } from '@/components/Splash'

const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'FlirtAI',
  description: 'Coach relazionale',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={mono.variable}>
      <body className="min-h-screen bg-bg text-white antialiased">
        <Splash />
        {children}
        <ToastViewport />
      </body>
    </html>
  )
}
