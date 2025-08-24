export type TrafficLight = 'green' | 'yellow' | 'red';
export type RelState = 'Cold' | 'Warm' | 'Synced' | 'Stall' | 'Drift' | 'Blocked';

export interface TargetSummary {
  id: string;
  name: string;
  context?: string;
  state: RelState;
  status: TrafficLight;
  scores: {
    interest: number;
    reciprocity: number;
    positivity: number;
    timing_fit: number;
  };
  confidence: number; // 0..1
  lastAdvice?: string;
  nextCheckAt?: string; // ISO date
  updatedAt: string; // ISO date
  summary?: string;
  avatarUrl?: string | null;
  badges?: string[];
  paused?: boolean;
  archived?: boolean;
}
