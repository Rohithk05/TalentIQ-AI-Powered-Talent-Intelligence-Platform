import type { ReactNode } from 'react';

interface GradientCardProps {
  children: ReactNode;
  gradient?: string;
  className?: string;
  onClick?: () => void;
}

export function GradientCard({
  children,
  gradient = 'from-[#6366f1] to-[#8b5cf6]',
  className = '',
  onClick,
}: GradientCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl p-[1px] transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/10 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Gradient border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-40 transition-opacity duration-300 group-hover:opacity-70`}
      />
      {/* Content */}
      <div className="relative rounded-2xl bg-[var(--bg-surface)] p-5">
        {children}
      </div>
    </div>
  );
}
