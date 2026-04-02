import type { AgentType, JobSearchOutput, CandidateOutput } from '@/types/agent';
import type { JobMatch } from '@/types/job';
import type { CandidateReport } from '@/types/candidate';

type OnProgress = (percent: number, stepLabel: string) => void;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockJobData: JobSearchOutput = {
  profile: {
    name: 'Alex Chen',
    headline: 'Full Stack Engineer',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    domain: 'Software Engineering',
    confidenceScore: 94,
  },
  jobs: [
    {
      id: '1',
      title: 'Senior Frontend Engineer',
      company: 'Linear',
      domain: 'Software Engineering',
      matchScore: 96,
      applyUrl: 'https://linear.app/jobs',
      tags: ['React', 'TypeScript', 'Remote'],
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'Vercel',
      domain: 'Software Engineering',
      matchScore: 91,
      applyUrl: 'https://vercel.com/careers',
      tags: ['Next.js', 'TypeScript', 'Infra'],
    },
    {
      id: '3',
      title: 'Software Engineer',
      company: 'Supabase',
      domain: 'Software Engineering',
      matchScore: 87,
      applyUrl: 'https://supabase.com/careers',
      tags: ['PostgreSQL', 'React', 'OSS'],
    },
    {
      id: '4',
      title: 'Frontend Engineer',
      company: 'Loom',
      domain: 'Software Engineering',
      matchScore: 82,
      applyUrl: 'https://loom.com/jobs',
      tags: ['React', 'Video', 'Growth'],
    },
    {
      id: '5',
      title: 'React Engineer',
      company: 'Retool',
      domain: 'Software Engineering',
      matchScore: 79,
      applyUrl: 'https://retool.com/careers',
      tags: ['React', 'B2B', 'SaaS'],
    },
  ] as JobMatch[],
};

const mockCandidateData: CandidateReport[] = [
  {
    username: 'john-doe',
    avatarUrl: 'https://github.com/ghost.png',
    score: 88,
    verdict: 'Strong Hire',
    strengths: [
      'Consistent commit history',
      'Strong TypeScript',
      'Well-documented repos',
    ],
    weaknesses: ['Limited backend experience'],
    topLanguages: ['TypeScript', 'Python', 'Go'],
    repoCount: 34,
    commitActivity: 'Daily',
  },
  {
    username: 'jane-smith',
    avatarUrl: 'https://github.com/ghost.png',
    score: 62,
    verdict: 'Hire',
    strengths: ['Good project variety', 'Active OSS contributor'],
    weaknesses: ['Inconsistent activity', 'Few tests in repos'],
    topLanguages: ['JavaScript', 'CSS', 'Shell'],
    repoCount: 18,
    commitActivity: 'Weekly',
  },
];

interface AgentSteps {
  'job-search': { label: string; endPercent: number; delayMs: number }[];
  'candidate-screener': { label: string; endPercent: number; delayMs: number }[];
}

const agentSteps: AgentSteps = {
  'job-search': [
    { label: 'Fetching profile data...', endPercent: 25, delayMs: 800 },
    { label: 'Analyzing skills and domain...', endPercent: 60, delayMs: 1200 },
    { label: 'Searching job board...', endPercent: 90, delayMs: 1000 },
    { label: 'Generating report...', endPercent: 100, delayMs: 600 },
  ],
  'candidate-screener': [
    { label: 'Fetching GitHub profiles...', endPercent: 25, delayMs: 800 },
    { label: 'Analyzing repositories and commits...', endPercent: 60, delayMs: 1200 },
    { label: 'Scoring candidates...', endPercent: 90, delayMs: 1000 },
    { label: 'Generating report...', endPercent: 100, delayMs: 600 },
  ],
};

export async function runAgent(
  _input: Record<string, string>,
  agentType: AgentType,
  onProgress: OnProgress
): Promise<JobSearchOutput | CandidateOutput> {
  const steps = agentSteps[agentType];

  for (const step of steps) {
    onProgress(step.endPercent, step.label);
    await delay(step.delayMs);
  }

  if (agentType === 'job-search') {
    return mockJobData;
  }

  return { candidates: mockCandidateData };
}
