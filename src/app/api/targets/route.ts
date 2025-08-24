import { NextResponse } from 'next/server';
import type { TargetSummary } from '@/types';

// In-memory demo data for the PoC.
const demoTargets: TargetSummary[] = [
  {
    id: 'trg_1',
    name: 'Cecilia',
    context: 'match',
    state: 'Warm',
    status: 'yellow',
    scores: { interest: 62, reciprocity: 54, positivity: 71, timing_fit: 58 },
    confidence: 0.72,
    lastAdvice: 'Fai una domanda aperta, breve.',
    nextCheckAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    summary: 'Chat positiva ma altalenante; graduale apertura.',
    avatarUrl: null,
    badges: ['IG 10–100k', 'Marketing mid'],
    paused: false,
    archived: false,
  },
];

export async function GET() {
  return NextResponse.json(demoTargets);
}
