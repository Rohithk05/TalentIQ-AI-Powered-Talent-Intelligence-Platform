import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Sparkles, Map, Calendar, Github, CheckCircle2, ChevronDown, ArrowRight, Star, User } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            (entry.target as HTMLElement).style.opacity = '1';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-[#6366f1]/30">
      {/* Background Mesh */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-violet-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#6366f1]" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">TalentIQ</span>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-sm font-medium hover:text-[#6366f1] transition-colors"
          >
            Sign In
          </button>
        </nav>

        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-10 pb-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">BETA</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up" style={{ fontFamily: 'var(--font-display)', animationDelay: '0.1s' }}>
            <span className="block text-white">Your AI Career</span>
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Co-Pilot</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Get matched to jobs, screen candidates, and build your career roadmap — powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]"
            >
              Get Started Free <ArrowRight className="inline ml-2 h-4 w-4" />
            </button>
            <button className="w-full sm:w-auto rounded-full border border-gray-700 bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-gray-800">
              See how it works <ChevronDown className="inline ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 animate-fade-in-up flex flex-col items-center" style={{ animationDelay: '0.4s' }}>
            <div className="flex -space-x-3 mb-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-[#0a0a0f] shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold font-mono">
                  {['JD', 'AS', 'TC', 'RM', 'KL'][i]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />)}
            </div>
            <p className="text-sm font-medium text-gray-400">Trusted by 2,400+ professionals</p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-gray-800/50 bg-[#13131a]/50 backdrop-blur-sm scroll-animate">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-gray-800">
              <div className="space-y-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">2,400+</p>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Users</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">50K+</p>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Jobs Matched</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">98%</p>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Match Accuracy</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">4</p>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">AI Features</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6 max-w-7xl mx-auto scroll-animate">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Everything you need to accelerate your career
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: 'Job Matching', desc: 'AI matches you to YC startups based on your real skills and experience.', color: 'from-blue-500 to-indigo-500' },
              { icon: Users, title: 'Candidate Screening', desc: 'Score candidates instantly with intelligent, unbiased analysis.', color: 'from-indigo-500 to-violet-500' },
              { icon: Sparkles, title: 'Profile Enhancer', desc: 'Optimize your LinkedIn to rank higher for recruiter searches.', color: 'from-violet-500 to-fuchsia-500' },
              { icon: Map, title: 'Skills Roadmap', desc: 'Know exactly what to learn to land your dream role.', color: 'from-fuchsia-500 to-pink-500' },
              { icon: Calendar, title: 'Interview Prep', desc: 'Schedule and prepare smarter with customized timelines.', color: 'from-pink-500 to-rose-500' },
              { icon: Github, title: 'Real-time Analysis', desc: 'GitHub-powered insights to show your true technical depth.', color: 'from-rose-500 to-orange-500' },
            ].map((feature, i) => (
              <div key={i} className="group relative rounded-3xl border border-gray-800 bg-[#13131a] p-8 transition-all hover:bg-gray-800/50 hover:border-gray-700">
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg shadow-black/50`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 bg-[#13131a] border-y border-gray-800/50 scroll-animate">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Three steps to your dream job
              </h2>
            </div>

            <div className="relative grid md:grid-cols-3 gap-12 text-center">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-[40px] left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0" />

              {[
                { icon: User, title: 'Input your profile', desc: 'Connect LinkedIn or GitHub to give the AI context about your experience.', number: '01' },
                { icon: Sparkles, title: 'AI analyzes & matches', desc: 'Our proprietary Groq-powered agents evaluate your fit against real parameters.', number: '02' },
                { icon: ArrowRight, title: 'Get your personalized plan', desc: 'Receive interactive roadmaps, tailored job lists, and interview prep guides.', number: '03' },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gray-700 bg-[#0a0a0f] shadow-xl relative">
                    <span className="absolute -top-3 -right-3 text-3xl font-bold text-indigo-500/20" style={{ fontFamily: 'var(--font-display)' }}>{step.number}</span>
                    <step.icon className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 px-6 max-w-4xl mx-auto text-center scroll-animate">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 border border-indigo-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-900/10 z-0" />
            <div className="absolute inset-0 bg-[#13131a]/60 backdrop-blur-xl z-0" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-display)' }}>
                Ready to land your dream job?
              </h2>
              <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
                Join thousands of professionals accelerating their careers with AI.
              </p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="rounded-full bg-white text-[#0a0a0f] px-10 py-4 text-base font-bold transition-transform hover:scale-105 shadow-xl hover:shadow-indigo-500/20"
              >
                Get Started Free
              </button>
              <p className="mt-6 text-xs text-gray-500 flex items-center justify-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-indigo-500" /> No credit card required · Free forever plan
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 py-10 text-center text-sm text-gray-500">
           © {new Date().getFullYear()} TalentIQ. Career Development Platform.
        </footer>
      </div>
    </div>
  );
}
