import type { Metadata } from 'next'
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ToastViewport } from '@/components/ToastViewport'
import { Splash } from '@/components/Splash'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'FlirtAI',
  description: 'Coach relazionale',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-brand text-white antialiased">
        <Splash />
        {children}
        <ToastViewport />
      </body>
    </html>
  )
}
