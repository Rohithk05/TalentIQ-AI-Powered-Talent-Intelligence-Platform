import { useState } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder = 'Type and press Enter...',
  maxTags = 10,
}: TagInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = input.trim();
      if (val && !tags.includes(val) && tags.length < maxTags) {
        onAdd(val);
        setInput('');
      }
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  return (
    <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] p-2">
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-[#6366f1]/10 px-2.5 py-1 text-xs font-medium text-[#6366f1]"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-[#6366f1]/20"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {tags.length < maxTags && (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="min-w-[120px] flex-1 bg-transparent py-1 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
        )}
      </div>
      <p className="mt-1.5 text-right text-[10px] text-[var(--text-muted)]">
        {tags.length}/{maxTags}
      </p>
    </div>
  );
}
