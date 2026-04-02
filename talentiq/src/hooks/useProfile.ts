import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import type { UserProfile } from '@/store/useWorkspaceStore';

export function useProfile() {
  const profile = useWorkspaceStore((s) => s.profile);
  const updateProfile = useWorkspaceStore((s) => s.updateProfile);
  const runs = useWorkspaceStore((s) => s.runs);
  const completedSkills = useWorkspaceStore((s) => s.completedSkills);

  const totalRuns = runs.length;
  const jobsMatched = runs
    .filter((r) => r.status === 'done' && r.agentType === 'job-search')
    .reduce((acc, r) => {
      const out = r.output;
      if (out && 'jobs' in out) return acc + out.jobs.length;
      return acc;
    }, 0);
  const candidatesScreened = runs
    .filter((r) => r.status === 'done' && r.agentType === 'candidate-screener')
    .reduce((acc, r) => {
      const out = r.output;
      if (out && 'candidates' in out) return acc + out.candidates.length;
      return acc;
    }, 0);

  const fields: (keyof UserProfile)[] = [
    'name', 'title', 'location', 'email', 'bio',
    'linkedinUrl', 'githubUsername', 'dreamJob', 'yearsOfExperience',
  ];
  const filledFields = fields.filter((f) => profile[f]?.trim()).length;
  const profileCompleteness = Math.round((filledFields / fields.length) * 100);

  return {
    profile,
    updateProfile,
    totalRuns,
    jobsMatched,
    candidatesScreened,
    profileCompleteness,
    completedSkills,
  };
}
