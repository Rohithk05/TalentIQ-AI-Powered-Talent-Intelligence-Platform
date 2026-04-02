import { useWorkspaceStore } from '@/store/useWorkspaceStore';

export function useProfileCompleteness(): number {
  const profile = useWorkspaceStore((state) => state.profile);
  let completeness = 0;

  if (profile.name && profile.name.trim() !== '') completeness += 20;
  if (profile.title && profile.title.trim() !== '') completeness += 15;
  if (profile.bio && profile.bio.trim() !== '') completeness += 15;
  if (profile.linkedinUrl && profile.linkedinUrl.trim() !== '') completeness += 20;
  if (profile.githubUsername && profile.githubUsername.trim() !== '') completeness += 15;
  if (profile.dreamJob && profile.dreamJob.trim() !== '') completeness += 15;

  return Math.min(completeness, 100);
}
