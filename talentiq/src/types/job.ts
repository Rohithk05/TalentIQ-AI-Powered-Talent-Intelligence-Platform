export interface JobMatch {
  id: string;
  title: string;
  company: string;
  domain: string;
  matchScore: number;
  applyUrl: string;
  tags: string[];
  location?: string;
  jobType?: string;
  salary?: string;
  whyMatch?: string;
  postedAgo?: string;
}
