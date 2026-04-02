import type { RunStatus } from '@/types/agent';

const statusConfig: Record<RunStatus, { label: string; color: string; bg: string }> = {
  idle: { label: 'Idle', color: '#71717a', bg: '#71717a1a' },
  queued: { label: 'Queued', color: '#6366f1', bg: '#6366f11a' },
  running: { label: 'Running', color: '#f59e0b', bg: '#f59e0b1a' },
  done: { label: 'Completed', color: '#22c55e', bg: '#22c55e1a' },
  failed: { label: 'Failed', color: '#ef4444', bg: '#ef44441a' },
};

interface RunStatusBadgeProps {
  status: RunStatus;
}

export function RunStatusBadge({ status }: RunStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${status === 'running' ? 'animate-pulse' : ''}`}
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}
