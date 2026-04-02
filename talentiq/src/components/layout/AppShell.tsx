import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

export function AppShell() {
  // Initialize theme class on mount
  useTheme();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-base)]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
