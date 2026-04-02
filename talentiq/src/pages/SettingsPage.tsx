import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Trash2,

  Download,
  AlertTriangle,
  Github as GithubIcon,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useTheme } from '@/hooks/useTheme';



export function SettingsPage() {
  const navigate = useNavigate();
  const {
    workspaceName,
    runs,
    profile,
    setWorkspaceName,
    clearHistory,
    updateProfile,
  } = useWorkspaceStore();
  const { theme, setTheme } = useTheme();

  const handleResetOnboarding = () => {
    useWorkspaceStore.setState({ hasCompletedOnboarding: false });
    window.location.href = '/';
  };


  const [localName, setLocalName] = useState(workspaceName);
  const [nameSaved, setNameSaved] = useState(false);




  const handleNameSave = () => {
    if (localName.trim() && localName.trim() !== workspaceName) {
      setWorkspaceName(localName.trim());
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2000);
    }
  };

  const handleExportData = () => {
    const data = JSON.stringify(runs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'talentiq-runs.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure? This will delete all your data permanently.')) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const runsUsed = runs.length;
  const runsLimit = 50;
  const usagePercent = Math.min((runsUsed / runsLimit) * 100, 100);

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-md">
          <SettingsIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Settings
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Manage your workspace configuration
          </p>
        </div>
      </div>

      {/* Workspace name — Bug Fix #2 */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
        <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Workspace</h3>
        <label className="mb-1.5 block text-xs text-[var(--text-muted)]">Workspace Name</label>
        <div className="flex gap-2">
          <Input
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            onBlur={handleNameSave}
            onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
            className="h-10 border-[var(--border-color)] bg-[var(--bg-base)] text-[var(--text-primary)] focus:border-[#6366f1]"
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-[10px] text-[var(--text-muted)]">
            Press Enter or click outside to save
          </p>
          {nameSaved && (
            <span className="flex items-center gap-1 text-xs font-medium text-[#10b981] animate-fade-in">
              <CheckCircle2 className="h-3.5 w-3.5" /> Saved!
            </span>
          )}
        </div>
      </div>

      {/* Theme toggle — Bug Fix #3 */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
        <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-primary)]">Theme</p>
            <p className="text-xs text-[var(--text-muted)]">Choose your preferred appearance</p>
          </div>
          <div className="flex gap-1 rounded-xl bg-[var(--bg-base)] p-1">
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 ${
                theme === 'dark'
                  ? 'gradient-primary text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              Dark
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 ${
                theme === 'light'
                  ? 'gradient-primary text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
              Light
            </button>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
        <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">Connected Accounts</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-base)] border border-[var(--border-color)]">
              <GithubIcon className="h-5 w-5 text-[var(--text-primary)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">GitHub</p>
              <p className="text-xs text-[var(--text-muted)]">Connect repositories for analysis</p>
            </div>
          </div>
          {profile.githubUsername ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-[#10b981]/10 px-3 py-1 text-xs font-semibold text-[#10b981]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {profile.githubUsername}
              </span>
              <button
                onClick={() => updateProfile({ githubUsername: '' })}
                className="text-xs font-medium text-[var(--text-muted)] hover:text-[#ef4444]"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <Input
              placeholder="Enter GitHub Username"
              className="h-9 w-48 text-xs border-[var(--border-color)] bg-[var(--bg-base)] text-[var(--text-primary)] focus:border-[#6366f1]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateProfile({ githubUsername: e.currentTarget.value });
                }
              }}
              onBlur={(e) => {
                if (e.currentTarget.value) updateProfile({ githubUsername: e.currentTarget.value });
              }}
            />
          )}
        </div>
      </div>

      {/* Usage */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
        <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Usage — Free Tier</h3>
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>{runsUsed} runs used</span>
          <span>{runsLimit} limit</span>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-[var(--bg-elevated)]">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-300"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          {runsLimit - runsUsed} runs remaining in your free plan
        </p>
      </div>

      {/* Data Management */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
        <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Data Management</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleExportData}
            variant="outline"
            className="border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#6366f1] hover:bg-[#6366f1]/5"
          >
            <Download className="mr-2 h-4 w-4" />
            Export All Data
          </Button>
          <Button
            onClick={clearHistory}
            variant="outline"
            className="border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#f59e0b] hover:bg-[#f59e0b]/5"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Run History
          </Button>
          <Button
            onClick={handleResetOnboarding}
            variant="outline"
            className="border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#3b82f6] hover:bg-[#3b82f6]/5"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Reset Onboarding
          </Button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border border-[#ef4444]/20 bg-[#ef4444]/5 p-5">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-[#ef4444]" />
          <h3 className="text-sm font-semibold text-[#ef4444]">Danger Zone</h3>
        </div>
        <p className="mb-3 text-xs text-[var(--text-muted)]">
          This action cannot be undone. All data will be permanently deleted.
        </p>
        <Button
          onClick={handleDeleteAccount}
          variant="destructive"
          className="bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account & Data
        </Button>
      </div>
    </div>
  );
}
