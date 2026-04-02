import type { JobMatch } from './job';
import type { CandidateReport } from './candidate';

export type { JobMatch, CandidateReport };

export type AgentType = 'job-search' | 'candidate-screener';
export type RunStatus = 'idle' | 'queued' | 'running' | 'done' | 'failed';

export interface AgentRun {
  id: string;
  agentType: AgentType;
  status: RunStatus;
  progress: number; // 0-100
  input: Record<string, string>;
  output?: JobSearchOutput | CandidateOutput;
  error?: string;
  createdAt: string; // ISO
  completedAt?: string; // ISO
}

export interface JobSearchOutput {
  profile: {
    name: string;
    headline: string;
    skills: string[];
    domain: string;
    confidenceScore: number;
  };
  jobs: JobMatch[];
}

export interface CandidateOutput {
  candidates: CandidateReport[];
}
