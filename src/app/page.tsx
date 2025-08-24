'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { TargetSummary } from '@/types';
import DashboardKpis from '@/components/DashboardKpis';
import FiltersBar from '@/components/FiltersBar';
import TargetsGrid from '@/components/TargetsGrid';

async function fetchTargets(): Promise<TargetSummary[]> {
  const res = await fetch('/api/targets');
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['targets'],
    queryFn: fetchTargets,
  });

  if (error) {
    return <div className="p-8 text-danger">Errore nel caricamento</div>;
  }

  const targets = (data || []).filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {isLoading ? (
        <div className="text-muted">Caricamento...</div>
      ) : (
        <>
          <DashboardKpis targets={targets} />
          <FiltersBar onSearch={setSearch} />
          <TargetsGrid targets={targets} />
        </>
      )}
    </main>
  );
}
