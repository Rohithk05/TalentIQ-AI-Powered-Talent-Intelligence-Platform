import { useState, useEffect } from 'react';
import { User, Linkedin, Github, Save, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useAuth } from '@/hooks/useAuth';
import { saveProfile, getProfile } from '@/services/dbService';

const avatarColors = [
  'from-indigo-500 to-violet-500',
  'from-pink-500 to-rose-500',
  'from-green-500 to-emerald-500',
  'from-amber-500 to-orange-500',
  'from-cyan-500 to-blue-500',
  'from-red-500 to-pink-500',
  'from-violet-500 to-purple-500',
  'from-teal-500 to-cyan-500',
];

export function UserProfilePage() {
  const { profile, updateProfile, totalRuns, jobsMatched, candidatesScreened, profileCompleteness } = useProfile();
  const completedSkills = useWorkspaceStore((s) => s.completedSkills);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [localProfile, setLocalProfile] = useState(profile);
  const { user } = useAuth();
  
  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      if (user) {
        const dbProfile = await getProfile(user.id);
        if (dbProfile) setLocalProfile(prev => ({ ...prev, ...dbProfile }));
      }
    }
    loadData();
  }, [user]);

  const handleSave = async () => {
    setSaveState('saving');
    updateProfile(localProfile);
    if (user) {
      await saveProfile(user.id, localProfile);
    }
    setSaveState('saved');
    setTimeout(() => setSaveState('idle'), 2000);
  };

  const initials = localProfile.name
    ? localProfile.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
        Your Profile
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
        {/* Left card: Avatar */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 text-center">
          <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${localProfile.avatarColor} text-3xl font-bold text-white shadow-lg`}>
            {initials}
          </div>
          <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">{localProfile.name || 'Your Name'}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{localProfile.title || 'Your Title'}</p>
          <span className="mt-2 inline-block rounded-full bg-[#6366f1]/10 px-3 py-1 text-[10px] font-bold text-[#6366f1]">Free Plan</span>

          {/* Avatar color picker */}
          <div className="mt-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">Avatar Color</p>
            <div className="flex flex-wrap justify-center gap-2">
              {avatarColors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setLocalProfile((p) => ({ ...p, avatarColor: color }));
                  }}
                  className={`h-7 w-7 rounded-full bg-gradient-to-br ${color} transition-transform hover:scale-110 ${
                    localProfile.avatarColor === color
                      ? 'ring-2 ring-[#6366f1] ring-offset-2 ring-offset-[var(--bg-surface)]'
                      : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right card: Fields */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-4">
          {[
            { key: 'name', label: 'Full Name', type: 'text' },
            { key: 'title', label: 'Current Job Title', type: 'text' },
            { key: 'location', label: 'Location', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
          ].map((field) => (
            <div key={field.key}>
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">{field.label}</label>
              <Input
                type={field.type}
                value={localProfile[field.key as keyof typeof localProfile]}
                onChange={(e) => setLocalProfile((p) => ({ ...p, [field.key]: e.target.value }))}
                className="h-10 border-[var(--border-color)] bg-[var(--bg-base)] text-[var(--text-primary)] focus:border-[#6366f1]"
              />
            </div>
          ))}

          {/* Bio */}
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Bio</label>
            <textarea
              value={localProfile.bio}
              onChange={(e) => setLocalProfile((p) => ({ ...p, bio: e.target.value.slice(0, 200) }))}
              rows={3}
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] p-3 text-sm text-[var(--text-primary)] focus:border-[#6366f1] focus:outline-none"
            />
            <p className="text-right text-[10px] text-[var(--text-muted)]">{localProfile.bio.length}/200</p>
          </div>

          {/* LinkedIn */}
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
              <Linkedin className="h-3 w-3" /> LinkedIn URL
            </label>
            <Input
              value={localProfile.linkedinUrl}
              onChange={(e) => setLocalProfile((p) => ({ ...p, linkedinUrl: e.target.value }))}
              placeholder="https://linkedin.com/in/username"
              className="h-10 border-[var(--border-color)] bg-[var(--bg-base)] text-[var(--text-primary)] focus:border-[#6366f1]"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
              <Github className="h-3 w-3" /> GitHub Username
            </label>
            <Input
              value={localProfile.githubUsername}
              onChange={(e) => setLocalProfile((p) => ({ ...p, githubUsername: e.target.value }))}
              placeholder="username"
              className="h-10 border-[var(--border-color)] bg-[var(--bg-base)] text-[var(--text-primary)] focus:border-[#6366f1]"
            />
          </div>

          {/* Dream Job */}
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Dream Job</label>
            <Input
              value={localProfile.dreamJob}
              onChange={(e) => setLocalProfile((p) => ({ ...p, dreamJob: e.target.value }))}
              placeholder="e.g., ML Engineer at Google"
              className="h-10 border-[var(--border-color)] bg-[var(--bg-base)] text-[var(--text-primary)] focus:border-[#6366f1]"
            />
          </div>

          {/* Years */}
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Years of Experience</label>
            <select
              value={localProfile.yearsOfExperience}
              onChange={(e) => setLocalProfile((p) => ({ ...p, yearsOfExperience: e.target.value }))}
              className="h-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)] focus:border-[#6366f1] focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          <Button
            onClick={handleSave}
            disabled={saveState === 'saving'}
            className="w-full gradient-primary text-white hover:opacity-90"
          >
            {saveState === 'saving' ? (
              'Saving...'
            ) : saveState === 'saved' ? (
              <><Check className="mr-2 h-4 w-4" />Saved ✓</>
            ) : (
              <><Save className="mr-2 h-4 w-4" />Save Profile</>
            )}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Total Runs', value: totalRuns, color: '#6366f1' },
          { label: 'Jobs Matched', value: jobsMatched, color: '#10b981' },
          { label: 'Candidates Screened', value: candidatesScreened, color: '#8b5cf6' },
          { label: 'Skills Completed', value: completedSkills.length, color: '#f59e0b' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Profile completeness */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Profile Completeness</p>
          <span className="text-sm font-bold text-[#6366f1]">{profileCompleteness}%</span>
        </div>
        <div className="h-3 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-500"
            style={{ width: `${profileCompleteness}%` }}
          />
        </div>
      </div>
    </div>
  );
}
