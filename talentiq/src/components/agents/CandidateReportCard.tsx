import type { CandidateReport } from '@/types/candidate';
import { CheckCircle2, AlertTriangle, GitBranch, Code2 } from 'lucide-react';

interface CandidateReportCardProps {
  candidate: CandidateReport;
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#f59e0b';
  return '#ef4444';
}

function getVerdictStyle(verdict: string): { color: string; bg: string; gradient: string } {
  switch (verdict) {
    case 'Strong Hire':
      return { color: '#10b981', bg: '#10b9811a', gradient: 'from-[#10b981] to-[#06b6d4]' };
    case 'Hire':
      return { color: '#f59e0b', bg: '#f59e0b1a', gradient: 'from-[#f59e0b] to-[#ef4444]' };
    default:
      return { color: '#ef4444', bg: '#ef44441a', gradient: 'from-[#ef4444] to-[#dc2626]' };
  }
}

const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f59e0b',
  Python: '#3572a5',
  Go: '#00add8',
  Rust: '#dea584',
  CSS: '#663399',
  Shell: '#89e051',
  Java: '#b07219',
  'C++': '#f34b7d',
};

export function CandidateReportCard({ candidate }: CandidateReportCardProps) {
  const scoreColor = getScoreColor(candidate.score);
  const verdictStyle = getVerdictStyle(candidate.verdict);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (candidate.score / 100) * circumference;

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 transition-all duration-200 hover:border-[#8b5cf6]/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#8b5cf6]/5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] text-lg font-bold text-white">
          {candidate.username[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-[var(--text-primary)]">@{candidate.username}</h4>
          <span
            className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-bold`}
            style={{ color: verdictStyle.color, backgroundColor: verdictStyle.bg }}
          >
            {candidate.verdict}
          </span>
        </div>

        {/* Score gauge */}
        <div className="relative h-20 w-20">
          <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r={radius} fill="none" stroke="var(--border-color)" strokeWidth="5" />
            <circle
              cx="40" cy="40" r={radius} fill="none" stroke={scoreColor} strokeWidth="5"
              strokeDasharray={circumference} strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold" style={{ color: scoreColor }}>{candidate.score}</span>
            <span className="text-[9px] text-[var(--text-muted)]">score</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <GitBranch className="h-3 w-3" />
          {candidate.repoCount} repos
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Code2 className="h-3 w-3" />
          {candidate.commitActivity} commits
        </div>
      </div>

      {/* Languages - with distinct colors */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {candidate.topLanguages.map((lang) => {
          const color = langColors[lang] || '#6366f1';
          return (
            <span
              key={lang}
              className="rounded-lg px-2.5 py-0.5 text-[10px] font-bold"
              style={{ color, backgroundColor: `${color}15` }}
            >
              {lang}
            </span>
          );
        })}
      </div>

      {/* Strengths & Weaknesses side by side */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#10b981]">Strengths</p>
          <ul className="space-y-1">
            {candidate.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-[#10b981]" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#f59e0b]">Weaknesses</p>
          <ul className="space-y-1">
            {candidate.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-[#f59e0b]" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
