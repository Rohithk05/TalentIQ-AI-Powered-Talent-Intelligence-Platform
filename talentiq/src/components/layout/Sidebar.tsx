import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Users,
  History,
  Settings,
  Sparkles,
  Map,
  Calendar,
  User,
  ChevronRight,
  Zap,
  LogOut,
} from 'lucide-react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useAuth } from '@/hooks/useAuth';

const mainNav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/jobs', icon: Search, label: 'Job Search' },
  { to: '/candidates', icon: Users, label: 'Candidates' },
];

const aiNav = [
  { to: '/profile-enhancer', icon: Sparkles, label: 'Profile Enhancer', badge: 'AI' },
  { to: '/skills-roadmap', icon: Map, label: 'Skills Roadmap', badge: 'AI' },
  { to: '/interview-scheduler', icon: Calendar, label: 'Interview Prep', badge: 'AI' },
];

const bottomNav = [
  { to: '/history', icon: History, label: 'Run History' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const profile = useWorkspaceStore((s) => s.profile);
  const runs = useWorkspaceStore((s) => s.runs);
  const savedJobs = useWorkspaceStore((s) => s.savedJobs);
  const runsUsed = runs.length;
  const runsLimit = 50;
  const usagePercent = Math.min((runsUsed / runsLimit) * 100, 100);

  const renderNavItem = (item: { to: string; icon: React.ElementType; label: string; badge?: string }) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-[#6366f1]/15 to-[#8b5cf6]/10 text-[var(--text-primary)] border-l-[3px] border-l-[#6366f1]'
            : 'border-l-[3px] border-l-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
        }`
      }
    >
      <item.icon className="h-[18px] w-[18px] shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span className="rounded-md bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-1.5 py-0.5 text-[9px] font-bold text-white">
          {item.badge}
        </span>
      )}
      {item.label === 'Job Search' && savedJobs.length > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6366f1] text-[9px] font-bold text-white">
          {savedJobs.length}
        </span>
      )}
    </NavLink>
  );

  const initials = profile.name
    ? profile.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'RK';

  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-r border-[var(--border-color)] bg-[var(--bg-surface)] lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
          TalentIQ
        </span>
        <span className="ml-auto rounded-full bg-[#6366f1]/10 px-2 py-0.5 text-[10px] font-bold text-[#6366f1]">
          BETA
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="mt-1 flex flex-1 flex-col px-3">
        <div className="space-y-0.5">
          {mainNav.map(renderNavItem)}
        </div>

        {/* Separator */}
        <div className="my-3 h-px bg-[var(--border-color)]" />

        {/* AI Features */}
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          AI Tools
        </p>
        <div className="space-y-0.5">
          {aiNav.map(renderNavItem)}
        </div>

        {/* Separator */}
        <div className="my-3 h-px bg-[var(--border-color)]" />

        <div className="space-y-0.5">
          {bottomNav.map(renderNavItem)}
        </div>

        <div className="flex-1" />
      </nav>

      {/* User + Plan */}
      <div className="border-t border-[var(--border-color)] px-4 py-3">
        {/* Usage bar */}
        <div className="mb-3 rounded-xl bg-[var(--bg-elevated)] p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[var(--text-primary)]">Free Plan</p>
            <span className="text-[10px] text-[var(--text-muted)]">{runsUsed}/{runsLimit}</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-[var(--border-color)]">
            <div
              className="h-full rounded-full gradient-primary transition-all duration-300"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <button className="mt-2 w-full rounded-lg gradient-primary py-1.5 text-[10px] font-semibold text-white transition-opacity hover:opacity-90">
            Upgrade to Pro
          </button>
        </div>

        {/* User profile link */}
        <div className="flex w-full items-center gap-2 mt-2">
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-1 items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[var(--bg-elevated)]"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${profile.avatarColor} text-sm font-bold text-white`}>
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{profile.name || 'User'}</p>
              <p className="truncate text-[10px] text-[var(--text-muted)]">{profile.title || 'Edit Profile'}</p>
            </div>
          </button>
          <button
            onClick={signOut}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[var(--text-muted)] transition-colors hover:bg-red-500/10 hover:text-red-500"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
