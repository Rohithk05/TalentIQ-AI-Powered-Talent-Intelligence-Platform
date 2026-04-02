import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useMemo } from 'react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { format, subDays, isSameDay } from 'date-fns';

export function ActivityChart() {
  const runs = useWorkspaceStore((state) => state.runs);

  const { chartData, maxCount } = useMemo(() => {
    const today = new Date();
    let max = 0;
    
    const data = Array.from({ length: 7 }, (_, i) => {
      const day = subDays(today, 6 - i);
      const dayRuns = runs.filter((r) => {
        try {
          return isSameDay(new Date(r.createdAt), day);
        } catch {
          return false;
        }
      });

      const jobs = dayRuns.filter((r) => r.agentType === 'job-search').length;
      const candidates = dayRuns.filter((r) => r.agentType === 'candidate-screener').length;
      if (jobs > max) max = jobs;
      if (candidates > max) max = candidates;

      return {
        day: format(day, 'EEE'),
        jobs,
        candidates,
      };
    });
    
    return { chartData: data, maxCount: max };
  }, [runs]);

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Activity</h3>
          <p className="text-xs text-[var(--text-muted)]">Agent runs per day — last 7 days</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
            <span className="h-2 w-2 rounded-sm bg-[#6366f1]" />
            Job Search
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
            <span className="h-2 w-2 rounded-sm bg-[#8b5cf6]" />
            Screening
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="jobsBarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="candidatesBarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={1} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, maxCount === 0 ? 1 : maxCount + 1]}
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ fill: 'var(--bg-elevated)', opacity: 0.4 }}
            contentStyle={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              fontSize: '12px',
              color: 'var(--text-primary)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            formatter={(value: any, name: any) => [value, name === 'jobs' ? 'Job Search' : 'Candidate Screener']}
            labelStyle={{ color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 'bold' }}
          />
          <Bar dataKey="jobs" fill="url(#jobsBarFill)" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="candidates" fill="url(#candidatesBarFill)" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
