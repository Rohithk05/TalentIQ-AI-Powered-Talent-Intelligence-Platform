import type { AgentRun } from '@/types/agent';
import { RunStatusBadge } from '@/components/dashboard/RunStatusBadge';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Search, Users } from 'lucide-react';

interface AgentRunCardProps {
  run: AgentRun;
  onClick?: () => void;
}

export function AgentRunCard({ run, onClick }: AgentRunCardProps) {
  const isJobSearch = run.agentType === 'job-search';

  const inputSummary = isJobSearch
    ? run.input.linkedinUrl || run.input.url || 'LinkedIn Profile'
    : `${run.input.usernames || 'GitHub Users'} → ${run.input.role || 'Role'}`;

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border bg-[var(--bg-surface)] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6366f1]/5 ${
        isJobSearch ? 'border-l-[3px] border-l-[#6366f1] border-[var(--border-color)]' : 'border-l-[3px] border-l-[#8b5cf6] border-[var(--border-color)]'
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isJobSearch ? 'bg-[#6366f1]/10 text-[#6366f1]' : 'bg-[#8b5cf6]/10 text-[#8b5cf6]'
        }`}
      >
        {isJobSearch ? <Search className="h-4 w-4" /> : <Users className="h-4 w-4" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          {isJobSearch ? 'Job Search' : 'Candidate Screener'}
        </p>
        <p className="truncate text-xs text-[var(--text-muted)]">{inputSummary}</p>
      </div>

      <RunStatusBadge status={run.status} />

      <span className="shrink-0 text-xs text-[var(--text-muted)]">
        {formatDistanceToNow(parseISO(run.createdAt), { addSuffix: true })}
      </span>
    </button>
  );
}
