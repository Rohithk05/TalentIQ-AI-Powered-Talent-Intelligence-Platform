import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { JobSearchPage } from '@/pages/JobSearchPage';
import { CandidatePage } from '@/pages/CandidatePage';
import { RunHistoryPage } from '@/pages/RunHistoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { UserProfilePage } from '@/pages/UserProfilePage';
import { ProfileEnhancerPage } from '@/pages/ProfileEnhancerPage';
import { SkillsRoadmapPage } from '@/pages/SkillsRoadmapPage';
import { InterviewSchedulerPage } from '@/pages/InterviewSchedulerPage';
import { AuthPage } from '@/pages/AuthPage';
import { ToastContainer } from '@/components/shared/Toast';
import { useToast } from '@/hooks/useToast';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <Loader2 className="h-8 w-8 text-[#6366f1] animate-spin" />
      </div>
    );
  }
  if (!session) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function App() {
  const { toasts, dismissToast } = useToast();
  const { hasCompletedOnboarding } = useWorkspaceStore();
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <Loader2 className="h-8 w-8 text-[#6366f1] animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
        <Route path="/auth" element={session ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
        
        <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/jobs" element={<JobSearchPage />} />
          <Route path="/candidates" element={<CandidatePage />} />
          <Route path="/history" element={<RunHistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/profile-enhancer" element={<ProfileEnhancerPage />} />
          <Route path="/skills-roadmap" element={<SkillsRoadmapPage />} />
          <Route path="/interview-scheduler" element={<InterviewSchedulerPage />} />
        </Route>
      </Routes>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </BrowserRouter>
  );
}

export default App;
