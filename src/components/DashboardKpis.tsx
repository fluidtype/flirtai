'use client';
import type { TargetSummary } from '@/types';

interface Props {
  targets: TargetSummary[];
}

export default function DashboardKpis({ targets }: Props) {
  const total = targets.length;
  const active = targets.filter(t => !t.paused && !t.archived).length;
  const paused = targets.filter(t => t.paused).length;
  const archived = targets.filter(t => t.archived).length;
  const green = targets.filter(t => t.status === 'green').length;
  const yellow = targets.filter(t => t.status === 'yellow').length;
  const red = targets.filter(t => t.status === 'red').length;

  const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="dashboard-kpis">
      <div className="bg-card p-4 rounded-2xl">
        <p className="text-sm text-muted">Totali</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="bg-card p-4 rounded-2xl">
        <p className="text-sm text-muted">Attivi</p>
        <p className="text-2xl font-bold">{active}</p>
      </div>
      <div className="bg-card p-4 rounded-2xl">
        <p className="text-sm text-muted">Pausa</p>
        <p className="text-2xl font-bold">{paused}</p>
      </div>
      <div className="bg-card p-4 rounded-2xl">
        <p className="text-sm text-muted">Archiviati</p>
        <p className="text-2xl font-bold">{archived}</p>
      </div>
      <div className="col-span-2 md:col-span-4 flex gap-4 pt-2">
        <span className="text-green-500">Verdi {pct(green)}%</span>
        <span className="text-yellow-500">Gialli {pct(yellow)}%</span>
        <span className="text-red-500">Rossi {pct(red)}%</span>
      </div>
    </div>
  );
}
