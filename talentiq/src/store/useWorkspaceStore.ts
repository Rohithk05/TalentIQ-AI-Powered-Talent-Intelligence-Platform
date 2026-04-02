import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AgentRun } from '@/types/agent';
import type { JobMatch } from '@/types/job';

export interface UserProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  bio: string;
  linkedinUrl: string;
  githubUsername: string;
  dreamJob: string;
  yearsOfExperience: string;
  avatarColor: string;
}

const defaultProfile: UserProfile = {
  name: 'Rohith K',
  title: 'Software Engineer',
  location: '',
  email: '',
  bio: '',
  linkedinUrl: '',
  githubUsername: '',
  dreamJob: '',
  yearsOfExperience: '',
  avatarColor: 'from-indigo-500 to-violet-500',
};

interface WorkspaceStore {
  runs: AgentRun[];
  activeRunId: string | null;
  workspaceName: string;
  theme: 'dark' | 'light';
  apiKeys: Record<string, string>;
  profile: UserProfile;
  savedJobs: JobMatch[];
  completedSkills: string[];
  addRun: (run: AgentRun) => void;
  updateRun: (id: string, patch: Partial<AgentRun>) => void;
  setActiveRun: (id: string | null) => void;
  setWorkspaceName: (name: string) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setApiKey: (key: string, value: string) => void;
  clearHistory: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  saveJob: (job: JobMatch) => void;
  removeJob: (jobId: string) => void;
  toggleSkill: (skill: string) => void;
  hasCompletedOnboarding: boolean;
  setOnboardingComplete: () => void;
  userId: string | null;
  setUser: (userId: string | null) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      userId: null,
      setUser: (userId) => set({ userId }),
      runs: [],
      activeRunId: null,
      workspaceName: 'TalentIQ Workspace',
      theme: 'dark',
      apiKeys: {},
      profile: defaultProfile,
      savedJobs: [],
      completedSkills: [],
      hasCompletedOnboarding: false,

      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),

      addRun: (run) =>
        set((state) => ({
          runs: [run, ...state.runs],
          activeRunId: run.id,
        })),

      updateRun: (id, patch) =>
        set((state) => ({
          runs: state.runs.map((r) =>
            r.id === id ? { ...r, ...patch } : r
          ),
        })),

      setActiveRun: (id) => set({ activeRunId: id }),

      setWorkspaceName: (name) => set({ workspaceName: name }),

      setTheme: (theme) => set({ theme }),

      setApiKey: (key, value) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [key]: value },
        })),

      clearHistory: () => set({ runs: [], activeRunId: null }),

      updateProfile: (patch) =>
        set((state) => ({
          profile: { ...state.profile, ...patch },
        })),

      saveJob: (job) =>
        set((state) => ({
          savedJobs: state.savedJobs.some((j) => j.id === job.id)
            ? state.savedJobs
            : [...state.savedJobs, job],
        })),

      removeJob: (jobId) =>
        set((state) => ({
          savedJobs: state.savedJobs.filter((j) => j.id !== jobId),
        })),

      toggleSkill: (skill) =>
        set((state) => ({
          completedSkills: state.completedSkills.includes(skill)
            ? state.completedSkills.filter((s) => s !== skill)
            : [...state.completedSkills, skill],
        })),
    }),
    {
      name: 'talentiq-workspace',
    }
  )
);
