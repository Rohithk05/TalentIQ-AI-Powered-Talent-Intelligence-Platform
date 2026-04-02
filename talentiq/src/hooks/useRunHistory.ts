import { useMemo } from 'react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import type { AgentType } from '@/types/agent';

export function useRunHistory(filterType?: AgentType) {
  const runs = useWorkspaceStore((state) => state.runs);

  const filteredRuns = useMemo(() => {
    if (!filterType) return runs;
    return runs.filter((r) => r.agentType === filterType);
  }, [runs, filterType]);

  const stats = useMemo(() => {
    const totalRuns = runs.length;
    const jobRuns = runs.filter((r) => r.agentType === 'job-search');
    const candidateRuns = runs.filter((r) => r.agentType === 'candidate-screener');

    const completedJobRuns = jobRuns.filter((r) => r.status === 'done');
    const totalJobsMatched = completedJobRuns.reduce((acc, r) => {
      const output = r.output;
      if (output && 'jobs' in output) {
        return acc + output.jobs.length;
      }
      return acc;
    }, 0);

    const completedCandidateRuns = candidateRuns.filter((r) => r.status === 'done');
    const totalCandidatesScreened = completedCandidateRuns.reduce((acc, r) => {
      const output = r.output;
      if (output && 'candidates' in output) {
        return acc + output.candidates.length;
      }
      return acc;
    }, 0);

    const allMatchScores: number[] = [];
    completedJobRuns.forEach((r) => {
      const output = r.output;
      if (output && 'jobs' in output) {
        output.jobs.forEach((j) => allMatchScores.push(j.matchScore));
      }
    });
    const avgMatchScore =
      allMatchScores.length > 0
        ? Math.round(
            allMatchScores.reduce((a, b) => a + b, 0) / allMatchScores.length
          )
        : 0;

    return {
      totalRuns,
      totalJobsMatched,
      totalCandidatesScreened,
      avgMatchScore,
    };
  }, [runs]);

  return { runs: filteredRuns, stats };
}
