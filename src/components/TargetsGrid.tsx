'use client';
import type { TargetSummary } from '@/types';
import TargetCard from './TargetCard';
import EmptyState from './EmptyState';

interface Props {
  targets: TargetSummary[];
}

export default function TargetsGrid({ targets }: Props) {
  if (targets.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {targets.map(t => (
        <TargetCard key={t.id} target={t} />
      ))}
    </div>
  );
}
