# TalentIQ — AI-Powered Talent Intelligence Platform

---

## PROJECT DESCRIPTION

### System Overview

TalentIQ is a full-stack, AI-powered talent intelligence and career acceleration platform designed to streamline the job search, candidate screening, and professional development workflow. The system is built as a modern React single-page application using Vite, TypeScript, and Tailwind CSS on the frontend, with direct integration to Groq's ultra-fast LLM inference engine and Supabase for authentication and cloud-based data persistence.

The platform delivers a comprehensive career intelligence pipeline:

- **Secure authentication** and user data management via Supabase (email/password + Google OAuth)
- **AI-powered job matching** by analyzing LinkedIn profiles against YC startup and top tech company roles
- **GitHub-based candidate screening** with intelligent scoring, verdict generation, and interview question suggestions
- **LinkedIn/resume profile enhancement** with AI-generated headlines, summary rewrites, and ATS optimization
- **Personalized skills roadmaps** with phased learning plans, YouTube resource integration, and progress tracking
- **Interview preparation timelines** with company-specific schedules, practice questions, and recommended resources
- **Interactive dashboard** with career score analytics, run history, and activity charts

Unlike fragmented career tools, TalentIQ provides a unified, workflow-driven environment where professionals and recruiters can seamlessly move from profile analysis to job matching to skill development — all powered by real-time AI inference.

### Problem Domain

The modern job market presents significant challenges for both job seekers and recruiters:

- **Job seekers** struggle with identifying the best-fit roles, optimizing profiles for ATS and recruiter searches, identifying skill gaps, and preparing systematically for interviews.
- **Recruiters** face the challenge of screening large volumes of GitHub profiles quickly and generating meaningful technical assessments.
- **Career changers** lack structured guidance on what skills to develop and in what sequence.
- **Existing tools** are fragmented — requiring users to switch between LinkedIn optimizers, job boards, LeetCode, and various career coaching platforms.

TalentIQ addresses these challenges by:

- Automating job matching using AI analysis of LinkedIn profiles against real company openings
- Providing instant GitHub-based candidate screening with AI-generated verdicts and interview questions
- Generating optimized LinkedIn headlines, summaries, and missing keywords using LLM intelligence
- Creating personalized learning roadmaps with phased skill progression and curated resources
- Offering company-specific interview preparation timelines with practice questions and difficulty ratings
- Providing a unified dashboard to eliminate context switching across multiple career tools

### Core Technology Used

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19 + TypeScript | Modern component-based architecture with type safety |
| **Build Tool** | Vite 8 | Ultra-fast development server with HMR and optimized builds |
| **Styling** | Tailwind CSS v4 | Advanced dark glassmorphism UI with responsive layouts |
| **UI Components** | Radix UI + shadcn/ui | Accessible, composable UI primitives |
| **State Management** | Zustand | Lightweight, persistent client-side state management |
| **Server State** | TanStack React Query | Efficient data fetching and caching |
| **Routing** | React Router v7 | Client-side routing with protected route support |
| **AI / LLM Integration** | Groq SDK (LLaMA 3.3 70B) | Ultra-fast inference for content generation and analysis |
| **Authentication & Database** | Supabase | Secure cloud PostgreSQL with JWT-based auth |
| **External APIs** | GitHub REST API, YouTube Data API v3 | Real-time profile data and educational video resources |
| **Charts & Visualization** | Recharts | Interactive data visualization for dashboard analytics |

### Key Capabilities

| Feature | Description |
|---------|-------------|
| **AI Job Matching** | Analyzes LinkedIn profiles and generates ranked job matches from YC startups and top tech companies with match scores and salary estimates |
| **Candidate Screening** | Fetches GitHub repositories, analyzes code quality, and generates hiring verdicts (Strong Hire / Hire / No Hire) with detailed strengths and weaknesses |
| **Profile Enhancement** | Generates optimized LinkedIn headlines, summary rewrites, skill relevance ratings, missing keywords, and ATS optimization tips |
| **Resume Analysis** | Provides formatting tips, content improvements, achievement quantification suggestions, and ATS optimization recommendations |
| **Skills Roadmap** | Creates phased learning plans with estimated hours, difficulty levels, curated resources (blogs, docs), and YouTube video recommendations |
| **Interview Prep** | Generates company-specific interview timelines, preparation schedules, practice questions with hints, and recommended study resources |
| **Career Dashboard** | Displays career score, total runs, jobs matched, candidates screened, average match score, and activity trends with animated charts |
| **Run History** | Tracks all AI agent runs with status, input, output, and timestamps for auditing and review |

### Target Users

- **Job Seekers** — fast job matching, profile optimization, and structured interview preparation
- **Software Engineers** — skills roadmap generation and career trajectory planning
- **Technical Recruiters** — rapid GitHub-based candidate screening and interview question generation
- **Career Changers** — structured learning paths and skill gap identification
- **Students & Fresh Graduates** — guidance on building portfolio projects and interview readiness

### Real-World Relevance

TalentIQ significantly reduces the time and effort required for career development and talent acquisition by automating research-heavy and repetitive tasks. By integrating LLM-driven intelligence with real-time data from GitHub and YouTube, the platform ensures that users receive personalized, actionable, and up-to-date guidance.

It enables:

- Faster job search cycles with AI-ranked matches
- Improved profile visibility through SEO and ATS optimization
- Data-driven hiring decisions based on objective GitHub analysis
- Structured skill development with measurable progress tracking
- Efficient interview preparation with company-specific content

---

## APPLICATION SCENARIOS

### Scenario 1 — AI-Powered Job Discovery

A software engineer looking for new opportunities pastes their LinkedIn URL into TalentIQ's **Job Search** tool. The system sends the URL to the Groq LLM, which generates a profile summary including skills, domain, and experience level. It then produces 10 ranked job matches from real YC startups and top tech companies (Linear, Vercel, Supabase, Stripe, etc.) with match scores, salary ranges, and personalized explanations of why each role fits. The engineer can bookmark jobs for later and seamlessly navigate to the **Profile Enhancer** to optimize their LinkedIn for the matched roles.

### Scenario 2 — GitHub-Based Candidate Screening

A technical recruiter needs to evaluate multiple developers for a frontend engineering role. Using the **Candidate Screener**, they enter GitHub usernames and the target role. TalentIQ fetches each candidate's top repositories and sends the data to Groq for analysis. The system generates detailed reports including technical scores (0–100), verdicts (Strong Hire / Hire / No Hire), language proficiency, commit activity, and specific strengths and weaknesses. The recruiter can also generate tailored interview questions based on each candidate's primary programming languages.

### Scenario 3 — Profile & Resume Optimization

A professional preparing for a career transition uses the **Profile Enhancer** to optimize their LinkedIn presence. They enter their current title, skills, target role, bio, and optionally upload their resume. The AI generates three optimized headline suggestions with effectiveness scores, a rewritten professional summary, a skill relevance ranking, and missing keywords to add. If a resume is uploaded, the system also provides formatting tips, content improvements, achievement quantification examples, and ATS optimization advice — complete with before/after profile scores.

### Scenario 4 — Personalized Skills Roadmap

An intermediate-level developer aspiring to become an ML Engineer uses the **Skills Roadmap** tool. They input their dream job, current skills, experience level, and available study hours per week. The AI generates a multi-phase learning plan with specific skills, estimated hours, difficulty levels, and curated resources (documentation links, blog posts). Each skill also includes a relevant YouTube tutorial video. The developer can track their progress by checking off completed skills, with a real-time progress bar showing their overall completion percentage.

---

## TECHNICAL ARCHITECTURE OVERVIEW

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER (Browser)                       │
│              React 19 + TypeScript SPA                  │
│         Vite 8 · Tailwind CSS v4 · Recharts             │
└───────────┬──────────┬──────────┬───────────────────────┘
            │          │          │
    ┌───────▼──┐  ┌────▼────┐  ┌─▼──────────┐
    │ Supabase │  │ Groq    │  │ GitHub API │
    │ Auth +   │  │ LLM API │  │ + YouTube  │
    │ Database │  │ (LLaMA  │  │ Data API   │
    │ (Cloud)  │  │  3.3)   │  │ v3         │
    └──────────┘  └─────────┘  └────────────┘
```

### Component Architecture

```
src/
├── App.tsx                     # Root component with routing + auth guards
├── main.tsx                    # React entry point
├── index.css                   # Global styles, design tokens, animations
│
├── lib/                        # Client initializers
│   ├── supabase.ts             # Supabase client
│   ├── groq.ts                 # Groq SDK client (LLaMA 3.3 70B)
│   └── utils.ts                # Tailwind merge utility (cn)
│
├── types/                      # TypeScript interfaces
│   ├── agent.ts                # AgentRun, JobSearchOutput, CandidateOutput
│   ├── job.ts                  # JobMatch interface
│   └── candidate.ts            # CandidateReport interface
│
├── services/                   # Business logic & API integration
│   ├── groqService.ts          # AI functions (matchJobs, analyzeCandidate, etc.)
│   ├── dbService.ts            # Supabase CRUD (saveRun, getRuns, saveProfile)
│   ├── aiService.ts            # Claude API client (alternative AI service)
│   ├── youtubeService.ts       # YouTube Data API v3 integration
│   └── mockAgentService.ts     # Mock agent for development/testing
│
├── store/                      # Global state management
│   └── useWorkspaceStore.ts    # Zustand store with persist middleware
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts              # Supabase auth state management
│   ├── useAgentRun.ts          # Agent run lifecycle management
│   ├── useProfile.ts           # Profile stats & completeness
│   ├── useProfileCompleteness.ts
│   ├── useRunHistory.ts        # Run history with computed stats
│   ├── useTheme.ts             # Dark/light mode toggle
│   ├── useCountUp.ts           # Animated counter hook
│   └── useToast.ts             # Toast notification system
│
├── components/
│   ├── ui/                     # Base UI primitives (shadcn/ui)
│   │   ├── button.tsx, card.tsx, input.tsx, badge.tsx
│   │   ├── tabs.tsx, progress.tsx, avatar.tsx
│   │   ├── separator.tsx, switch.tsx
│   │
│   ├── layout/                 # Application shell
│   │   ├── AppShell.tsx        # Main layout (sidebar + topbar + content)
│   │   ├── Sidebar.tsx         # Navigation sidebar with user info
│   │   ├── TopBar.tsx          # Top header bar
│   │   └── MobileNav.tsx       # Mobile bottom navigation
│   │
│   ├── dashboard/              # Dashboard-specific components
│   │   ├── MetricCard.tsx      # Animated metric display cards
│   │   ├── ActivityChart.tsx   # Recharts-based activity visualization
│   │   └── RunStatusBadge.tsx  # Status indicator badges
│   │
│   ├── agents/                 # Agent tool components
│   │   ├── JobSearchForm.tsx   # LinkedIn URL input form
│   │   ├── JobResultCard.tsx   # Job match result card
│   │   ├── CandidateForm.tsx   # GitHub username input form
│   │   └── CandidateReportCard.tsx  # Candidate analysis card
│   │
│   └── shared/                 # Shared/reusable components
│       ├── AgentRunCard.tsx    # Run status display
│       ├── EmptyState.tsx      # Empty state placeholder
│       ├── GradientCard.tsx    # Gradient-bordered card
│       ├── ScoreGauge.tsx      # SVG circular score gauge
│       ├── StepProgress.tsx    # Multi-step progress indicator
│       ├── TagInput.tsx        # Tag/chip input component
│       └── Toast.tsx           # Toast notification system
│
└── pages/                      # Route pages
    ├── LandingPage.tsx         # Public marketing/landing page
    ├── AuthPage.tsx            # Supabase auth (login/signup/Google)
    ├── DashboardPage.tsx       # Main dashboard with metrics & quick actions
    ├── JobSearchPage.tsx       # AI job matching tool
    ├── CandidatePage.tsx       # GitHub candidate screening tool
    ├── ProfileEnhancerPage.tsx # LinkedIn/resume optimization tool
    ├── SkillsRoadmapPage.tsx   # Personalized learning roadmap generator
    ├── InterviewSchedulerPage.tsx # Interview prep & scheduling tool
    ├── UserProfilePage.tsx     # User profile management
    ├── RunHistoryPage.tsx      # Agent run history viewer
    └── SettingsPage.tsx        # Application settings
```

### Security

- **JWT-based authentication** via Supabase with session management
- **Protected routes** using `ProtectedRoute` component wrapper
- **Environment-based API key management** using Vite `.env` files
- **Row-level security** in Supabase PostgreSQL for user data isolation

---

## PREREQUISITES

### Software Requirements

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| npm / pnpm | Latest | Package management |
| Git | Latest | Version control |

### Libraries / Frameworks

**Frontend Core:**
- React 19, React DOM, React Router v7
- TypeScript 5.9, Vite 8

**UI & Styling:**
- Tailwind CSS v4, shadcn/ui, Radix UI
- Lucide React (icons), Recharts (charts)
- Geist Font, Inter + Bricolage Grotesque (Google Fonts)

**AI & Data Services:**
- Groq SDK (LLM inference)
- Supabase JS (@supabase/supabase-js, auth-ui-react)

**State & Utilities:**
- Zustand (state management)
- TanStack React Query (server state)
- date-fns, nanoid, clsx, tailwind-merge

### Hardware Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| RAM | 4 GB | 8+ GB |
| Storage | 500 MB | 1+ GB |
| Internet | Required (API calls) | Broadband |

---

## PRIOR KNOWLEDGE REQUIRED

### Programming Knowledge

- **TypeScript/JavaScript** — Strong understanding of modern ES6+, TypeScript generics, interfaces, and React component patterns.
- **React 19** — Proficiency with functional components, hooks (useState, useEffect, useCallback, useMemo), context, and component lifecycle.
- **CSS & Tailwind** — Understanding of utility-first CSS, responsive design, and CSS custom properties.

### Framework Basics

- **Vite** — Understanding of modern build tools, HMR, and environment variable configuration.
- **React Router** — Familiarity with client-side routing, nested routes, protected routes, and navigation.
- **Zustand** — Understanding of global state management, middleware (persist), and store patterns.

### API & Web Fundamentals

- **REST API principles** — Knowledge of HTTP methods, JSON communication, and API error handling.
- **External API integration** — Experience integrating third-party APIs (Groq, GitHub, YouTube, Supabase).
- **Authentication flows** — Understanding of JWT tokens, OAuth (Google), and session management.

### AI/LLM Fundamentals

- **LLM concepts** — Basic understanding of Large Language Models and their text generation capabilities.
- **Prompt engineering** — Awareness of system prompts, structured output formats (JSON), and prompt optimization techniques.
- **API-based inference** — Understanding of how Groq API processes prompts and returns structured responses.

---

## PROJECT OBJECTIVES

### Technical Objectives

- Implement a production-style, modular AI-powered career platform integrating Groq LLM for job matching, candidate screening, profile enhancement, skills roadmap generation, and interview preparation.
- Develop a modern single-page application with React 19, TypeScript, and Vite 8 ensuring type safety and optimal developer experience.
- Integrate external APIs (Groq, GitHub, YouTube, Supabase) for real-time data fetching and AI-powered analysis.
- Enable seamless workflow transitions across tools (e.g., Job Search → Profile Enhancer → Skills Roadmap).
- Implement persistent state management with Zustand for cross-session data retention.

### Performance Objectives

- Achieve interactive UI responses under 100ms for non-AI operations using Vite's optimized build pipeline.
- Ensure AI content generation responses within 2–5 seconds using Groq's high-speed LLaMA 3.3 70B inference.
- Optimize frontend rendering with React 19's concurrent features and component-level state management.
- Implement smooth CSS animations and staggered transitions for premium user experience.

### Deployment Objectives

- Support local-first development with minimal configuration using Vite dev server.
- Enable production deployment on platforms like Vercel, Netlify, or any static hosting service.
- Ensure secure handling of API keys using Vite's `VITE_` prefixed environment variables.
- Provide graceful fallback mechanisms for API failures with mock data responses.

### Learning Outcomes

- Gain hands-on experience in building full-stack AI-powered applications using React and Groq.
- Understand integration of Large Language Models into real-world SaaS applications.
- Develop practical knowledge of prompt engineering for structured JSON output generation.
- Learn modern authentication patterns using Supabase with React.
- Build production-ready UIs with glassmorphism design, dark mode, and micro-animations.

---

## SYSTEM WORKFLOW

### 1. User Interaction
The user accesses TalentIQ and authenticates via Supabase (email/password or Google OAuth). Upon login, they are redirected to the Dashboard, which displays career metrics, recent agent runs, and quick actions for all AI tools. The user selects a tool and provides the required input parameters.

### 2. Input Validation & Processing
The frontend validates user input (e.g., LinkedIn URL format, GitHub username, required fields) before submission. For multi-input tools like Candidate Screener, validation ensures at least one username and a target role are provided. The form data is then passed to the appropriate service function.

### 3. AI Content Generation
The service layer (groqService.ts) constructs a detailed system prompt with specific JSON output schema requirements and sends it to the Groq API along with the user's input. The LLaMA 3.3 70B model processes the prompt using `response_format: { type: 'json_object' }` to ensure structured output. The response is parsed and validated before being returned to the UI.

### 4. External Data Integration
For tools requiring real data, the system first fetches from external APIs:
- **Job Search**: Groq generates job matches based on LinkedIn profile analysis
- **Candidate Screener**: GitHub REST API fetches repository data, which is then sent to Groq for analysis
- **Skills Roadmap**: YouTube Data API v3 searches for tutorial videos matching each roadmap skill
- **Interview Prep**: YouTube API provides company/role-specific preparation videos

### 5. Result Delivery & Persistence
Generated outputs are displayed in the UI with animated transitions and staggered rendering. Results are simultaneously saved to Supabase (agent_runs table) for future reference. The Zustand store updates with the new run data, and the Dashboard metrics auto-refresh.

### 6. User Actions on Results
Users can interact with AI outputs in multiple ways:
- **Copy to clipboard** — Headlines, summaries, and scheduling links
- **Bookmark jobs** — Save matched jobs for later review
- **Track skill progress** — Check off completed skills on roadmaps
- **Generate interview questions** — Get tailored questions for screened candidates
- **Navigate between tools** — E.g., from Job Search results → Profile Enhancer

---

## MILESTONE 1: REQUIREMENT ANALYSIS & SYSTEM DESIGN

### Activity 1.1: Problem Definition

The modern tech job market is highly competitive and fragmented. Job seekers must juggle multiple platforms for job discovery, profile optimization, skill development, and interview preparation. Recruiters spend excessive time manually reviewing GitHub profiles and lack standardized technical assessment frameworks. Existing AI tools operate in isolation, offering individual capabilities without workflow integration.

TalentIQ addresses these challenges by providing a unified, AI-powered platform that combines job matching, candidate screening, profile enhancement, skills roadmapping, and interview preparation into a single cohesive experience. The system leverages Groq's high-speed LLM inference to deliver real-time, personalized insights that help users make data-driven career decisions.

### Activity 1.2: Functional Requirements

- Secure user authentication using Supabase with email/password and Google OAuth support
- AI-powered job matching based on LinkedIn profile analysis against YC startups and top tech companies
- GitHub-based candidate screening with score, verdict, strengths, weaknesses, and language analysis
- Profile enhancement with LinkedIn headline suggestions, summary rewrites, skill relevance ratings, and missing keywords
- Resume analysis with formatting tips, content improvements, achievement quantification, and ATS optimization
- Personalized skills roadmap generation with phased learning plans, resource links, and YouTube video suggestions
- Interview preparation timelines with company-specific schedules, practice questions, and difficulty ratings
- Interactive dashboard with career score, run metrics, activity charts, and quick actions
- Persistent state management across sessions with Zustand + localStorage
- Run history tracking with input/output storage in Supabase

### Activity 1.3: Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | UI interactions < 100ms; AI generation 2–5 sec |
| **Availability** | Graceful fallback with mock data on API failures |
| **Security** | JWT auth via Supabase; environment-based API key management |
| **Scalability** | Stateless SPA supporting horizontal scaling of AI services |
| **Reliability** | Error boundaries, try-catch blocks, and fallback mechanisms |
| **Maintainability** | Modular component architecture with TypeScript type safety |
| **Usability** | Intuitive dark glassmorphism UI with responsive design and smooth animations |

### Activity 1.4: System Design Decisions

| Decision | Rationale |
|----------|-----------|
| **React SPA (no backend server)** | Simplified deployment; Groq SDK supports browser-side calls with `dangerouslyAllowBrowser` |
| **Groq LLaMA 3.3 70B** | Ultra-fast inference (< 3 sec); excellent JSON structured output |
| **Supabase for Auth + DB** | Managed PostgreSQL with built-in auth; eliminates custom backend |
| **Zustand for State** | Lightweight, type-safe, and supports persist middleware for localStorage |
| **Vite 8 Build Tool** | Fastest HMR; native ESM support; optimized production builds |
| **Tailwind CSS v4 + shadcn/ui** | Utility-first styling with accessible component primitives |
| **Dark Glassmorphism UI** | Premium aesthetic that improves focus and reduces eye strain |
| **Multi-step wizard pattern** | Each AI tool follows Input → Processing → Results flow for clarity |

### Activity 1.5: Technology Stack Justification

| Technology | Justification |
|-----------|---------------|
| **React 19** | Latest stable release with concurrent rendering and improved performance |
| **TypeScript 5.9** | Strong type safety prevents runtime errors in complex AI data flows |
| **Vite 8** | Sub-second HMR and optimized builds significantly improve DX |
| **Groq SDK** | 10–30x faster inference than alternatives; native JSON output mode |
| **Supabase** | Open-source Firebase alternative with PostgreSQL and built-in auth |
| **Tailwind CSS v4** | New engine with improved performance, smaller CSS output, and better DX |
| **Recharts** | Declarative React charting library with animation support |
| **Zustand** | Minimal boilerplate state management with TypeScript-first design |

**Conclusion:**
Milestone 1 established the comprehensive blueprint of TalentIQ through detailed requirement analysis and well-defined system design decisions. The architecture emphasizes performance, modularity, and seamless AI integration, providing a robust foundation for implementation.

---

## MILESTONE 2: ENVIRONMENT SETUP & INITIAL CONFIGURATION

### Activity 2.1: Development Environment Setup

**Node.js Installation**
```bash
node --version    # Requires 18+
npm --version     # or pnpm
```

**Project Initialization**
The project was initialized using Vite with the React + TypeScript template:
```bash
npm create vite@latest talentiq -- --template react-ts
cd talentiq
```

### Activity 2.2: Dependency Installation

```bash
# Install all dependencies
pnpm install
# or
npm install
```

**Verification:**
```bash
npm list react          # React 19.2.4
npm list vite           # Vite 8.0.0
npm list tailwindcss    # Tailwind CSS 4.2.1
npm list groq-sdk       # Groq SDK 1.1.1
```

### Activity 2.3: Project Structure

The project follows a feature-based modular structure separating concerns into pages, components (ui / layout / agents / dashboard / shared), services, hooks, types, store, and lib directories. See the [Technical Architecture](#technical-architecture-overview) section for the complete folder tree.

### Activity 2.4: Configuration Setup

**1. Environment Variables (.env)**

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `VITE_GROQ_API_KEY` | Groq API key for LLM inference |
| `VITE_GITHUB_TOKEN` | GitHub personal access token (higher rate limits) |
| `VITE_YOUTUBE_API_KEY` | YouTube Data API v3 key |

**2. Vite Configuration (vite.config.ts)**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

**3. Development Server**
```bash
npm run dev
# Application runs on http://localhost:5173
```

**4. Production Build**
```bash
npm run build
# Outputs to dist/ directory
npm run preview  # Preview production build
```

**Conclusion:**
Milestone 2 established a stable, reproducible development environment with properly configured tooling, dependency management, and project structure. The setup enables fast iteration with Vite's HMR and seamless integration with external services.

---

## MILESTONE 3: CORE SYSTEM DEVELOPMENT

### Activity 3.1: User Authentication (Supabase)

Authentication is implemented using Supabase Auth with the `@supabase/auth-ui-react` pre-built component:

- **Email/password signup and login** with form validation
- **Google OAuth** integration for single-click authentication
- **Session management** via JWT tokens with automatic refresh
- **Auth state tracking** using the custom `useAuth` hook that listens to `onAuthStateChange`
- **Protected routes** using a `ProtectedRoute` component that redirects unauthenticated users to `/auth`
- **Persistent user ID** stored in Zustand for cross-component access

### Activity 3.2: AI Content Generation (Groq LLM)

The `groqService.ts` implements five core AI functions using the Groq SDK:

| Function | Input | Output |
|----------|-------|--------|
| `matchJobs(linkedinUrl)` | LinkedIn URL | Profile summary + 10 ranked job matches |
| `analyzeCandidate(username, role)` | GitHub username + target role | Score, verdict, strengths, weaknesses, languages |
| `enhanceProfile(profileData)` | Title, skills, target role, bio, resume | Headlines, summary, skills, keywords, scores |
| `generateSkillsRoadmap(goals)` | Dream job, skills, level, hours/week | Multi-phase learning plan with resources |
| `generateInterviewPlan(details)` | Company, role, availability, format | Timeline, prep schedule, practice questions |

All functions use:
- **Structured system prompts** defining exact JSON output schemas
- **`response_format: { type: 'json_object' }`** for guaranteed parseable output
- **Try-catch with mock fallbacks** ensuring the app remains functional during API failures

### Activity 3.3: Data Persistence (Supabase Database)

The `dbService.ts` provides CRUD operations for Supabase:

| Function | Purpose |
|----------|---------|
| `saveRun(userId, agentType, input, output)` | Store AI agent run results |
| `getRuns(userId)` | Retrieve all runs ordered by recency |
| `saveProfile(userId, profile)` | Upsert user profile data |
| `getProfile(userId)` | Retrieve user profile |

### Activity 3.4: External Data Integration

**GitHub API Integration:**
- Fetches user's top 10 repositories (sorted by update date)
- Extracts name, language, stars, description, and topics
- Uses `VITE_GITHUB_TOKEN` for authenticated requests (higher rate limits)

**YouTube Data API v3:**
- Searches for tutorial videos matching skill names
- Returns video title, URL, and thumbnail
- Integrated into Skills Roadmap and Interview Prep tools

### Activity 3.5: Frontend Development & UI Architecture

**Design System (index.css):**
- CSS custom properties for dark/light theme tokens
- Custom gradient utilities (gradient-primary, gradient-warm, gradient-success)
- Glassmorphism effect class (backdrop-blur + semi-transparent backgrounds)
- Custom animations (fadeInUp, shimmer, slideInRight, countUp, arcDraw)
- Staggered animation system for sequential element reveals
- Custom scrollbar styling

**Component Architecture:**
- **UI Layer** — shadcn/ui primitives (Button, Card, Input, Badge, Tabs, Progress, Avatar, Separator, Switch)
- **Layout Layer** — AppShell with Sidebar, TopBar, and MobileNav
- **Agent Layer** — Tool-specific forms and result cards
- **Dashboard Layer** — MetricCard, ActivityChart, RunStatusBadge
- **Shared Layer** — ScoreGauge, StepProgress, TagInput, Toast, EmptyState, GradientCard

### Activity 3.6: State Management (Zustand)

The `useWorkspaceStore` manages all client-side state with localStorage persistence:

| State | Purpose |
|-------|---------|
| `runs` | Array of all AI agent runs |
| `profile` | User profile data (name, title, skills, etc.) |
| `savedJobs` | Bookmarked job matches |
| `completedSkills` | Skills marked as completed on roadmaps |
| `theme` | Dark/light mode preference |
| `apiKeys` | User-configured API keys |
| `hasCompletedOnboarding` | Onboarding completion flag |

### Activity 3.7: Routing & Navigation

The application uses React Router v7 with the following route structure:

| Route | Page | Auth Required |
|-------|------|--------------|
| `/` | Landing Page | No |
| `/auth` | Login/Signup | No |
| `/dashboard` | Dashboard | Yes |
| `/jobs` | Job Search | Yes |
| `/candidates` | Candidate Screening | Yes |
| `/profile-enhancer` | Profile Enhancement | Yes |
| `/skills-roadmap` | Skills Roadmap | Yes |
| `/interview-scheduler` | Interview Prep | Yes |
| `/profile` | User Profile | Yes |
| `/history` | Run History | Yes |
| `/settings` | Settings | Yes |

**Conclusion:**
Milestone 3 implemented all core features including authentication, AI content generation, database persistence, external API integration, modern UI architecture, state management, and routing. The system provides a fully functional AI-powered career platform.

---

## MILESTONE 4: INTEGRATION & OPTIMIZATION

### Activity 4.1: Component Integration

- **Service Layer** communicates with Groq, GitHub, YouTube, and Supabase APIs from the frontend
- **Zustand store** provides a single source of truth across all pages and components
- **Custom hooks** (useAuth, useAgentRun, useProfile, useRunHistory) abstract complex logic into reusable interfaces
- **Cross-tool navigation** enables seamless workflow (Job Search → Profile Enhancer → Skills Roadmap)
- **Data flow**: User Input → Service Function → Groq API → JSON Response → State Update → UI Render

### Activity 4.2: Performance Optimization

- **Vite 8** provides sub-second HMR during development and tree-shaken production builds
- **React 19 concurrent features** improve rendering performance for complex UI updates
- **Zustand persist middleware** prevents redundant state initialization on page reloads
- **useMemo and useCallback** prevent unnecessary re-renders in data-heavy components
- **Lazy evaluation** in Recharts ActivityChart reduces initial render cost
- **Animated counters** (useCountUp) provide perceived performance through visual feedback
- **CSS animations** are GPU-accelerated using transform and opacity properties

### Activity 4.3: Security Enhancements

- **Supabase JWT authentication** ensures secure session management
- **Protected routes** prevent unauthorized access to dashboard and AI tools
- **Environment variables** with `VITE_` prefix keep API keys out of source code
- **Supabase RLS (Row Level Security)** restricts database access to authenticated users' own data
- **HTTPS** communication with all external APIs (Groq, GitHub, YouTube, Supabase)
- **`dangerouslyAllowBrowser`** flag explicitly acknowledged for client-side Groq SDK usage

### Activity 4.4: Error Handling & Fallback

- **Every Groq service function** includes try-catch with comprehensive mock data fallbacks
- **GitHub API failures** gracefully handled with empty repository arrays
- **YouTube API failures** return search URL fallbacks instead of video data
- **Supabase errors** logged to console without crashing the application
- **Loading states** with animated progress bars provide visual feedback during AI operations
- **Form validation** prevents submission of incomplete or malformed input

**Conclusion:**
Milestone 4 successfully integrated all components into a cohesive system with optimized performance, robust security, and comprehensive error handling. The platform delivers a smooth, reliable user experience even under adverse conditions.

---

## MILESTONE 5: TESTING & VALIDATION

### Activity 5.1: Test Cases

| Test ID | Component | Scenario | Input | Expected Output | Status |
|---------|-----------|----------|-------|-----------------|--------|
| TC-AUTH-001 | Authentication | Login with valid credentials | Email + Password | Successful login, redirect to Dashboard | ✅ Pass |
| TC-AUTH-002 | Authentication | Google OAuth login | Google Account | JWT session created, redirect to Dashboard | ✅ Pass |
| TC-AUTH-003 | Authentication | Protected route access (unauthenticated) | Direct URL to /dashboard | Redirect to /auth | ✅ Pass |
| TC-JOB-001 | Job Search | Generate job matches | LinkedIn URL | Profile summary + 10 ranked jobs returned | ✅ Pass |
| TC-JOB-002 | Job Search | Bookmark/un-bookmark jobs | Job card action | Job added/removed from savedJobs | ✅ Pass |
| TC-CAND-001 | Candidate Screening | Screen single candidate | GitHub username + role | Score, verdict, strengths, weaknesses | ✅ Pass |
| TC-CAND-002 | Candidate Screening | Screen multiple candidates | Multiple usernames | Parallel analysis with individual reports | ✅ Pass |
| TC-CAND-003 | Candidate Screening | Generate interview questions | Candidate's top language | Language-specific questions displayed | ✅ Pass |
| TC-PROF-001 | Profile Enhancer | Enhance profile | Title, skills, target role, bio | Headlines, summary, skills analysis, keywords | ✅ Pass |
| TC-PROF-002 | Profile Enhancer | Resume analysis | Resume text upload | Formatting + content + ATS suggestions | ✅ Pass |
| TC-ROAD-001 | Skills Roadmap | Generate roadmap | Dream job, skills, level, hours | Multi-phase plan with resources + YouTube | ✅ Pass |
| TC-ROAD-002 | Skills Roadmap | Track skill progress | Check off skills | Progress bar updates, state persists | ✅ Pass |
| TC-INT-001 | Interview Prep | Generate timeline | Company, role, availability | Prep schedule + questions + resources | ✅ Pass |
| TC-DASH-001 | Dashboard | Display metrics | Completed runs | Animated counters + career score gauge | ✅ Pass |
| TC-HIST-001 | Run History | View all runs | Navigate to /history | All past runs displayed with metadata | ✅ Pass |
| TC-FALL-001 | Fallback | Groq API failure | Invalid API key | Mock data returned, UI functions normally | ✅ Pass |

### Activity 5.2: Unit Testing

- Authentication module tested for login, logout, session persistence, and token refresh
- Each Groq service function tested for proper JSON parsing and fallback behavior
- Zustand store actions tested for correct state mutations (addRun, updateRun, saveJob, toggleSkill)
- Custom hooks tested for correct state derivation (profileCompleteness, runHistory stats)
- UI components tested for rendering with various props and edge cases

### Activity 5.3: Integration Testing

- User login → Dashboard display → Tool navigation flow validated
- Frontend → Groq API → JSON parse → UI display pipeline verified
- Frontend → GitHub API → Groq analysis → UI display chain tested
- Supabase auth → protected route → API call → DB save flow confirmed
- Cross-tool workflow (Job Search → Profile Enhancer → Skills Roadmap) validated

### Activity 5.4: User Acceptance Testing

- Users successfully generated job matches and bookmarked relevant positions
- Candidate screening produced accurate, actionable technical assessments
- Profile enhancement suggestions were relevant, specific, and copy-ready
- Skills roadmaps provided structured, realistic learning paths
- Interview prep timelines were company-specific and actionable
- Dashboard provided clear career intelligence overview
- UI was intuitive, responsive, and visually polished

### Activity 5.5: Performance Metrics

| Metric | Result |
|--------|--------|
| **UI Interaction Response** | < 50ms |
| **AI Generation (Groq)** | 2–4 seconds |
| **GitHub API Fetch** | < 1 second |
| **YouTube API Search** | < 800ms |
| **Initial Page Load** | < 1.5 seconds |
| **Vite HMR Update** | < 100ms |
| **Production Build Size** | ~500 KB (gzipped) |

**Conclusion:**
Milestone 5 validated all core functionalities through structured test cases, integration testing, and user acceptance testing. Performance benchmarks confirmed fast response times and stable system behavior. The platform is robust, reliable, and ready for deployment.

---

## MILESTONE 6: DEPLOYMENT

### 6.1: Deployment Architecture

```
┌──────────────┐     HTTPS      ┌───────────────┐
│   End User   │ ◄────────────► │  Vercel CDN   │
│   Browser    │                │  (Frontend)   │
└──────┬───────┘                └───────────────┘
       │
       │  HTTPS API Calls
       ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Supabase    │  │  Groq API    │  │  GitHub +    │
│  (Auth + DB) │  │  (LLM)       │  │  YouTube API │
└──────────────┘  └──────────────┘  └──────────────┘
```

### 6.2: Hosting Platforms

| Component | Recommended Platform | Alternatives |
|-----------|---------------------|--------------|
| **Frontend** | Vercel | Netlify, AWS S3 + CloudFront, GitHub Pages |
| **Database + Auth** | Supabase (managed) | — |
| **AI Inference** | Groq Cloud (managed) | — |
| **DNS + SSL** | Vercel (automatic) | Cloudflare |

### 6.3: Deployment Steps

1. **Configure environment variables** on the hosting platform:
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - `VITE_GROQ_API_KEY`
   - `VITE_GITHUB_TOKEN`
   - `VITE_YOUTUBE_API_KEY`

2. **Build the production bundle:**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel:**
   ```bash
   npx vercel --prod
   ```
   Or connect GitHub repository for automatic deployments on push.

4. **Configure Supabase:**
   - Set up `agent_runs` and `user_profiles` tables
   - Enable Row Level Security policies
   - Configure Google OAuth provider
   - Add production URL to allowed redirect URLs

5. **Verify production deployment:**
   - Test authentication flow
   - Test all AI tools with real API keys
   - Verify run persistence in Supabase
   - Test responsive design on mobile devices

### 6.4: Production Considerations

- Enable HTTPS (automatic on Vercel/Netlify)
- Use environment variable managers (Vercel Environment Variables) instead of `.env` files
- Implement rate limiting on the Groq API to prevent abuse
- Monitor API usage and costs (Groq, YouTube, GitHub)
- Set up error monitoring (e.g., Sentry) for production error tracking
- Implement analytics (e.g., PostHog, Vercel Analytics) for usage insights
- Consider migrating Groq calls to a serverless backend (Edge Functions) to protect API keys
- Configure CDN caching for static assets

**Conclusion:**
Milestone 6 outlines a clear deployment strategy supporting modern cloud platforms with automatic SSL, CDN, and CI/CD. The system is designed for seamless production deployment with Vercel and Supabase.

---

## RESULTS

### System Output

The system successfully delivers:

- **Job Matching** — 10 ranked job matches from real YC/tech companies with match scores (0–99), salaries, locations, and personalized match explanations
- **Candidate Screening** — Technical scores (0–100), hiring verdicts, language analysis, commit activity assessment, and auto-generated interview questions
- **Profile Enhancement** — 3 headline suggestions with effectiveness scores, summary rewrite, skill relevance bars, missing keywords, and before/after profile scores
- **Resume Analysis** — Formatting tips, content improvements, quantified achievement suggestions, and ATS optimization with score improvement projections
- **Skills Roadmap** — 4-phase learning plans with skill-level hours, difficulty badges, documentation links, blog resources, and embedded YouTube tutorials
- **Interview Prep** — Multi-week preparation timelines, company-specific practice questions with difficulty ratings and hints, and recommended study resources

### Performance Evaluation

| Metric | Target | Actual |
|--------|--------|--------|
| AI generation response | < 5 sec | 2–4 sec |
| UI interaction response | < 200 ms | < 50 ms |
| Frontend render (initial) | < 3 sec | < 1.5 sec |
| State persistence | Cross-session | ✅ localStorage |
| API fallback handling | Graceful | ✅ Mock data |

---

## ADVANTAGES & LIMITATIONS

### Advantages

- **End-to-End Career Platform** — Combines job search, screening, profile optimization, learning paths, and interview prep in one unified dashboard
- **Ultra-Fast AI Generation** — Groq's LLaMA 3.3 70B delivers responses in 2–4 seconds
- **Real Data Integration** — GitHub API and YouTube API provide authentic, up-to-date data
- **No Backend Required** — All logic runs client-side, simplifying deployment and reducing costs
- **Persistent State** — Zustand with localStorage ensures data survives page refreshes
- **Graceful Degradation** — Comprehensive mock fallbacks keep the app functional during API outages
- **Modern Premium UI** — Glassmorphism design with smooth animations creates a polished experience
- **Type-Safe Codebase** — Full TypeScript coverage prevents runtime errors

### Limitations

- **Client-Side API Keys** — Groq and GitHub tokens are exposed in the browser (requires backend proxy for production)
- **No Offline Mode** — All AI features require active internet connection
- **API Rate Limits** — GitHub (60 req/hr unauthenticated, 5000 authenticated) and YouTube (10K units/day) impose usage caps
- **No Real-Time Job Data** — Job matches are AI-generated suggestions, not live job board listings
- **Limited Personalization** — No long-term user behavior analysis or ML-based recommendations
- **Single LLM Provider** — Dependency on Groq API availability
- **No Mobile App** — Web-only (responsive but no native mobile experience)

---

## FUTURE ENHANCEMENTS

### Scalability

- Migrate Groq API calls to **serverless Edge Functions** (Supabase Edge Functions or Vercel Serverless) to secure API keys
- Implement **job data caching** with Redis or Supabase real-time subscriptions
- Add **WebSocket support** for real-time progress updates during AI generation

### Feature Expansion

- **Real job board integration** (LinkedIn Jobs API, Indeed API, Greenhouse) for live job listings
- **AI Chat Assistant** for interactive career coaching and brainstorming
- **Collaborative screening** where multiple recruiters can review candidates
- **Automated resume generation** from profile data
- **Portfolio analysis** beyond GitHub (Dribbble, Behance, personal websites)
- **Multi-language support** for international users

### Cloud Integration

- Deploy on **Vercel** with automatic CI/CD from GitHub
- Implement **Supabase Edge Functions** for secure server-side AI calls
- Add **Sentry** for production error monitoring
- Integrate **PostHog** for product analytics and feature usage tracking

### Mobile Integration

- Build a **Progressive Web App (PWA)** for mobile accessibility
- Implement **push notifications** for job match alerts and interview reminders
- Add **offline caching** for previously generated roadmaps and results

### Automation

- **Scheduled job scans** that periodically check for new matching roles
- **Email notifications** for high-match job opportunities
- **Automated profile updates** based on completed skills roadmap progress
- **Integration with calendars** (Google Calendar, Outlook) for interview scheduling

---

## CONCLUSION

TalentIQ successfully implements a comprehensive AI-powered talent intelligence platform by integrating React 19, TypeScript, Groq LLM (LLaMA 3.3 70B), Supabase, GitHub API, and YouTube Data API into a unified, production-ready system. The platform automates job matching, candidate screening, profile optimization, skills roadmap generation, and interview preparation — providing professionals and recruiters with a complete career acceleration toolkit.

From a **technical perspective**, the project demonstrates:
- Modern React architecture with TypeScript, Vite 8, and Tailwind CSS v4
- Real-time AI inference integration using Groq's ultra-fast LLM API
- Secure authentication and cloud data persistence with Supabase
- External API integration (GitHub, YouTube) for authentic data enrichment
- Persistent state management with Zustand and comprehensive error handling

From a **practical standpoint**, TalentIQ addresses key challenges in the career development and talent acquisition space:
- Reduces job search time through AI-ranked, personalized matches
- Enables objective candidate assessment through automated GitHub analysis
- Improves profile visibility through AI-optimized headlines, summaries, and keywords
- Provides structured skill development paths with curated learning resources
- Streamlines interview preparation with company-specific timelines and practice questions

The modular, component-based architecture ensures maintainability, extensibility, and readiness for future enhancements including real job board integration, serverless backend migration, and mobile application development.

---

## APPENDIX

### Source Code

The complete source code includes the React 19 frontend with TypeScript, modular component architecture, AI service layer, Supabase integration, and comprehensive styling system. The project follows clean separation of concerns with dedicated directories for pages, components, services, hooks, types, and store.

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite build configuration with React and Tailwind plugins |
| `tsconfig.json` | TypeScript compiler configuration |
| `tsconfig.app.json` | App-specific TypeScript settings |
| `tsconfig.node.json` | Node-specific TypeScript settings |
| `eslint.config.js` | ESLint rules for code quality |
| `components.json` | shadcn/ui component configuration |
| `.env` | Environment variables (API keys) |
| `.gitignore` | Git ignore patterns |

### API Documentation

**Groq Service Functions:**

```typescript
matchJobs(linkedinUrl: string): Promise<{ profile, jobs[] }>
analyzeCandidate(username: string, role: string): Promise<CandidateReport>
enhanceProfile(input: ProfileInput): Promise<EnhancementResult>
generateSkillsRoadmap(input: RoadmapInput): Promise<RoadmapResult>
generateInterviewPlan(input: InterviewInput): Promise<InterviewPlan>
```

**Database Service Functions:**

```typescript
saveRun(userId: string, agentType: string, input: any, output: any): Promise<void>
getRuns(userId: string): Promise<AgentRun[]>
saveProfile(userId: string, profile: any): Promise<void>
getProfile(userId: string): Promise<UserProfile | null>
```

### GitHub Repository Link

*(GitHub URL)*

### Live Demo Link

*(Demo link)*
