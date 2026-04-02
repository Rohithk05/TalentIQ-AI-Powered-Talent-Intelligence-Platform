import { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Bot, Upload, FileText } from 'lucide-react';
import { StepProgress } from '@/components/shared/StepProgress';
import { TagInput } from '@/components/shared/TagInput';
import { enhanceProfile } from '@/services/groqService';
import { saveRun } from '@/services/dbService';
import { useAuth } from '@/hooks/useAuth';

interface FormData {
  jobTitle: string;
  experience: string;
  skills: string[];
  targetRole: string;
  bio: string;
  resumeText: string;
}

const loadingSteps = [
  { label: 'Analyzing your current profile...', endPct: 30 },
  { label: 'Identifying skill gaps...', endPct: 65 },
  { label: 'Generating recommendations...', endPct: 90 },
  { label: 'Polishing suggestions...', endPct: 100 },
];

export function ProfileEnhancerPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    jobTitle: '',
    experience: '',
    skills: [],
    targetRole: '',
    bio: '',
    resumeText: '',
  });
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLabel, setLoadingLabel] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Dynamic Results State
  const [headlines, setHeadlines] = useState<{text: string, score: number}[]>([]);
  const [improvedBio, setImprovedBio] = useState('');
  const [skillRelevance, setSkillRelevance] = useState<{skill: string, relevance: number}[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [beforeScore, setBeforeScore] = useState(62);
  const [afterScore, setAfterScore] = useState(89);
  const [animatedAfter, setAnimatedAfter] = useState(62);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [resumeSuggestions, setResumeSuggestions] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm(f => ({ ...f, resumeText: event.target?.result as string }));
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    setStep(1);
    setLoadingLabel('Connecting to RK AI...');
    let finalAfterScore = 89;
    try {
      const data = await enhanceProfile({
        currentTitle: form.jobTitle,
        yearsOfExperience: form.experience,
        currentSkills: form.skills,
        targetRole: form.targetRole,
        bio: form.bio,
        resumeText: form.resumeText
      });
      setLoadingProgress(60);
      setLoadingLabel('Parsing recommendations...');
      
      setHeadlines(data.headlineSuggestions || []);
      setImprovedBio(data.summaryRewrite || '');
      setSkillRelevance(data.skillsToHighlight || []);
      setMissingKeywords(data.missingKeywords || []);
      setBeforeScore(data.beforeScore || 62);
      
      finalAfterScore = data.afterScore || 89;
      setAfterScore(finalAfterScore);
      setResumeSuggestions(data.resumeSuggestions || null);
      setIsAiGenerated(true);

      if (user) {
        await saveRun(user.id, 'profile-enhancer', form, data);
      }
    } catch (e) {
      // Fallback
      setHeadlines([
        { text: `Senior ${form.targetRole || 'Engineer'} | ${form.skills[0] || 'Tech'} Expert | Building Innovative Solutions`, score: 94 },
        { text: `${form.targetRole || 'Engineer'} specializing in ${form.skills.slice(0, 2).join(' & ') || 'technology'} | ${form.experience || '3+'} years driving impact`, score: 89 },
        { text: `Passionate ${form.targetRole || 'Engineer'} | ${form.skills[0] || 'Technology'} | Open to ${form.targetRole || 'new'} opportunities`, score: 81 },
      ]);
      setImprovedBio(form.bio ? `Results-driven ${form.targetRole || 'professional'} with ${form.experience || 'extensive'} years of experience in ${form.skills.slice(0, 3).join(', ') || 'technology'}. ${form.bio} Eager to leverage expertise in ${form.targetRole || 'engineering'} to drive innovation and deliver impactful solutions.` : `Dynamic ${form.targetRole || 'professional'} with a proven track record in ${form.skills.join(', ') || 'technology'}. Passionate about building scalable solutions and driving team excellence.`);
      setSkillRelevance(form.skills.map((s, i) => ({ skill: s, relevance: Math.max(98 - i * 8, 55) })));
      setMissingKeywords(['agile', 'cross-functional', 'data-driven', 'scalable', 'mentorship', 'CI/CD', 'microservices', 'stakeholder management'].filter((k) => !form.skills.map((s) => s.toLowerCase()).includes(k)).slice(0, 6));
      setBeforeScore(62);
      setAfterScore(89);
      setResumeSuggestions({
        formatting: ["Use a clean, single-column layout", "Ensure consistent margins", "Use standard fonts like Arial or Calibri"],
        contentImprovements: ["Tailor summary to the target role", "Highlight major achievements", "Remove outdated experience", "Use strong action verbs"],
        quantifyAchievements: ["Increased performance by X%", "Managed a team of Y people", "Reduced latency by Z ms"],
        atsOptimization: ["Include core technologies from target job description", "Use standard section headers", "Avoid tables and graphics"],
        overallResumeScore: 60,
        improvedResumeScore: 90
      });
      setIsAiGenerated(false);
    }

    setLoadingProgress(100);
    setLoadingLabel('Done!');
    setAnimatedAfter(62);
    await new Promise((r) => setTimeout(r, 500));
    setStep(2);
    setTimeout(() => setAnimatedAfter(finalAfterScore), 300);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in-up">
      <StepProgress steps={['Your Info', 'Analyzing', 'Recommendations']} currentStep={step} />

      {/* Step 1: Input */}
      {step === 0 && (
        <div className="mx-auto max-w-lg animate-fade-in-up">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-warm shadow-lg shadow-[#f59e0b]/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Enhance Your Profile
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Tell us about yourself and we'll generate optimized profile content.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Current Job Title</label>
              <input
                value={form.jobTitle}
                onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
                placeholder="Software Engineer"
                className="h-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)] focus:border-[#6366f1] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Years of Experience</label>
              <select
                value={form.experience}
                onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
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

            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Current Skills</label>
              <TagInput
                tags={form.skills}
                onAdd={(t) => setForm((f) => ({ ...f, skills: [...f.skills, t] }))}
                onRemove={(t) => setForm((f) => ({ ...f, skills: f.skills.filter((s) => s !== t) }))}
                placeholder="Press Enter to add a skill..."
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Target Role</label>
              <input
                value={form.targetRole}
                onChange={(e) => setForm((f) => ({ ...f, targetRole: e.target.value }))}
                placeholder="Senior Frontend Engineer"
                className="h-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)] focus:border-[#6366f1] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Brief Bio / LinkedIn Summary</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value.slice(0, 500) }))}
                rows={3}
                placeholder="Tell us about your experience..."
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] p-3 text-sm text-[var(--text-primary)] focus:border-[#6366f1] focus:outline-none"
              />
              <p className="text-right text-[10px] text-[var(--text-muted)]">{form.bio.length}/500</p>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--text-muted)]">Upload your resume (optional)</label>
              <div className="relative flex items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-base)] px-6 py-6 transition-all hover:border-[#6366f1]/50 hover:bg-[#6366f1]/5 cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <Upload className="mx-auto mb-2 h-6 w-6 text-[var(--text-muted)]" />
                  {resumeFileName ? (
                    <p className="text-sm font-semibold text-[#6366f1]">{resumeFileName}</p>
                  ) : (
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="font-semibold text-[#6366f1]">Click to upload</span> or drag and drop
                    </p>
                  )}
                  <p className="mt-1 text-xs text-[var(--text-muted)]">.pdf or .txt</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!form.jobTitle || !form.targetRole}
              className="w-full rounded-xl gradient-primary py-3 text-sm font-bold text-white shadow-lg shadow-[#6366f1]/20 transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Sparkles className="mr-2 inline h-4 w-4" />
              Enhance My Profile
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Loading */}
      {step === 1 && (
        <div className="mx-auto max-w-lg animate-fade-in-up">
          <div className="rounded-2xl border border-[#f59e0b]/20 bg-[var(--bg-surface)] p-8">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-[#f59e0b] animate-pulse" />
            <p className="text-center text-sm font-semibold text-[var(--text-primary)]">{loadingLabel}</p>
            <div className="mt-4 h-3 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div
                className="h-full rounded-full gradient-warm transition-all duration-700"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="mt-2 text-center text-xs text-[var(--text-muted)]">{loadingProgress}%</p>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 2 && (
        <div className="space-y-6 animate-stagger">
          {isAiGenerated && (
            <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-3 py-1 text-xs font-semibold text-[#8b5cf6]">
                <Bot className="h-3.5 w-3.5" /> Powered by RK AI
              </span>
            </div>
          )}

          {/* Headline Suggestions */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h3 className="mb-4 text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              💡 Headline Suggestions
            </h3>
            <div className="space-y-3">
              {headlines.map((h, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] p-4">
                  <div className="flex-1">
                    <p className="text-sm text-[var(--text-primary)]">{h.text}</p>
                    <span className="mt-1 inline-block rounded-full bg-[#10b981]/10 px-2 py-0.5 text-[10px] font-bold text-[#10b981]">
                      {h.score}% effective
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(h.text, `headline-${i}`)}
                    className="shrink-0 rounded-lg bg-[var(--bg-elevated)] p-2 text-[var(--text-muted)] transition-colors hover:text-[#6366f1]"
                  >
                    {copiedId === `headline-${i}` ? <Check className="h-4 w-4 text-[#10b981]" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Rewrite */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h3 className="mb-3 text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              ✍️ Summary Rewrite
            </h3>
            <div className="flex items-start gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] p-4">
              <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{improvedBio}</p>
              <button
                onClick={() => copyToClipboard(improvedBio, 'bio')}
                className="shrink-0 rounded-lg bg-[var(--bg-elevated)] p-2 text-[var(--text-muted)] transition-colors hover:text-[#6366f1]"
              >
                {copiedId === 'bio' ? <Check className="h-4 w-4 text-[#10b981]" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Skills to Highlight */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h3 className="mb-3 text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              🎯 Skills to Highlight
            </h3>
            <div className="space-y-2">
              {skillRelevance.map((s) => (
                <div key={s.skill} className="flex items-center gap-3">
                  <span className="w-28 text-sm text-[var(--text-primary)]">{s.skill}</span>
                  <div className="flex-1 h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-primary"
                      style={{ width: `${s.relevance}%`, transition: 'width 0.8s ease' }}
                    />
                  </div>
                  <span className="w-10 text-right text-xs font-bold text-[#6366f1]">{s.relevance}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h3 className="mb-3 text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              🔑 Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/5 px-3 py-1.5 text-xs font-medium text-[#6366f1]">
                  {k}
                  <ArrowRight className="h-3 w-3" />
                </span>
              ))}
            </div>
          </div>

          {/* Profile Score */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h3 className="mb-4 text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              📊 Profile Score
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)] mb-2">Current</p>
                <p className="text-4xl font-bold text-[#ef4444]">{beforeScore}</p>
                <div className="mt-2 h-2 rounded-full bg-[var(--bg-elevated)]">
                  <div className="h-full rounded-full bg-[#ef4444]" style={{ width: `${beforeScore}%` }} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)] mb-2">Enhanced</p>
                <p className="text-4xl font-bold text-[#10b981]">{animatedAfter}</p>
                <div className="mt-2 h-2 rounded-full bg-[var(--bg-elevated)]">
                  <div
                    className="h-full rounded-full gradient-success transition-all duration-1000"
                    style={{ width: `${animatedAfter}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resume Analysis */}
          {resumeSuggestions && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#f59e0b]" />
                <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Resume Analysis
                </h3>
              </div>
              
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-3 py-1 text-xs font-semibold text-[#8b5cf6]">
                      <Bot className="h-3.5 w-3.5" /> Powered by AI
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[var(--text-muted)]">Resume Score Improvement</p>
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <span className="text-sm font-medium text-[#ef4444]">{resumeSuggestions.overallResumeScore}</span>
                      <ArrowRight className="h-3 w-3 text-[var(--text-muted)]" />
                      <span className="text-lg font-bold text-[#10b981]">{resumeSuggestions.improvedResumeScore}</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/5 p-5">
                    <h4 className="font-semibold text-[#f59e0b] mb-3 text-sm">Formatting Tips</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                      {resumeSuggestions.formatting?.map((tip: string, i: number) => (
                        <li key={i} className="flex gap-2"><span className="text-[#f59e0b]">•</span> {tip}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/5 p-5">
                    <h4 className="font-semibold text-[#3b82f6] mb-3 text-sm">Content Improvements</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                      {resumeSuggestions.contentImprovements?.map((tip: string, i: number) => (
                        <li key={i} className="flex gap-2"><span className="text-[#3b82f6]">•</span> {tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-[#10b981]/20 bg-[#10b981]/5 p-5">
                    <h4 className="font-semibold text-[#10b981] mb-3 text-sm">Quantify Achievements</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                      {resumeSuggestions.quantifyAchievements?.map((tip: string, i: number) => (
                        <li key={i} className="flex gap-2"><span className="text-[#10b981]">•</span> {tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 p-5">
                    <h4 className="font-semibold text-[#8b5cf6] mb-3 text-sm">ATS Optimization</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                      {resumeSuggestions.atsOptimization?.map((tip: string, i: number) => (
                        <li key={i} className="flex gap-2"><span className="text-[#8b5cf6]">•</span> {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => { setStep(0); setForm({ jobTitle: '', experience: '', skills: [], targetRole: '', bio: '', resumeText: '' }); setResumeFileName(''); }}
            className="mx-auto flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90"
          >
            Enhance Another Profile
          </button>
        </div>
      )}
    </div>
  );
}
