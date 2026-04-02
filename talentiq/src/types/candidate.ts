export interface CandidateReport {
  username: string;
  avatarUrl: string;
  score: number; // 0-100
  verdict: 'Strong Hire' | 'Hire' | 'No Hire';
  strengths: string[];
  weaknesses: string[];
  topLanguages: string[];
  repoCount: number;
  commitActivity: string;
}
