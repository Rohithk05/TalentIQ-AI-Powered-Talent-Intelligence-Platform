import { Check } from 'lucide-react';

interface StepProgressProps {
  steps: string[];
  currentStep: number;
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        const isPending = i > currentStep;

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#10b981] text-white'
                    : isActive
                    ? 'gradient-primary text-white'
                    : 'border-2 border-[var(--border-color)] bg-transparent text-[var(--text-muted)]'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  i + 1
                )}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      animation: 'pulse-ring 1.5s ease-out infinite',
                      background: 'rgba(99, 102, 241, 0.3)',
                    }}
                  />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCompleted
                    ? 'text-[#10b981]'
                    : isActive
                    ? 'text-[var(--accent-primary)]'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-12 rounded-full transition-all duration-300 ${
                  isPending
                    ? 'bg-[var(--border-color)]'
                    : isActive
                    ? 'bg-gradient-to-r from-[#6366f1] to-[var(--border-color)]'
                    : 'bg-[#10b981]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
