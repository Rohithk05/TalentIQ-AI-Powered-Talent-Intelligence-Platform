# TalentIQ — AI-Powered Career Intelligence Platform

<div align="center">

![TalentIQ](https://img.shields.io/badge/TalentIQ-AI%20Career%20Platform-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?style=for-the-badge&logo=supabase)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203.3-F55036?style=for-the-badge)

**Your AI Career Co-Pilot — Get matched to jobs, screen candidates, and build your career roadmap, all in one place.**

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## Overview

TalentIQ is a multi-agent SaaS platform that combines AI-powered job matching and candidate screening into a single unified workspace. Built with React, TypeScript, and powered by Groq's LLaMA 3.3 model, it provides real-time career intelligence through five specialized AI agents.

The platform is designed for two personas simultaneously:
- **Job Seekers** who want intelligent job matching and career guidance
- **Hiring Teams** who want automated candidate evaluation and screening

---

## Features

### Core AI Agents
| Feature | Description |
|---|---|
| **Job Search Agent** | Paste a LinkedIn URL → AI analyzes profile → Returns 10 ranked job matches from top YC startups with match scores, salary ranges, and apply links |
| **Candidate Screener** | Input GitHub usernames + job role → AI analyzes repos and activity → Scores each candidate out of 100 with verdict, strengths, and weaknesses |
| **Profile Enhancer** | Input your current profile + upload resume → AI generates headline suggestions, summary rewrite, missing keywords, and ATS optimization tips |
| **Skills Roadmap** | Input your dream job + current skills → AI generates a phased learning roadmap with resources, blog links, and YouTube tutorials |
| **Interview Prep** | Input availability + target company → AI generates a week-by-week interview timeline, prep schedule, and practice questions |

### Platform Features
- **Authentication** — Email/password and Google OAuth via Supabase Auth
- **User Profiles** — Editable profile with avatar, bio, LinkedIn, GitHub, dream job
- **Run History** — Full history of all agent runs stored in Supabase PostgreSQL
- **Dashboard** — Real-time metrics, activity chart, career score, recent runs
- **Dark/Light Theme** — Persistent theme toggle
- **Free Tier** — 50 agent runs per month on the free plan
- **Responsive UI** — Works on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript 5, Vite 8 |
| **Styling** | Tailwind CSS, shadcn/ui, Radix UI primitives |
| **State Management** | Zustand (with localStorage persistence) |
| **Data Fetching** | TanStack Query |
| **Routing** | React Router v6 |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **AI Model** | Groq — LLaMA 3.3 70B Versatile |
| **Authentication** | Supabase Auth |
| **Database** | Supabase PostgreSQL |
| **YouTube Search** | YouTube Data API v3 |
| **Date Utilities** | date-fns |
| **ID Generation** | nanoid |

---

## Project Structure

```
talentiq/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx        # Main app shell with sidebar
│   │   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   │   └── TopBar.tsx          # Top navigation bar
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx      # Stats display cards
│   │   │   ├── ActivityChart.tsx   # Recharts activity graph
│   │   │   └── RunStatusBadge.tsx  # Status indicator badges
│   │   ├── agents/
│   │   │   ├── JobSearchForm.tsx   # LinkedIn URL input form
│   │   │   ├── JobResultCard.tsx   # Job match display card
│   │   │   ├── CandidateForm.tsx   # GitHub username input
│   │   │   └── CandidateReportCard.tsx # Candidate score card
│   │   └── shared/
│   │       ├── StepProgress.tsx    # Multi-step progress UI
│   │       ├── ScoreGauge.tsx      # SVG circular score gauge
│   │       ├── TagInput.tsx        # Tag input component
│   │       ├── Toast.tsx           # Toast notifications
│   │       └── EmptyState.tsx      # Empty state display
│   ├── pages/
│   │   ├── LandingPage.tsx         # Marketing landing page
│   │   ├── AuthPage.tsx            # Login / signup page
│   │   ├── DashboardPage.tsx       # Main dashboard
│   │   ├── JobSearchPage.tsx       # Job Search Agent
│   │   ├── CandidatePage.tsx       # Candidate Screener Agent
│   │   ├── ProfileEnhancerPage.tsx # Profile Enhancer Agent
│   │   ├── SkillsRoadmapPage.tsx   # Skills Roadmap Agent
│   │   ├── InterviewSchedulerPage.tsx # Interview Prep Agent
│   │   ├── UserProfilePage.tsx     # User profile editor
│   │   ├── RunHistoryPage.tsx      # Agent run history
│   │   └── SettingsPage.tsx        # App settings
│   ├── services/
│   │   ├── groqService.ts          # All Groq AI API calls
│   │   ├── youtubeService.ts       # YouTube search API
│   │   ├── dbService.ts            # Supabase DB operations
│   │   └── mockAgentService.ts     # Mock fallback service
│   ├── store/
│   │   └── useWorkspaceStore.ts    # Zustand global store
│   ├── hooks/
│   │   ├── useAuth.ts              # Supabase auth hook
│   │   ├── useTheme.ts             # Dark/light theme hook
│   │   ├── useProfile.ts           # User profile hook
│   │   ├── useCountUp.ts           # Number animation hook
│   │   ├── useProfileCompleteness.ts # Profile % calculator
│   │   └── useAgentRun.ts          # Agent execution hook
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client
│   │   └── groq.ts                 # Groq client
│   └── types/
│       ├── agent.ts                # AgentRun, RunStatus types
│       ├── job.ts                  # JobMatch interface
│       └── candidate.ts            # CandidateReport interface
├── .env                            # Environment variables
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.app.json
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- pnpm (`npm install -g pnpm`)
- A Supabase account (free)
- A Groq API key (free)
- A GitHub Personal Access Token (free)
- A YouTube Data API v3 key (free, optional)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/talentiq.git
cd talentiq
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
VITE_GITHUB_TOKEN=your_github_personal_access_token
VITE_YOUTUBE_API_KEY=your_youtube_data_api_key
```

### 4. Set up Supabase database

Run this SQL in your Supabase project's SQL Editor:

```sql
CREATE TABLE agent_runs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_type text NOT NULL,
  status text NOT NULL DEFAULT 'done',
  input jsonb NOT NULL,
  output jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE user_profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  name text,
  title text,
  location text,
  bio text,
  linkedin_url text,
  github_username text,
  dream_job text,
  years_of_experience text,
  avatar_color text DEFAULT 'from-indigo-500 to-violet-500',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users own runs" ON agent_runs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "users own profile" ON user_profiles
  FOR ALL USING (auth.uid() = id);
```

### 5. Configure Supabase Auth

In your Supabase dashboard:
- Authentication → Sign In / Providers → Email → **disable "Confirm email"** for local development
- Optional: Enable Google OAuth by adding your Google Client ID and Secret

### 6. Run the development server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Keys Setup Guide

### Groq (Required — Free)
1. Go to [platform.groq.com](https://platform.groq.com)
2. Sign up → API Keys → Create API Key
3. Copy and paste into `.env` as `VITE_GROQ_API_KEY`

### GitHub Token (Required for Candidate Screener — Free)
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. Check only the `public_repo` scope
4. Copy and paste into `.env` as `VITE_GITHUB_TOKEN`

### YouTube Data API v3 (Optional — Free)
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → Enable **YouTube Data API v3**
3. Credentials → Create API Key
4. Copy and paste into `.env` as `VITE_YOUTUBE_API_KEY`
5. Free quota: 10,000 units/day (sufficient for normal use)

### Supabase (Required — Free tier)
1. Go to [supabase.com](https://supabase.com) → New project
2. Settings → API → copy **Project URL** and **anon public** key
3. Paste into `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

---

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build locally
pnpm tsc          # TypeScript type check
```

---

## How It Works

### Job Search Agent Flow
1. User pastes a LinkedIn profile URL
2. Groq LLaMA 3.3 analyzes the URL and infers profile details
3. AI generates 10 ranked job matches from top YC startups
4. Results include match score, salary range, location, job type, and why it's a match
5. Run is saved to Supabase for the authenticated user

### Candidate Screener Flow
1. User inputs GitHub username(s) and target job role
2. Real GitHub API fetches repos, languages, and activity data
3. Groq analyzes the actual GitHub data against the job role
4. Returns score (0-100), verdict, strengths, weaknesses, and top languages
5. Multiple candidates run in parallel via Promise.all

### Profile Enhancer Flow
1. User fills in current title, skills, target role, and bio
2. Optional: upload resume (.pdf or .txt) for deeper analysis
3. Groq generates headline suggestions, summary rewrite, missing keywords
4. Resume analysis includes ATS optimization, formatting tips, and achievement quantification
5. Before/after profile score comparison shown with animations

### Skills Roadmap Flow
1. User inputs dream job, current skills, experience level, and hours/week
2. Groq generates a 4-phase personalized learning roadmap
3. Each skill includes real resource links (MDN, freeCodeCamp, official docs)
4. YouTube API fetches relevant tutorial videos per skill
5. Users can mark skills as complete to track progress

### Interview Prep Flow
1. User inputs target company, role, availability, and interview formats
2. Groq generates a 4-week interview timeline with specific time slots
3. Includes week-by-week preparation schedule with tasks
4. Practice questions generated per round type with difficulty and hints
5. Recommended resources include real interview prep websites

---

## Database Schema

```
agent_runs
├── id (uuid, primary key)
├── user_id (uuid, references auth.users)
├── agent_type (text: job-search | candidate-screener | ...)
├── status (text: done | failed | running)
├── input (jsonb)
├── output (jsonb)
└── created_at (timestamptz)

user_profiles
├── id (uuid, references auth.users)
├── name, title, location, bio (text)
├── linkedin_url, github_username (text)
├── dream_job, years_of_experience (text)
├── avatar_color (text)
└── updated_at (timestamptz)
```

---

## Roadmap

- [ ] Real LinkedIn scraping via Bright Data API
- [ ] Pro tier with unlimited runs and priority queue
- [ ] Team workspaces with shared candidate pools
- [ ] Export candidate reports as PDF
- [ ] Email notifications for completed runs
- [ ] Mobile app (React Native)
- [ ] Browser extension for LinkedIn profile import
- [ ] ATS resume score with real job description matching
- [ ] Slack and Notion integrations

---

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure `pnpm tsc --noEmit` passes with zero errors before submitting.

---

## Security Notes

- Never commit your `.env` file — it is in `.gitignore` by default
- All API keys are loaded via Vite environment variables (`VITE_` prefix)
- Supabase Row Level Security (RLS) ensures users can only access their own data
- GitHub token only needs `public_repo` scope — never use a full-access token
- Rotate any exposed API keys immediately at their respective dashboards

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Acknowledgements

- [Groq](https://groq.com) — ultra-fast LLaMA 3.3 inference
- [Supabase](https://supabase.com) — open source Firebase alternative
- [shadcn/ui](https://ui.shadcn.com) — beautifully designed components
- [Lucide](https://lucide.dev) — clean icon library
- [Recharts](https://recharts.org) — composable charting library
- [TanStack Query](https://tanstack.com/query) — powerful async state management

---

<div align="center">
Built with by Rohith K
</div>
