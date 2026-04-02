import type { JobMatch } from '@/types/job';
import { ExternalLink, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobResultCardProps {
  job: JobMatch;
  rank: number;
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#f59e0b';
  return '#ef4444';
}

export function JobResultCard({ job, rank }: JobResultCardProps) {
  const scoreColor = getScoreColor(job.matchScore);

  return (
    <div className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 transition-all duration-200 hover:border-[#6366f1]/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6366f1]/5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-elevated)] text-xs font-bold text-[var(--text-muted)]">
            #{rank}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">{job.title}</h4>
              {job.jobType && (
                <span className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                  {job.jobType}
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-medium">{job.company}</p>
          </div>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold shrink-0"
          style={{ color: scoreColor, backgroundColor: `${scoreColor}1a` }}
        >
          {job.matchScore}%
        </span>
        </div>

        {job.whyMatch && (
          <p className="mt-2 text-xs italic text-[var(--text-muted)] leading-relaxed">
            "{job.whyMatch}"
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium text-[var(--text-muted)]">
          {job.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </div>
          )}
          {job.salary && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {job.salary}
            </div>
          )}
          {job.postedAgo && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {job.postedAgo}
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg bg-[var(--bg-elevated)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3">
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-full rounded-xl border-[var(--border-color)] bg-transparent text-xs font-semibold text-[var(--text-primary)] hover:border-[#6366f1] hover:bg-[#6366f1]/10 hover:text-[#6366f1]"
          >
            Apply Now
            <ExternalLink className="ml-1.5 h-3 w-3" />
          </Button>
        </a>
      </div>
    </div>
  );
}
