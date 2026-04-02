import { useState } from 'react';
import { Calendar, Clock, MapPin, Search, Briefcase, Plus, Copy, Check, CalendarPlus, Bot, Youtube, ExternalLink, Lightbulb, PlayCircle } from 'lucide-react';
import { StepProgress } from '@/components/shared/StepProgress';
import { TagInput } from '@/components/shared/TagInput';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { generateInterviewPlan } from '@/services/groqService';
import { searchYouTubeVideo } from '@/services/youtubeService';
import { saveRun } from '@/services/dbService';
import { useAuth } from '@/hooks/useAuth';

interface InterviewForm {
  name: string;
  company: string;
  role: string;
  timezone: string;
  availability: string[];
  format: string;
  notice: string;
}

export function InterviewSchedulerPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<InterviewForm>({
    name: useWorkspaceStore.getState().profile.name || '',
    company: '',
    role: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    availability: ['Mon-Fri 2PM-5PM'],
    format: 'Virtual (Video)',
    notice: '2 Weeks',
  });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLabel, setLoadingLabel] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [prepSchedule, setPrepSchedule] = useState<any[]>([]);
  const [interviewTimeline, setInterviewTimeline] = useState<any[]>([]);
  const [recommendedResources, setRecommendedResources] = useState<any[]>([]);
  const [practiceQuestions, setPracticeQuestions] = useState<any[]>([]);
  const [youtubeVideo, setYoutubeVideo] = useState<any>(null);

  const mockTimeline = [
    { day: 'Day 1', task: 'Company Research', desc: `Deep dive into ${form.company || 'the company'}'s product, culture, and recent news.`, color: '#6366f1' },
    { day: 'Day 2', task: 'Technical Review', desc: `Review core concepts for ${form.role || 'the role'}.`, color: '#8b5cf6' },
    { day: 'Day 3', task: 'Behavioral Prep', desc: 'Prepare STAR method stories for common leadership and teamwork questions.', color: '#f59e0b' },
    { day: 'Day 4', task: 'Mock Interview', desc: `Practice ${form.format} interview format under timed conditions.`, color: '#10b981' },
  ];

  const handleSubmit = async () => {
    setStep(1);
    setLoadingLabel('Analyzing availability patterns...');
    setLoadingProgress(20);

    try {
      const data = await generateInterviewPlan({
        targetCompany: form.company,
        role: form.role,
        availableDays: form.availability,
        formats: [form.format],
        timezone: form.timezone
      });
      setLoadingProgress(70);
      setLoadingLabel('Generating preparation timeline...');
      
      const colors = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899'];
      setInterviewTimeline(data.timeline || []);
      setRecommendedResources(data.recommendedResources || []);
      setPracticeQuestions(data.practiceQuestions || []);
      setPrepSchedule((data.prepSchedule || []).map((item: any, i: number) => ({
        day: `Week ${item.week || i + 1}`,
        task: item.focus,
        desc: Array.isArray(item.tasks) ? item.tasks.join(' • ') : item.tasks,
        color: colors[i % colors.length]
      })));
      setIsAiGenerated(true);

      try {
        const video = await searchYouTubeVideo(`${form.company} ${form.role} interview preparation`);
        if (video) setYoutubeVideo(video);
      } catch (err) {
        console.error('YouTube fetch error:', err);
      }

      if (user) {
        await saveRun(user.id, 'interview-scheduler', form, data);
      }
    } catch (e) {
      setPrepSchedule(mockTimeline);
      setInterviewTimeline([]);
      setRecommendedResources([]);
      setPracticeQuestions([]);
      setYoutubeVideo(null);
      setIsAiGenerated(false);
    }

    setLoadingProgress(100);
    setLoadingLabel('Done!');
    await new Promise((r) => setTimeout(r, 500));
    setStep(2);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://talentiq.app/book/${form.name.toLowerCase().replace(/\\s+/g, '-')}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in-up">
      <StepProgress steps={['Details', 'Scheduling', 'Timeline']} currentStep={step} />

      {/* Step 1: Input form */}
      {step === 0 && (
        <div className="mx-auto max-w-lg space-y-6 animate-fade-in-up">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] shadow-lg shadow-[#ec4899]/20">
              <Calendar className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Interview Prep & Scheduler
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Set your availability and get a personalized interview preparation timeline.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Target Company</label>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="e.g., Stripe"
                  className="h-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] px-3 text-sm focus:border-[#ec4899] focus:outline-none text-[var(--text-primary)]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Target Role</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g., Backend Engineer"
                  className="h-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] px-3 text-sm focus:border-[#ec4899] focus:outline-none text-[var(--text-primary)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Interview Format</label>
                  <select
                    value={form.format}
                    onChange={(e) => setForm({ ...form, format: e.target.value })}
                    className="h-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] px-3 text-sm focus:border-[#ec4899] focus:outline-none text-[var(--text-primary)]"
                  >
                    <option>Virtual (Video)</option>
                    <option>On-site</option>
                    <option>Phone Screen</option>
                    <option>Take-home Assignment</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Notice Period</label>
                  <select
                    value={form.notice}
                    onChange={(e) => setForm({ ...form, notice: e.target.value })}
                    className="h-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] px-3 text-sm focus:border-[#ec4899] focus:outline-none text-[var(--text-primary)]"
                  >
                    <option>Immediate</option>
                    <option>2 Weeks</option>
                    <option>1 Month</option>
                    <option>2+ Months</option>
                  </select>
                </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Your Timezone</label>
              <input
                value={form.timezone}
                onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                className="h-10 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-base)] px-3 text-sm focus:border-[#ec4899] focus:outline-none text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Weekly Availability Slots</label>
              <TagInput
                 tags={form.availability}
                 onAdd={(t) => setForm({ ...form, availability: [...form.availability, t] })}
                 onRemove={(t) => setForm({ ...form, availability: form.availability.filter((a) => a !== t) })}
                 placeholder="e.g., Wed 9AM-11AM (Press Enter)"
              />
            </div>

            <button
               onClick={handleSubmit}
               disabled={!form.company || !form.role}
               className="w-full rounded-xl bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] py-3 text-sm font-bold text-white shadow-lg shadow-[#ec4899]/20 transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Generate Prep Timeline
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Loading phase */}
      {step === 1 && (
        <div className="mx-auto max-w-lg animate-fade-in-up">
           <div className="rounded-2xl border border-[#ec4899]/20 bg-[var(--bg-surface)] p-8 text-center">
             <Calendar className="mx-auto mb-4 h-8 w-8 text-[#ec4899] animate-pulse" />
             <p className="text-sm font-semibold text-[var(--text-primary)]">{loadingLabel}</p>
             <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--bg-elevated)]">
               <div
                 className="h-full rounded-full bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] transition-all duration-700"
                 style={{ width: `${loadingProgress}%` }}
               />
             </div>
           </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === 2 && (
         <div className="space-y-6 animate-fade-in-up">
            {isAiGenerated && (
              <div className="flex items-center justify-center gap-2 mb-2 animate-fade-in">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-3 py-1 text-xs font-semibold text-[#8b5cf6]">
                  <Bot className="h-3.5 w-3.5" /> Powered by RK AI
                </span>
              </div>
            )}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 text-center">
              <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                Your Smart Scheduling Link
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Share this link with recruiters to let them book interviews.</p>
              
              <div className="mx-auto mt-4 flex max-w-md items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] p-2">
                <span className="flex-1 truncate px-2 text-sm text-[var(--text-primary)]">
                   https://talentiq.app/book/{form.name.toLowerCase().replace(/\s+/g, '-')}
                </span>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1.5 rounded-lg bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-gradient-to-r hover:from-[#ec4899] hover:to-[#8b5cf6] hover:text-white"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedLink ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            {youtubeVideo && (
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden">
                 <div className="p-4 bg-gradient-to-r from-[#ef4444]/10 to-transparent border-b border-[var(--border-color)]">
                   <div className="flex items-center gap-2">
                     <Youtube className="h-5 w-5 text-[#ef4444]" />
                     <h3 className="font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Recommended View</h3>
                   </div>
                 </div>
                 <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                   {youtubeVideo.thumbnail && (
                     <div className="w-full md:w-48 aspect-video rounded-xl overflow-hidden bg-[var(--bg-elevated)] relative shrink-0">
                       <img src={youtubeVideo.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                         <PlayCircle className="h-10 w-10 text-white opacity-80" />
                       </div>
                     </div>
                   )}
                   <div className="flex-1">
                     <h4 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">{youtubeVideo.title}</h4>
                     <a href={youtubeVideo.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#ef4444] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#ef4444]/90 shadow-sm">
                       <Youtube className="h-3.5 w-3.5" /> Watch on YouTube
                     </a>
                   </div>
                 </div>
              </div>
            )}

            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
               <div className="mb-6 flex items-center justify-between">
                 <div>
                   <h3 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                     Preparation Timeline
                   </h3>
                   <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                     Suggested study plan for {form.role} at {form.company}
                   </p>
                 </div>
                 <button className="flex items-center gap-2 rounded-lg bg-[#ec4899]/10 px-3 py-2 text-xs font-bold text-[#ec4899] hover:bg-[#ec4899]/20">
                    <CalendarPlus className="h-4 w-4" />
                    Add to Calendar
                 </button>
               </div>

                <div className="relative border-l-2 border-[var(--border-color)] ml-3 space-y-6 pb-2">
                 {prepSchedule.map((item, i) => (
                   <div key={i} className="relative pl-6">
                      <div
                        className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-[var(--bg-surface)]"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] p-4 transition-all hover:border-[var(--text-muted)]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: item.color }}>{item.day}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[var(--text-primary)]">{item.task}</h4>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">{item.desc}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {interviewTimeline && interviewTimeline.length > 0 && (
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Interview Schedule
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {interviewTimeline.map((item, i) => (
                    <div key={i} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#ec4899]">Week {item.week}</span>
                        <span className="text-xs text-[var(--text-muted)]">{item.duration}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{item.round}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mb-3">
                        <Clock className="w-3 h-3 inline mr-1" /> {item.suggestedDay} at {item.suggestedTime}
                      </p>
                      {item.tips && item.tips.length > 0 && (
                        <ul className="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                          {item.tips.map((tip: string, j: number) => (
                            <li key={j}>{tip}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {practiceQuestions && practiceQuestions.length > 0 && (
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
                 <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                   Practice Questions
                 </h3>
                 <div className="space-y-6">
                   {practiceQuestions.map((pq, i) => (
                     <div key={i} className="space-y-3">
                       <h4 className="text-sm font-bold text-[#8b5cf6]">{pq.round}</h4>
                       <div className="grid gap-3">
                         {pq.questions.map((q: any, j: number) => (
                           <div key={j} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] p-4">
                             <div className="flex items-start justify-between gap-4">
                               <p className="text-sm font-medium text-[var(--text-primary)]">{q.question}</p>
                               <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  q.difficulty === 'Easy' ? 'bg-[#10b981]/10 text-[#10b981]'
                                  : q.difficulty === 'Medium' ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                                  : 'bg-[#ef4444]/10 text-[#ef4444]'
                                }`}>
                                  {q.difficulty}
                                </span>
                             </div>
                             {q.hint && (
                               <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-[#f59e0b]/10 p-2 text-xs text-[#f59e0b]">
                                 <Lightbulb className="h-3.5 w-3.5 shrink-0" />
                                 <p>{q.hint}</p>
                               </div>
                             )}
                           </div>
                         ))}
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {recommendedResources && recommendedResources.length > 0 && (
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  Recommended Resources
                </h3>
                <div className="flex flex-col gap-2">
                  {recommendedResources.map((res, i) => (
                    <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] px-4 py-3 hover:border-[#8b5cf6]/50 transition-colors">
                      <span className="text-sm font-medium text-[var(--text-primary)] truncate">{res.title}</span>
                      <ExternalLink className="h-4 w-4 text-[#8b5cf6] shrink-0 ml-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <button
               onClick={() => setStep(0)}
               className="mx-auto flex h-10 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-6 text-sm font-semibold text-[var(--text-primary)] shadow-sm hover:bg-[var(--bg-elevated)]"
            >
               Schedule Another Interview
            </button>
         </div>
      )}
    </div>
  );
}
