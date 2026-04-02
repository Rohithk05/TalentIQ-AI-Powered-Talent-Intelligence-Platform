import { useState } from 'react';
import { Search, Loader2, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface JobSearchFormProps {
  onSubmit: (linkedinUrl: string) => void;
  isRunning: boolean;
}

export function JobSearchForm({ onSubmit, isRunning }: JobSearchFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-[#f4f4f5]">
          LinkedIn Profile URL
        </label>
        <div className="relative">
          <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717a]" />
          <Input
            type="url"
            placeholder="https://linkedin.com/in/username"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isRunning}
            className="h-11 border-[#1f1f1f] bg-[#0a0a0a] pl-10 text-[#f4f4f5] placeholder:text-[#3f3f46] focus:border-[#6366f1] focus:ring-[#6366f1]/20"
          />
        </div>
        <p className="mt-1.5 text-xs text-[#3f3f46]">
          Paste any LinkedIn profile URL to find matching YC jobs
        </p>
      </div>

      <Button
        type="submit"
        disabled={!url.trim() || isRunning}
        className="h-11 w-full bg-[#6366f1] text-white hover:bg-[#5558e6] disabled:opacity-50"
      >
        {isRunning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Running Agent...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Search Jobs
          </>
        )}
      </Button>
    </form>
  );
}
