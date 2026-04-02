import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Briefcase,
  Users,
  TrendingUp,
  Search,
  ArrowRight,
  Sparkles,
  Map,
  Calendar,
  Zap,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { AgentRunCard } from '@/components/shared/AgentRunCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ScoreGauge } from '@/components/shared/ScoreGauge';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useProfileCompleteness } from '@/hooks/useProfileCompleteness';
import { useCountUp } from '@/hooks/useCountUp';
import { formatDistanceToNow } from 'date-fns';

export function DashboardPage() {
  const navigate = useNavigate();
  const { runs, profile } = useWorkspaceStore();
  const profileCompleteness = useProfileCompleteness();
  
  const completedRunsCount = runs.filter(r => r.status === 'done').length;
  
  const rawCareerScore = (completedRunsCount * 10) + (profileCompleteness * 0.4);
  const targetCareerScore = Math.min(100, Math.round(rawCareerScore));
  
  const targetTotalRuns = runs.length;
  
  const jobRuns = runs.filter((r) => r.agentType === 'job-search' && r.status === 'done');
  const targetJobsMatched = jobRuns.length * 10;
  
  const targetCandidatesScreened = runs.filter((r) => r.agentType === 'candidate-screener' && r.status === 'done').length * 2;
  
  let matchScoreSum = 0;
  let jobRunsWithScore = 0;
  jobRuns.forEach(run => {
    const output = run.output as any;
    if (output && Array.isArray(output.jobs) && output.jobs.length > 0) {
      matchScoreSum += output.jobs[0].matchScore || 0;
      jobRunsWithScore++;
    } else if (output && Array.isArray(output.matches) && output.matches.length > 0) {
      matchScoreSum += output.matches[0].matchScore || 0;
      jobRunsWithScore++;
    } else if (output && Array.isArray(output) && output.length > 0) {
      matchScoreSum += output[0].matchScore || 0;
      jobRunsWithScore++;
    }
  });
  const targetAvgScore = jobRunsWithScore > 0 ? Math.round(matchScoreSum / jobRunsWithScore) : 0;

  const careerScore = useCountUp(targetCareerScore, 1000);
  const totalRuns = useCountUp(targetTotalRuns, 1000);
  const jobsMatched = useCountUp(targetJobsMatched, 1000);
  const candidatesScreened = useCountUp(targetCandidatesScreened, 1000);
  const avgScore = useCountUp(targetAvgScore, 1000);

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const runsThisWeek = runs.filter(r => new Date(r.createdAt) >= oneWeekAgo);
  const targetTotalRunsTrend = runsThisWeek.length;
  const jobRunsThisWeek = runsThisWeek.filter((r) => r.agentType === 'job-search' && r.status === 'done');
  const targetJobsMatchedTrend = jobRunsThisWeek.length * 10;
  const candidatesScreenedTrend = runsThisWeek.filter((r) => r.agentType === 'candidate-screener' && r.status === 'done').length * 2;
  
  let matchScoreSumThisWeek = 0;
  let jobRunsWithScoreThisWeek = 0;
  jobRunsThisWeek.forEach(run => {
    const output = run.output as any;
    if (output && Array.isArray(output.jobs) && output.jobs.length > 0) {
      matchScoreSumThisWeek += output.jobs[0].matchScore || 0;
      jobRunsWithScoreThisWeek++;
    } else if (output && Array.isArray(output.matches) && output.matches.length > 0) {
      matchScoreSumThisWeek += output.matches[0].matchScore || 0;
      jobRunsWithScoreThisWeek++;
    } else if (output && Array.isArray(output) && output.length > 0) {
      matchScoreSumThisWeek += output[0].matchScore || 0;
      jobRunsWithScoreThisWeek++;
    }
  });
  const avgScoreThisWeek = jobRunsWithScoreThisWeek > 0 ? Math.round(matchScoreSumThisWeek / jobRunsWithScoreThisWeek) : 0;
  const avgScoreTrend = avgScoreThisWeek > targetAvgScore ? avgScoreThisWeek - targetAvgScore : (targetAvgScore > 0 ? 0 : 0);

  const recentRuns = runs.slice(0, 5);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickActions = [
    { label: 'Search Jobs', desc: 'Find matching YC startup roles', icon: Search, to: '/jobs', gradient: 'from-[#6366f1] to-[#8b5cf6]' },
    { label: 'Screen Candidates', desc: 'AI-powered GitHub screening', icon: Users, to: '/candidates', gradient: 'from-[#8b5cf6] to-[#a78bfa]' },
    { label: 'Enhance Profile', desc: 'Optimize your LinkedIn profile', icon: Sparkles, to: '/profile-enhancer', gradient: 'from-[#f59e0b] to-[#ef4444]' },
    { label: 'Build Skills Roadmap', desc: 'Plan your career growth path', icon: Map, to: '/skills-roadmap', gradient: 'from-[#10b981] to-[#06b6d4]' },
    { label: 'Interview Prep', desc: 'Schedule & prepare interviews', icon: Calendar, to: '/interview-scheduler', gradient: 'from-[#ec4899] to-[#8b5cf6]' },
  ];

  const getRunRoute = (agentType: string) => {
    switch(agentType) {
      case 'job-search': return '/jobs';
      case 'candidate-screener': return '/candidates';
      case 'profile-enhancer': return '/profile-enhancer';
      case 'skills-roadmap': return '/skills-roadmap';
      case 'interview-scheduler': return '/interview-scheduler';
      default: return '/';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Profile Completeness Banner */}
      {profileCompleteness < 80 && (
        <div className="rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/5 p-4 animate-fade-in flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="h-10 w-10 shrink-0 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-[#3b82f6]" />
            </div>
            <div className="flex-1 max-w-sm">
              <p className="text-sm font-bold text-[#3b82f6]">Complete your profile to get better AI results</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-[#3b82f6]/20 overflow-hidden">
                  <div className="h-full bg-[#3b82f6] transition-all duration-1000" style={{ width: `${profileCompleteness}%` }} />
                </div>
                <span className="text-xs font-bold text-[#3b82f6]">{profileCompleteness}%</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/profile')}
            className="shrink-0 bg-[#3b82f6] text-white hover:bg-[#3b82f6]/90 shadow-sm transition-all text-xs h-9 px-4"
          >
            Complete Profile <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* Hero greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h2
            className="text-3xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {greeting()}, {profile.name || 'there'} 👋
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Here's your career intelligence overview
          </p>
        </div>
        <div className="hidden md:block">
          <ScoreGauge score={careerScore} size={80} label="Career Score" />
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-stagger">
        <MetricCard
          title="Total Runs"
          value={totalRuns}
          subtitle="All time"
          icon={<Activity className="h-5 w-5" />}
          gradient="from-[#6366f1] to-[#8b5cf6]"
          trend={{ value: targetTotalRunsTrend, label: "this week" }}
        />
        <MetricCard
          title="Jobs Matched"
          value={jobsMatched}
          subtitle="YC companies"
          icon={<Briefcase className="h-5 w-5" />}
          gradient="from-[#10b981] to-[#06b6d4]"
          trend={{ value: targetJobsMatchedTrend, label: "this week" }}
        />
        <MetricCard
          title="Candidates Screened"
          value={candidatesScreened}
          subtitle="GitHub profiles"
          icon={<Users className="h-5 w-5" />}
          gradient="from-[#8b5cf6] to-[#a78bfa]"
          trend={{ value: candidatesScreenedTrend, label: "this week" }}
        />
        <MetricCard
          title="Avg Match Score"
          value={`${avgScore}%`}
          subtitle="Across all jobs"
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-[#f59e0b] to-[#ef4444]"
          trend={{ value: avgScoreTrend, label: "this week" }}
        />
      </div>

      {/* Activity Chart */}
      <ActivityChart />

      {/* Two Column Layout: Recent Runs & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Recent Runs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Recent Runs</h3>
            {runs.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/history')}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                View All
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>

          {recentRuns.length > 0 ? (
            <div className="space-y-3 animate-stagger">
              {recentRuns.map((run) => {
                let icon = <Bot className="h-4 w-4" />;
                let colorClass = "bg-[#6366f1]/10 text-[#6366f1]";
                let title = "Agent Run";
                
                if (run.agentType === 'job-search') {
                  icon = <Search className="h-4 w-4" />;
                  colorClass = "bg-[#6366f1]/10 text-[#6366f1]";
                  title = "Job Search";
                } else if (run.agentType === 'candidate-screener') {
                  icon = <Users className="h-4 w-4" />;
                  colorClass = "bg-[#8b5cf6]/10 text-[#8b5cf6]";
                  title = "Candidate Screener";
                } else if (run.agentType === 'profile-enhancer') {
                  icon = <Sparkles className="h-4 w-4" />;
                  colorClass = "bg-[#f59e0b]/10 text-[#f59e0b]";
                  title = "Profile Enhancer";
                } else if (run.agentType === 'skills-roadmap') {
                  icon = <Map className="h-4 w-4" />;
                  colorClass = "bg-[#10b981]/10 text-[#10b981]";
                  title = "Skills Roadmap";
                } else if (run.agentType === 'interview-scheduler') {
                  icon = <Calendar className="h-4 w-4" />;
                  colorClass = "bg-[#ec4899]/10 text-[#ec4899]";
                  title = "Interview Prep";
                }

                let summary = JSON.stringify(run.input || {}).replace(/[{}"\\]/g, ' ').trim();
                if (summary.length > 40) summary = summary.substring(0, 40) + '...';
                if (!summary) summary = "No input provided";

                return (
                  <div key={run.id} className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 transition-all hover:border-[var(--text-muted)] hover:shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                        {icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            run.status === 'done' ? 'bg-[#10b981]/10 text-[#10b981]' 
                            : run.status === 'failed' ? 'bg-[#ef4444]/10 text-[#ef4444]'
                            : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                          }`}>
                            {run.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">{summary} • {formatDistanceToNow(new Date(run.createdAt))} ago</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigate(getRunRoute(run.agentType))}
                      className="text-xs h-8 px-3 shrink-0 hidden sm:flex text-[var(--text-muted)] hover:text-[#6366f1] hover:bg-[#6366f1]/10"
                    >
                      View Results
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={<Activity className="h-6 w-6" />}
              title="No runs yet"
              description="Start with Job Search or Candidate Screener."
              action={
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-2">
                  <Button
                    onClick={() => navigate('/jobs')}
                    className="flex-1 gradient-primary text-white hover:opacity-90 w-full"
                  >
                    <Search className="mr-1.5 h-4 w-4 shrink-0" />
                    Search Jobs
                  </Button>
                  <Button
                    onClick={() => navigate('/candidates')}
                    variant="outline"
                    className="flex-1 w-full border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[#8b5cf6]/50 transition-colors"
                  >
                    <Users className="mr-1.5 h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                    Screen Candidates
                  </Button>
                </div>
              }
            />
          )}
        </div>

        {/* RIGHT COLUMN: Quick Actions Stack */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Quick Actions</h3>
          <div className="flex flex-col gap-3">
            {quickActions.map((action) => (
              <button
                key={action.to}
                onClick={() => navigate(action.to)}
                className="group flex flex-row items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 text-left transition-all duration-200 hover:border-[#6366f1]/30 hover:shadow-lg hover:shadow-[#6366f1]/5 hover:-translate-y-0.5"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${action.gradient} text-white shadow-md`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{action.label}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{action.desc}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
