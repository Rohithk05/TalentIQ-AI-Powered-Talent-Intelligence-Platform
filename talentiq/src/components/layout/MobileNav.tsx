import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Users,
  Sparkles,
  Settings,
} from 'lucide-react';

const items = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/jobs', icon: Search, label: 'Jobs' },
  { to: '/candidates', icon: Users, label: 'Screen' },
  { to: '/profile-enhancer', icon: Sparkles, label: 'Enhance' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function MobileNav() {
  return (
    <nav className="flex items-center justify-around border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-2 lg:hidden">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${
              isActive
                ? 'text-[#6366f1]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
