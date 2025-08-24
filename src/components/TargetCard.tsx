'use client';
import type { TargetSummary } from '@/types';
import { useRouter } from 'next/navigation';

export default function TargetCard({ target }: { target: TargetSummary }) {
  const router = useRouter();
  const color =
    target.status === 'green'
      ? 'bg-success'
      : target.status === 'yellow'
      ? 'bg-warn'
      : 'bg-danger';
  return (
    <div
      className="bg-card rounded-2xl p-4 flex flex-col gap-2 hover:shadow" data-testid={`target-card-${target.id}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{target.name}</h3>
        <span className={`${color} w-3 h-3 rounded-full`} aria-label={`status: ${target.status}`}></span>
      </div>
      {target.lastAdvice && (
        <p className="text-sm text-muted truncate">
          {target.lastAdvice}{' '}
          <button
            className="text-primary ml-1"
            onClick={() => navigator.clipboard.writeText(target.lastAdvice || '')}
          >
            copia
          </button>
        </p>
      )}
      {target.nextCheckAt && (
        <p className="text-xs text-muted">
          Prossimo: {new Date(target.nextCheckAt).toLocaleString()}
        </p>
      )}
      <button
        className="mt-2 text-primary underline"
        onClick={() => router.push(`/targets/${target.id}`)}
      >
        Apri
      </button>
    </div>
  );
}
