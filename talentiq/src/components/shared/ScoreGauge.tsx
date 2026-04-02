import { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  label?: string;
}

export function ScoreGauge({ score, size = 120, label }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (240 / 360) * circumference; // 240 degree arc
  const offset = arcLength - (animatedScore / 100) * arcLength;
  const center = size / 2;

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: 'url(#gaugeGreen)', text: '#10b981' };
    if (s >= 60) return { stroke: 'url(#gaugeAmber)', text: '#f59e0b' };
    return { stroke: 'url(#gaugeRed)', text: '#ef4444' };
  };

  const color = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block"
        >
          <defs>
            <linearGradient id="gaugeGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="gaugeAmber" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="gaugeRed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          {/* Background arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="8"
            strokeDasharray={arcLength}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(150 ${center} ${center})`}
          />
          {/* Foreground arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth="8"
            strokeDasharray={arcLength}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(150 ${center} ${center})`}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold font-[var(--font-display)]"
            style={{ color: color.text }}
          >
            {animatedScore}
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            / 100
          </span>
        </div>
      </div>
      {label && (
        <p className="mt-1 text-xs font-medium text-[var(--text-secondary)]">
          {label}
        </p>
      )}
    </div>
  );
}
