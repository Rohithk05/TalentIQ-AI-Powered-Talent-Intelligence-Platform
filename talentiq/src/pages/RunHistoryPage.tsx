import { useState, useEffect } from 'react';
import { History, Search, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { RunStatusBadge } from '@/components/dashboard/RunStatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatDistanceToNow, parseISO, differenceInSeconds } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { getRuns } from '@/services/dbService';
import type { AgentType, AgentRun, JobSearchOutput, CandidateOutput } from '@/types/agent';

type FilterTab = 'all' | AgentType;

export function RunHistoryPage() {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dbRuns, setDbRuns] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function loadRuns() {
      if (user) {
        const data = await getRuns(user.id);
        setDbRuns(data);
      }
    }
    loadRuns();
  }, [user]);

  const filterType = filter === 'all' ? undefined : filter;
  const runs = filterType ? dbRuns.filter(r => r.agent_type === filterType) : dbRuns;

  const filterTabs: { value: FilterTab; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'job-search', label: 'Job Search' },
    { value: 'candidate-screener', label: 'Candidate Screener' },
  ];

  const getDuration = (run: AgentRun): string => {
    if (!run.completed_at && !run.created_at) return '—';
    const secs = differenceInSeconds(
      parseISO(run.completed_at || run.created_at),
      parseISO(run.created_at)
    );
    return `${secs}s`;
  };

  const getInputSummary = (run: any): string => {
    if (run.agent_type === 'job-search') {
      return run.input?.linkedinUrl || run.input?.url || 'LinkedIn Profile';
    }
    return `${run.input?.usernames || 'Users'} → ${run.input?.role || 'Role'}`;
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Run History
          </h2>
          <p className="text-xs text-[var(--text-muted)]">{runs.length} total runs</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 rounded-xl bg-[var(--bg-elevated)] p-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 ${
              filter === tab.value
                ? 'gradient-primary text-white shadow-md'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {runs.length === 0 ? (
        <EmptyState
          icon={<History className="h-6 w-6" />}
          title="No runs found"
          description="Run an agent to see your history here."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--border-color)]">
          {/* Table header */}
          <div className="grid grid-cols-[40px_80px_100px_1fr_100px_80px_60px] gap-3 bg-[var(--bg-elevated)] px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
            <span></span>
            <span>ID</span>
            <span>Type</span>
            <span>Input</span>
            <span>Status</span>
            <span>Started</span>
            <span>Duration</span>
          </div>

          {runs.map((run) => (
            <div key={run.id}>
              <button
                onClick={() => run.status === 'done' ? toggleExpand(run.id) : undefined}
                className={`grid w-full grid-cols-[40px_80px_100px_1fr_100px_80px_60px] gap-3 border-t border-[var(--border-color)] px-4 py-3 text-left transition-all duration-200 hover:bg-[var(--bg-elevated)] ${
                  run.status === 'done' ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <span className="flex items-center">
                  {run.status === 'done' ? (
                    expandedId === run.id
                      ? <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      : <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                  ) : null}
                </span>
                <span className="truncate text-xs font-mono text-[var(--text-muted)]">
                  {run.id.substring(0, 8)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[var(--text-primary)]">
                  {run.agent_type === 'job-search' ? (
                    <Search className="h-3 w-3 text-[#6366f1]" />
                  ) : (
                    <Users className="h-3 w-3 text-[#8b5cf6]" />
                  )}
                  {run.agent_type === 'job-search' ? 'Jobs' : 'Screening'}
                </span>
                <span className="truncate text-xs text-[var(--text-muted)]">
                  {getInputSummary(run)}
                </span>
                <span>
                  <RunStatusBadge status={run.status} />
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  {formatDistanceToNow(parseISO(run.created_at), { addSuffix: true })}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  {getDuration(run)}
                </span>
              </button>

              {expandedId === run.id && run.output && (
                <div className="border-t border-[var(--border-color)] bg-[var(--bg-base)] p-4 animate-fade-in-up">
                  {run.agent_type === 'job-search' && run.output.jobs ? (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[var(--text-primary)]">
                        {(run.output as JobSearchOutput).jobs.length} jobs matched
                      </p>
                      {(run.output as JobSearchOutput).jobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between rounded-xl bg-[var(--bg-surface)] px-3 py-2">
                          <div>
                            <span className="text-xs font-medium text-[var(--text-primary)]">{job.title}</span>
                            <span className="ml-2 text-xs text-[var(--text-muted)]">@ {job.company}</span>
                          </div>
                          <span className="text-xs font-bold text-[#10b981]">{job.matchScore}%</span>
                        </div>
                      ))}
                    </div>
                  ) : run.output.candidates ? (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[var(--text-primary)]">
                        {(run.output as CandidateOutput).candidates.length} candidates screened
                      </p>
                      {(run.output as CandidateOutput).candidates.map((c) => (
                        <div key={c.username} className="flex items-center justify-between rounded-xl bg-[var(--bg-surface)] px-3 py-2">
                          <span className="text-xs font-medium text-[var(--text-primary)]">@{c.username}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[var(--text-muted)]">{c.verdict}</span>
                            <span
                              className="text-xs font-bold"
                              style={{ color: c.score >= 80 ? '#10b981' : c.score >= 60 ? '#f59e0b' : '#ef4444' }}
                            >
                              {c.score}/100
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
