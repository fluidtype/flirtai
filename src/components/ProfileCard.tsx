import { UserProfile } from '@/types'

type Props = {
  profile: UserProfile
  onEdit: () => void
  onSeedDemo: () => void
}

export function ProfileCard({ profile, onEdit, onSeedDemo }: Props) {
  return (
    <div className="rounded-2xl bg-white text-brand p-4 flex flex-col gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{profile.name}</h2>
        <button onClick={onEdit} className="text-sm underline">
          Modifica
        </button>
      </div>
      {profile.bio && <p className="text-sm opacity-80">{profile.bio}</p>}
      {profile.goals && (
        <div className="flex flex-wrap gap-2">
          {profile.goals.map((g) => (
            <span key={g} className="bg-white text-brand text-xs px-2 py-0.5 rounded-full">
              {g}
            </span>
          ))}
        </div>
      )}
      <button onClick={onSeedDemo} className="text-xs underline self-start">
        Rigenera demo
      </button>
    </div>
  )
}
