import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import type { Toast as ToastType } from '@/hooks/useToast';

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

const iconMap = {
  success: <CheckCircle2 className="h-4 w-4 text-[#10b981]" />,
  error: <XCircle className="h-4 w-4 text-[#ef4444]" />,
  info: <Info className="h-4 w-4 text-[#6366f1]" />,
};

const bgMap = {
  success: 'bg-[#10b981]/10 border-[#10b981]/20',
  error: 'bg-[#ef4444]/10 border-[#ef4444]/20',
  info: 'bg-[#6366f1]/10 border-[#6366f1]/20',
};

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slide-in-right flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md ${bgMap[toast.type]}`}
          style={{ minWidth: 280 }}
        >
          {iconMap[toast.type]}
          <span className="flex-1 text-sm font-medium text-[var(--text-primary)]">
            {toast.message}
          </span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 rounded-full p-1 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
