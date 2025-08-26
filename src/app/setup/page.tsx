'use client'
import { useRouter } from 'next/navigation'
import { ProfileForm } from '@/components/ProfileForm'
import { useStore } from '@/lib/store'

export default function SetupPage() {
  const setUser = useStore((s) => s.setUser)
  const router = useRouter()
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 text-white">
      <h1 className="text-2xl font-semibold mb-2">Benvenuto in FlirtAI</h1>
      <p className="mb-6">Crea il tuo profilo base per consigli iper-precisi.</p>
      <div className="w-full max-w-md bg-brand/20 p-6 rounded-2xl">
        <ProfileForm
          onSubmit={(data) => {
            setUser(data)
            router.push('/')
          }}
        />
      </div>
    </main>
  )
}
