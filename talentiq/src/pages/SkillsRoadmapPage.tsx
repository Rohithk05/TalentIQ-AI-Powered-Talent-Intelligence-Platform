import { useState } from 'react';
import { Map, Check, ExternalLink, BookOpen, Bot, Youtube, FileText } from 'lucide-react';
import { StepProgress } from '@/components/shared/StepProgress';
import { TagInput } from '@/components/shared/TagInput';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { generateSkillsRoadmap } from '@/services/groqService';
import { searchYouTubeVideo } from '@/services/youtubeService';
import { saveRun } from '@/services/dbService';
import { useAuth } from '@/hooks/useAuth';
import { Switch } from '@/components/ui/switch';

const jobSuggestions = ['SWE', 'ML Engineer', 'PM', 'Data Scientist', 'DevOps Engineer', 'UX Designer', 'Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'];

interface Phase {
  title: string;
  duration: string;
  color: string;
  gradient: string;
  skills: { 
    name: string; 
    hours: number; 
    difficulty: string; 
    resources: { title: string; url: string; type: string }[];
    video?: { title: string; url: string; thumbnail?: string };
  }[];
}

function generateRoadmap(dreamJob: string, currentSkills: string[]): Phase[] {
  const phases: Phase[] = [
    {
      title: 'Phase 1: Foundation',
      duration: '4-6 weeks',
      color: '#6366f1',
      gradient: 'from-[#6366f1] to-[#8b5cf6]',
      skills: [
        { name: 'TypeScript Fundamentals', hours: 20, difficulty: 'Beginner', resources: [{title: 'TypeScript Handbook', url: '#', type: 'docs'}] },
        { name: 'Git & Version Control', hours: 10, difficulty: 'Beginner', resources: [{title: 'Pro Git Book', url: '#', type: 'blog'}] },
        { name: 'Data Structures & Algorithms', hours: 30, difficulty: 'Intermediate', resources: [{title: 'NeetCode 150', url: '#', type: 'docs'}] },
      ],
    },
    {
      title: 'Phase 2: Core Skills',
      duration: '8-12 weeks',
      color: '#8b5cf6',
      gradient: 'from-[#8b5cf6] to-[#a78bfa]',
      skills: [
        { name: `${dreamJob.includes('Frontend') ? 'React & Next.js' : 'System Design'}`, hours: 40, difficulty: 'Intermediate', resources: [{title: 'Official Docs', url: '#', type: 'docs'}] },
        { name: `${dreamJob.includes('ML') ? 'Machine Learning Fundamentals' : 'API Design & REST'}`, hours: 35, difficulty: 'Intermediate', resources: [{title: 'API Design Patterns', url: '#', type: 'blog'}] },
        { name: 'Testing & Quality', hours: 20, difficulty: 'Intermediate', resources: [{title: 'Testing Library Docs', url: '#', type: 'docs'}] },
        { name: 'Cloud Fundamentals', hours: 25, difficulty: 'Intermediate', resources: [{title: 'AWS Free Tier', url: '#', type: 'docs'}] },
      ],
    },
    {
      title: 'Phase 3: Advanced',
      duration: '6-8 weeks',
      color: '#10b981',
      gradient: 'from-[#10b981] to-[#06b6d4]',
      skills: [
        { name: 'Performance Optimization', hours: 15, difficulty: 'Advanced', resources: [{title: 'Web Vitals Guide', url: '#', type: 'docs'}] },
        { name: 'Architecture Patterns', hours: 20, difficulty: 'Advanced', resources: [{title: 'Clean Architecture', url: '#', type: 'blog'}] },
        { name: 'Portfolio Project', hours: 40, difficulty: 'Advanced', resources: [{title: 'Build a full-stack app', url: '#', type: 'blog'}] },
      ],
    },
    {
      title: 'Phase 4: Job Ready',
      duration: '2-4 weeks',
      color: '#f59e0b',
      gradient: 'from-[#f59e0b] to-[#ef4444]',
      skills: [
        { name: 'Interview Prep', hours: 20, difficulty: 'Advanced', resources: [{title: 'LeetCode', url: '#', type: 'docs'}] },
        { name: 'Portfolio Polish', hours: 10, difficulty: 'Intermediate', resources: [{title: 'Personal Website', url: '#', type: 'blog'}] },
        { name: 'Networking', hours: 8, difficulty: 'Beginner', resources: [{title: 'LinkedIn Outreach', url: '#', type: 'blog'}] },
      ],
    },
  ];
  return phases;
}

export function SkillsRoadmapPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [dreamJob, setDreamJob] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLabel, setLoadingLabel] = useState('');
  const [roadmap, setRoadmap] = useState<Phase[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [showResources, setShowResources] = useState(true);

  const completedSkills = useWorkspaceStore((s) => s.completedSkills);
  const toggleSkill = useWorkspaceStore((s) => s.toggleSkill);

  const totalSkills = roadmap.reduce((acc, p) => acc + p.skills.length, 0);
  const completedCount = roadmap.reduce(
    (acc, p) => acc + p.skills.filter((s) => completedSkills.includes(s.name)).length, 0
  );
  const progressPct = totalSkills > 0 ? Math.round((completedCount / totalSkills) * 100) : 0;

  const totalHours = roadmap.reduce((acc, p) => acc + p.skills.reduce((a, s) => a + s.hours, 0), 0);
  const totalWeeks = hoursPerWeek > 0 ? Math.ceil(totalHours / hoursPerWeek) : 0;
  const totalMonths = Math.ceil(totalWeeks / 4);

  const handleSubmit = async () => {
    setStep(1);
    setLoadingLabel('Analyzing dream role requirements...');
    setLoadingProgress(20);

    try {
      const data = await generateSkillsRoadmap({
        dreamJob,
        currentSkills: skills,
        experienceLevel: experience,
        hoursPerWeek
      });
      setLoadingProgress(70);
      setLoadingLabel('Parsing roadmap...');
      
      const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];
      const gradients = [
        'from-[#6366f1] to-[#8b5cf6]',
        'from-[#8b5cf6] to-[#a78bfa]',
        'from-[#10b981] to-[#06b6d4]',
        'from-[#f59e0b] to-[#ef4444]',
        'from-[#ec4899] to-[#8b5cf6]'
      ];

      const mappedPhases: Phase[] = await Promise.all((data.phases || []).map(async (p: any, i: number) => {
        const enhancedSkills = await Promise.all(p.skills.map(async (s: any) => {
          const video = await searchYouTubeVideo(s.name);
          return {
            ...s,
            resources: s.resources || [],
            video
          };
        }));
        
        return {
          ...p,
          color: colors[i % colors.length],
          gradient: gradients[i % gradients.length],
          skills: enhancedSkills
        };
      }));

      setRoadmap(mappedPhases);
      setIsAiGenerated(true);

      if (user) {
        await saveRun(user.id, 'skills-roadmap', { dreamJob, skills, experience, hoursPerWeek }, data);
      }
    } catch (e) {
      setRoadmap(generateRoadmap(dreamJob, skills));
      setIsAiGenerated(false);
    }

    setLoadingProgress(100);
    setLoadingLabel('Done!');
    await new Promise((r) => setTimeout(r, 500));
    setStep(2);
  };

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate', icon: '🚀' },
    { value: 'advanced', label: 'Advanced', icon: '⚡' },
  ];

  const learningStyles = [
    { value: 'self-paced', label: 'Self-paced', icon: '📚' },
    { value: 'bootcamp', label: 'Bootcamp', icon: '🏕️' },
    { value: 'university', label: 'University', icon: '🎓' },
    { value: 'youtube', label: 'YouTube', icon: '📺' },
  ];

  const filteredSuggestions = jobSuggestions.filter(
    (s) => s.toLowerCase().includes(dreamJob.toLowerCase()) && dreamJob.length > 0
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in-up">
      <StepProgress steps={['Your Goals', 'Building', 'Roadmap']} currentStep={step} />

      {/* Step 1: Input */}
      {step === 0 && (
        <div className="mx-auto max-w-lg animate-fade-in-up">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-success shadow-lg shadow-[#10b981]/20">
              <Map className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Your Skills Roadmap
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Tell us your dream role and we'll create a personalized learning plan.
            </p>
          </div>

          <div className="space-y-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            {/* Dream job with autocomplete */}
            <div className="relative">
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Dream Job Title</label>
              <input
                value={dreamJob}
                onChange={(e) => { setDreamJob(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="e.g., ML Engineer"
                className="h-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)] focus:border-[#6366f1] focus:outline-none"
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-1 shadow-lg">
                  {filteredSuggestions.map((s) => (
                    <button
                      key={s}
                      onMouseDown={() => { setDreamJob(s); setShowSuggestions(false); }}
                      className="w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Current Skills</label>
              <TagInput
                tags={skills}
                onAdd={(t) => setSkills((prev) => [...prev, t])}
                onRemove={(t) => setSkills((prev) => prev.filter((s) => s !== t))}
                placeholder="Press Enter to add..."
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--text-muted)]">Experience Level</label>
              <div className="grid grid-cols-3 gap-2">
                {experienceLevels.map((lvl) => (
                  <button
                    key={lvl.value}
                    onClick={() => setExperience(lvl.value)}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      experience === lvl.value
                        ? 'border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]'
                        : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#6366f1]/30'
                    }`}
                  >
                    <div className="text-xl">{lvl.icon}</div>
                    <p className="mt-1 text-xs font-semibold">{lvl.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--text-muted)]">Learning Style</label>
              <div className="grid grid-cols-4 gap-2">
                {learningStyles.map((ls) => (
                  <button
                    key={ls.value}
                    onClick={() => setLearningStyle(ls.value)}
                    className={`rounded-xl border p-2.5 text-center transition-all ${
                      learningStyle === ls.value
                        ? 'border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]'
                        : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#6366f1]/30'
                    }`}
                  >
                    <div className="text-lg">{ls.icon}</div>
                    <p className="mt-0.5 text-[10px] font-semibold">{ls.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 flex items-center justify-between text-xs font-medium text-[var(--text-muted)]">
                Hours per Week
                <span className="font-bold text-[#6366f1]">{hoursPerWeek} hrs</span>
              </label>
              <input
                type="range"
                min={1}
                max={40}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-[#6366f1]"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!dreamJob}
              className="w-full rounded-xl gradient-success py-3 text-sm font-bold text-white shadow-lg shadow-[#10b981]/20 transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Map className="mr-2 inline h-4 w-4" />
              Generate My Roadmap
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Loading */}
      {step === 1 && (
        <div className="mx-auto max-w-lg animate-fade-in-up">
          <div className="rounded-2xl border border-[#10b981]/20 bg-[var(--bg-surface)] p-8">
            <Map className="mx-auto mb-4 h-8 w-8 text-[#10b981] animate-pulse" />
            <p className="text-center text-sm font-semibold text-[var(--text-primary)]">{loadingLabel}</p>
            <div className="mt-4 h-3 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div className="h-full rounded-full gradient-success transition-all duration-700" style={{ width: `${loadingProgress}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in-up">
          {isAiGenerated && (
            <div className="flex items-center justify-center gap-2 mb-2 animate-fade-in">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-3 py-1 text-xs font-semibold text-[#8b5cf6]">
                <Bot className="h-3.5 w-3.5" /> Powered by RK AI
              </span>
            </div>
          )}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Your roadmap to <span className="gradient-text">{dreamJob}</span>
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Estimated time: {totalMonths} months at {hoursPerWeek} hrs/week
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Show Resources</p>
              <p className="text-xs text-[var(--text-muted)]">Display recommended courses and videos for each skill</p>
            </div>
            <Switch checked={showResources} onCheckedChange={setShowResources} />
          </div>

          {/* Timeline */}
          <div className="relative space-y-8">
            {roadmap.map((phase, pi) => (
              <div key={pi} className="relative animate-fade-in-up" style={{ animationDelay: `${pi * 0.1}s` }}>
                <div className={`rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden`}>
                  <div className={`bg-gradient-to-r ${phase.gradient} px-6 py-3`}>
                    <h3 className="text-sm font-bold text-white">{phase.title}</h3>
                    <p className="text-xs text-white/70">{phase.duration}</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {phase.skills.map((skill) => {
                      const isCompleted = completedSkills.includes(skill.name);
                      return (
                        <div key={skill.name} className={`rounded-xl border p-4 transition-all ${
                          isCompleted ? 'border-[#10b981]/30 bg-[#10b981]/5' : 'border-[var(--border-color)]'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className={`text-sm font-semibold ${isCompleted ? 'text-[#10b981] line-through' : 'text-[var(--text-primary)]'}`}>
                                  {skill.name}
                                </p>
                                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                                  skill.difficulty === 'Beginner' ? 'bg-[#10b981]/10 text-[#10b981]'
                                  : skill.difficulty === 'Intermediate' ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                                  : 'bg-[#ef4444]/10 text-[#ef4444]'
                                }`}>
                                  {skill.difficulty}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-muted)] font-medium mb-1 mt-1">{skill.hours} hours estimated</p>
                              
                              {showResources && (
                                <div className="mt-3 space-y-2">
                                  {skill.resources && skill.resources.length > 0 && typeof skill.resources[0] === 'object' ? (
                                    <div className="flex flex-col gap-1.5">
                                      {skill.resources.map((r: any, idx: number) => (
                                        <a key={idx} href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-sm items-center gap-2 rounded-lg border border-[#3b82f6]/20 bg-[#3b82f6]/5 px-3 py-1.5 text-xs text-[var(--text-primary)] hover:border-[#3b82f6]/40 transition-colors">
                                          {r.type === 'blog' ? <FileText className="h-3.5 w-3.5 text-[#3b82f6] shrink-0" /> : <BookOpen className="h-3.5 w-3.5 text-[#3b82f6] shrink-0" />}
                                          <span className="truncate">{r.title}</span>
                                          <ExternalLink className="h-3 w-3 text-[#3b82f6] shrink-0 ml-auto" />
                                        </a>
                                      ))}
                                    </div>
                                  ) : skill.resources && skill.resources.length > 0 ? (
                                    <div className="flex flex-wrap gap-1.5">
                                      {skill.resources.map((r: any) => (
                                        <span key={typeof r === 'string' ? r : r.title} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--text-secondary)]">
                                          <BookOpen className="h-3 w-3" />
                                          {typeof r === 'string' ? r : r.title}
                                        </span>
                                      ))}
                                    </div>
                                  ) : null}

                                  {skill.video && (
                                    <a href={skill.video.url} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-sm items-center gap-2 rounded-lg border border-[#ef4444]/20 bg-[#ef4444]/5 px-3 py-1.5 text-xs text-[var(--text-primary)] hover:border-[#ef4444]/40 transition-colors">
                                      <Youtube className="h-4 w-4 text-[#ef4444] shrink-0" />
                                      <span className="truncate">{skill.video.title}</span>
                                      <ExternalLink className="h-3 w-3 text-[#ef4444] shrink-0 ml-auto" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => toggleSkill(skill.name)}
                              className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-lg border transition-all ${
                                isCompleted
                                  ? 'border-[#10b981] bg-[#10b981] text-white'
                                  : 'border-[var(--border-color)] text-transparent hover:border-[#10b981]'
                              }`}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Skills Progress</p>
              <span className="text-sm font-bold text-[#10b981]">{progressPct}%</span>
            </div>
            <div className="h-3 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div className="h-full rounded-full gradient-success transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{completedCount} of {totalSkills} skills completed</p>
          </div>

          <button
            onClick={() => { setStep(0); setRoadmap([]); setDreamJob(''); setSkills([]); }}
            className="mx-auto flex items-center gap-2 rounded-xl gradient-success px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90"
          >
            <BookOpen className="h-4 w-4" />
            Create New Roadmap
          </button>
        </div>
      )}
    </div>
  );
}
