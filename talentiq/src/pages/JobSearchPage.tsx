import { useState } from 'react';
import { Search, Sparkles, User, Zap, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { JobSearchForm } from '@/components/agents/JobSearchForm';
import { JobResultCard } from '@/components/agents/JobResultCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { StepProgress } from '@/components/shared/StepProgress';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { matchJobs } from '@/services/groqService';
import { saveRun } from '@/services/dbService';
import { useAuth } from '@/hooks/useAuth';

export function JobSearchPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepLabel, setStepLabel] = useState('');
  const [results, setResults] = useState<any>(null);
  const savedJobs = useWorkspaceStore((s) => s.savedJobs);
  const saveJob = useWorkspaceStore((s) => s.saveJob);
  const removeJob = useWorkspaceStore((s) => s.removeJob);

  const currentStep = !results && !isRunning ? 0 : isRunning ? 1 : 2;

  const handleSubmit = async (url: string) => {
    setResults(null);
    setIsRunning(true);
    setProgress(20);
    setStepLabel('Analyzing profile...');

    try {
      const output = await matchJobs(url);
      setProgress(70);
      setStepLabel('Finding job matches...');
      if (output && output.jobs) {
        setResults(output);
        setProgress(100);
        setStepLabel('Done!');
        if (user) {
          await saveRun(user.id, 'job-search', { linkedinUrl: url }, output);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  const isJobSaved = (jobId: string) => savedJobs.some((j) => j.id === jobId);

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-fade-in-up">
      {/* Step indicators */}
      <StepProgress
        steps={['Enter Profile', 'Analyzing', 'Results']}
        currentStep={currentStep}
      />

      {/* Step 1: Input */}
      {!isRunning && !results && (
        <div className="mx-auto max-w-lg animate-fade-in-up">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-[#6366f1]/20">
              <Search className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Paste your LinkedIn URL
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              We'll analyze your profile and find matching YC startup jobs ranked by relevance.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <JobSearchForm onSubmit={handleSubmit} isRunning={isRunning} />
          </div>
        </div>
      )}

      {/* Step 2: Loading */}
      {isRunning && (
        <div className="mx-auto max-w-lg animate-fade-in-up">
          <div className="rounded-2xl border border-[#6366f1]/20 bg-[var(--bg-surface)] p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Zap className="h-6 w-6 text-[#f59e0b] animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Agent Running</p>
                <p className="text-xs text-[var(--text-muted)]">{stepLabel}</p>
              </div>
            </div>
            <div className="h-3 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div
                className="h-full rounded-full gradient-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>{stepLabel}</span>
              <span className="font-semibold text-[#6366f1]">{progress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {results && !isRunning && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Profile summary */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-white shadow-lg shadow-[#6366f1]/20">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                    {results.profile.name}
                  </h3>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{results.profile.headline}</p>
                  {results.profile.summary && (
                    <p className="mt-2 text-xs text-[var(--text-secondary)] max-w-xl leading-relaxed">
                      {results.profile.summary}
                    </p>
                  )}
                </div>
              </div>
              {/* Confidence gauge */}
              <div className="relative h-16 w-16">
                <svg className="-rotate-90 h-16 w-16" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border-color)" strokeWidth="5" />
                  <circle
                    cx="32" cy="32" r="28" fill="none" stroke="#10b981" strokeWidth="5"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 - (results.profile.confidenceScore / 100) * 2 * Math.PI * 28}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-[#10b981]">{results.profile.confidenceScore}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-[#6366f1]/10 px-3 py-1 text-xs font-semibold text-[#6366f1]">
                {results.profile.domain}
              </span>
              {results.profile.skills.map((skill: string) => (
                <span key={skill} className="rounded-lg bg-[var(--bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CTA: Enhance Profile */}
          <button
            onClick={() => navigate('/profile-enhancer')}
            className="flex w-full items-center gap-4 rounded-2xl border border-[#f59e0b]/20 bg-gradient-to-r from-[#f59e0b]/5 to-transparent p-4 text-left transition-all hover:border-[#f59e0b]/40"
          >
            <Sparkles className="h-5 w-5 text-[#f59e0b]" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Enhance Profile for These Jobs</p>
              <p className="text-xs text-[var(--text-muted)]">Optimize your LinkedIn for {results.profile.domain} roles</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#f59e0b]" />
          </button>

          {/* Job results */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                Top Matches
              </h3>
              <span className="text-xs text-[var(--text-muted)]">{results.jobs.length} jobs found</span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 animate-stagger">
              {results.jobs.map((job: any, i: number) => (
                <div key={job.id} className="relative">
                  <JobResultCard job={job} rank={i + 1} />
                  <button
                    onClick={() => isJobSaved(job.id) ? removeJob(job.id) : saveJob(job)}
                    className={`absolute right-3 top-3 rounded-lg p-1.5 transition-colors ${
                      isJobSaved(job.id) ? 'bg-[#6366f1]/10 text-[#6366f1]' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[#6366f1]'
                    }`}
                  >
                    {isJobSaved(job.id) ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Saved jobs section */}
          {savedJobs.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">
                Saved Jobs ({savedJobs.length})
              </h3>
              <div className="space-y-2">
                {savedJobs.map((job: any) => (
                  <div key={job.id} className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3">
                    <div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{job.title}</span>
                      <span className="ml-2 text-xs text-[var(--text-muted)]">@ {job.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#10b981]">{job.matchScore}%</span>
                      <button onClick={() => removeJob(job.id)} className="text-[var(--text-muted)] hover:text-[#ef4444]">
                        <BookmarkCheck className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
