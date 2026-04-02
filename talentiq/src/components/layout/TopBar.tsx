import { Bell, Moon, Sun } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/jobs': 'Job Search Agent',
  '/candidates': 'Candidate Screener',
  '/history': 'Run History',
  '/settings': 'Settings',
  '/profile-enhancer': 'Profile Enhancer',
  '/interview-scheduler': 'Interview Prep',
  '/skills-roadmap': 'Skills Roadmap',
  '/profile': 'Your Profile',
};

export function TopBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const profile = useWorkspaceStore((s) => s.profile);
  const title = pageTitles[location.pathname] || 'TalentIQ';

  const initials = profile.name
    ? profile.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'RK';

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-surface)]/80 px-6 backdrop-blur-md">
      {/* Title */}
      <div>
        <h1 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#6366f1]" />
        </Button>

        {/* Avatar */}
        <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${profile.avatarColor} text-xs font-bold text-white`}>
          {initials}
        </div>
      </div>
    </header>
  );
}
