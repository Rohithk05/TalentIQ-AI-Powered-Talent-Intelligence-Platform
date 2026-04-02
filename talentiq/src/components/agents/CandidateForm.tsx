import { useState } from 'react';
import { Users, Loader2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CandidateFormProps {
  onSubmit: (usernames: string[], role: string) => void;
  isRunning: boolean;
}

export function CandidateForm({ onSubmit, isRunning }: CandidateFormProps) {
  const [usernames, setUsernames] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const names = usernames
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);
    if (names.length > 0 && role.trim()) {
      onSubmit(names, role.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-[#f4f4f5]">
          GitHub Usernames
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-3 h-4 w-4 text-[#71717a]" />
          <textarea
            placeholder={"john-doe\njane-smith"}
            value={usernames}
            onChange={(e) => setUsernames(e.target.value)}
            disabled={isRunning}
            rows={3}
            className="w-full rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] py-2.5 pl-10 pr-3 text-sm text-[#f4f4f5] placeholder:text-[#3f3f46] focus:border-[#6366f1] focus:outline-none focus:ring-1 focus:ring-[#6366f1]/20"
          />
        </div>
        <p className="mt-1 text-xs text-[#3f3f46]">One username per line</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#f4f4f5]">
          Target Job Role
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717a]" />
          <Input
            type="text"
            placeholder="Senior Frontend Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isRunning}
            className="h-11 border-[#1f1f1f] bg-[#0a0a0a] pl-10 text-[#f4f4f5] placeholder:text-[#3f3f46] focus:border-[#6366f1] focus:ring-[#6366f1]/20"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!usernames.trim() || !role.trim() || isRunning}
        className="h-11 w-full bg-[#6366f1] text-white hover:bg-[#5558e6] disabled:opacity-50"
      >
        {isRunning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Screening Candidates...
          </>
        ) : (
          <>
            <Users className="mr-2 h-4 w-4" />
            Screen Candidates
          </>
        )}
      </Button>
    </form>
  );
}
