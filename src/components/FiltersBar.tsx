'use client';
import { useState } from 'react';

interface Props {
  onSearch: (term: string) => void;
}

export default function FiltersBar({ onSearch }: Props) {
  const [term, setTerm] = useState('');
  return (
    <div className="flex gap-2 mb-4" data-testid="filters-bar">
      <input
        className="bg-card rounded-2xl px-4 py-2 flex-1"
        placeholder="Search"
        value={term}
        onChange={e => {
          setTerm(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
}
