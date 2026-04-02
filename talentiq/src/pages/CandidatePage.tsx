import { useState } from 'react';
import { Users, Sparkles, Zap, MessageSquare, X } from 'lucide-react';
import { CandidateForm } from '@/components/agents/CandidateForm';
import { CandidateReportCard } from '@/components/agents/CandidateReportCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { StepProgress } from '@/components/shared/StepProgress';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { analyzeCandidate } from '@/services/groqService';
import { saveRun } from '@/services/dbService';
import { useAuth } from '@/hooks/useAuth';

const mockQuestions: Record<string, string[]> = {
  TypeScript: [
    'Explain the difference between `type` and `interface` in TypeScript.',
    'How would you implement a generic retry function with exponential backoff?',
    'What are conditional types and how would you use them?',
    'Explain `infer` keyword in TypeScript with an example.',
    'How do you handle strict null checks in a large codebase?',
  ],
  Python: [
    'Explain Python\'s GIL and its impact on multithreading.',
    'How would you implement a decorator that caches function results?',
    'What are metaclasses and when would you use them?',
    'Explain the difference between `__new__` and `__init__`.',
    'How do you handle memory-efficient processing of large datasets?',
  ],
  default: [
    'Describe your approach to designing a REST API for a social media platform.',
    'How would you optimize a slow database query in production?',
    'Explain the SOLID principles with practical examples.',
    'How do you handle error handling and logging in distributed systems?',
    'Describe your experience with CI/CD pipelines.',
  ],
};

export function CandidatePage() {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepLabel, setStepLabel] = useState('');
  const [results, setResults] = useState<any>(null);
  const [showQuestions, setShowQuestions] = useState<string | null>(null);

  const currentStep = !results && !isRunning ? 0 : isRunning ? 1 : 2;

  const handleSubmit = async (usernames: string[], role: string) => {
    setIsRunning(true);
    setResults(null);
    setProgress(20);
    setStepLabel('Fetching GitHub profiles...');

    try {
      const promises = usernames.map(u => analyzeCandidate(u, role));
      const candidatesData = await Promise.all(promises);
      
      const output = {
        candidates: candidatesData.map((c, i) => ({
          username: usernames[i],
          ...c
        }))
      };

      setProgress(100);
      setStepLabel('Analysis complete!');
      setResults(output);

      if (user) {
        await saveRun(user.id, 'candidate-screener', { usernames: usernames.join(', '), role }, output);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const getQuestionsForCandidate = (languages: string[]) => {
    const primary = languages[0];
    return mockQuestions[primary] || mockQuestions.default;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-fade-in-up">
      {/* Step indicators */}
      <StepProgress
        steps={['Enter Candidates', 'Screening', 'Results']}
        currentStep={currentStep}
      />

      {/* Step 1: Input */}
      {!isRunning && !results && (
        <div className="mx-auto max-w-lg animate-fade-in-up">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] shadow-lg shadow-[#8b5cf6]/20">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Screen Candidates
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Enter GitHub usernames and a target role. We'll analyze their profiles and generate detailed reports.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <CandidateForm onSubmit={handleSubmit} isRunning={isRunning} />
          </div>
        </div>
      )}

      {/* Step 2: Loading */}
      {isRunning && (
        <div className="mx-auto max-w-lg animate-fade-in-up">
          <div className="rounded-2xl border border-[#8b5cf6]/20 bg-[var(--bg-surface)] p-8">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-6 w-6 text-[#f59e0b] animate-pulse" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Screening in Progress</p>
                <p className="text-xs text-[var(--text-muted)]">{stepLabel}</p>
              </div>
            </div>
            <div className="h-3 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-right text-xs font-semibold text-[#8b5cf6]">{progress}%</p>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {results && !isRunning && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Screening Results
            </h3>
            <span className="text-xs text-[var(--text-muted)]">
              {results.candidates.length} candidates evaluated
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 animate-stagger">
            {results.candidates.map((candidate) => (
              <div key={candidate.username} className="space-y-2">
                <CandidateReportCard candidate={candidate} />
                <button
                  onClick={() => setShowQuestions(showQuestions === candidate.username ? null : candidate.username)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-2.5 text-xs font-semibold text-[#6366f1] transition-colors hover:bg-[#6366f1]/5"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Generate Interview Questions
                </button>
                {showQuestions === candidate.username && (
                  <div className="rounded-xl border border-[#6366f1]/20 bg-[var(--bg-surface)] p-4 animate-fade-in-up">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-[var(--text-primary)]">
                        Technical Questions for @{candidate.username}
                      </p>
                      <button onClick={() => setShowQuestions(null)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <ol className="space-y-2">
                      {getQuestionsForCandidate(candidate.topLanguages).map((q, i) => (
                        <li key={i} className="flex gap-2 text-xs text-[var(--text-secondary)]">
                          <span className="shrink-0 font-bold text-[#6366f1]">{i + 1}.</span>
                          {q}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => { setResults(null); }}
            className="mx-auto flex items-center gap-2 rounded-xl gradient-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
          >
            Screen More Candidates
          </button>
        </div>
      )}
    </div>
  );
}
