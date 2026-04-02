import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: number; label: string };
  gradient?: string;
}

export function MetricCard({ title, value, subtitle, icon, trend, gradient = 'from-[#6366f1] to-[#8b5cf6]' }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState<string | number>(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }
    if (value === 0) {
      setDisplayValue(0);
      return;
    }
    let start = 0;
    const end = value;
    const duration = 600;
    const stepTime = 16;
    const steps = Math.ceil(duration / stepTime);
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 transition-all duration-200 hover:border-[#6366f1]/30 hover:shadow-lg hover:shadow-[#6366f1]/5 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--text-muted)]">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] animate-count-up">
            {displayValue}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">{subtitle}</p>
          )}
          {trend && (
            <p
              className={`mt-1 text-xs font-medium ${
                trend.value >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'
              }`}
            >
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%{' '}
              <span className="text-[var(--text-muted)]">{trend.label}</span>
            </p>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
