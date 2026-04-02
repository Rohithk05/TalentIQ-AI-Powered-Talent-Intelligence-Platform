import { groq, GROQ_MODEL } from '@/lib/groq';

export async function enhanceProfile(input: {
  currentTitle: string;
  yearsOfExperience: string;
  currentSkills: string[];
  targetRole: string;
  bio: string;
  resumeText?: string;
}) {
  const systemPrompt = "You are an expert career coach, LinkedIn optimizer, and resume consultant. Analyze the profile and resume provided and return this exact JSON:\n{\n  headlineSuggestions: [\n    { text: string, effectivenessScore: number }\n  ] (3 items),\n  summaryRewrite: string,\n  skillsToHighlight: [\n    { skill: string, relevanceScore: number }\n  ] (top 6),\n  missingKeywords: string[] (8-10 keywords),\n  beforeScore: number (45-70),\n  afterScore: number (82-96),\n  resumeSuggestions: {\n    formatting: string[] (3 formatting tips),\n    contentImprovements: string[] (4 specific improvements),\n    quantifyAchievements: string[] (3 examples of how to add metrics to their experience, be specific),\n    atsOptimization: string[] (3 ATS tips for target role),\n    overallResumeScore: number (40-75),\n    improvedResumeScore: number (80-95)\n  }\n}\nIf no resume is provided, give general advice based on the target role. Be specific and actionable.";
  const userMessage = `Current title: ${input.currentTitle}\nExperience: ${input.yearsOfExperience} years\nCurrent skills: ${input.currentSkills.join(', ')}\nTarget role: ${input.targetRole}\nBio: ${input.bio}\nResume: ${input.resumeText || 'None provided'}`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      model: GROQ_MODEL,
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Groq enhanceProfile error:', error);
    // Mock data fallback
    return {
      headlineSuggestions: [
        { text: `Senior ${input.targetRole} | Expert in ${input.currentSkills[0] || 'Technology'}`, effectivenessScore: 92 },
        { text: `${input.targetRole} with ${input.yearsOfExperience} years experience`, effectivenessScore: 88 },
        { text: `Passionate ${input.targetRole} | Focused on scaling solutions`, effectivenessScore: 85 }
      ],
      summaryRewrite: `Dynamic ${input.targetRole} with ${input.yearsOfExperience} years of experience in ${input.currentSkills.join(', ')}. Proven track record of delivering results.`,
      skillsToHighlight: input.currentSkills.map((s, i) => ({ skill: s, relevanceScore: 95 - i })).slice(0, 5),
      missingKeywords: ['Leadership', 'System Design', 'Agile', 'Mentorship'],
      beforeScore: 55,
      afterScore: 90,
      resumeSuggestions: {
        formatting: ["Use a clean, single-column layout", "Ensure consistent margins", "Use standard fonts like Arial or Calibri"],
        contentImprovements: ["Tailor summary to the target role", "Highlight major achievements", "Remove outdated experience", "Use strong action verbs"],
        quantifyAchievements: ["Increased performance by X%", "Managed a team of Y people", "Reduced latency by Z ms"],
        atsOptimization: ["Include core technologies from target job description", "Use standard section headers", "Avoid tables and graphics"],
        overallResumeScore: 60,
        improvedResumeScore: 90
      }
    };
  }
}

export async function generateSkillsRoadmap(input: {
  dreamJob: string;
  currentSkills: string[];
  experienceLevel: string;
  hoursPerWeek: number;
}) {
  const systemPrompt = "You are a senior engineering career coach and curriculum designer. Create a detailed skills roadmap and return exactly this JSON structure:\n{\n  totalMonths: number,\n  phases: [\n    {\n      phase: number,\n      title: string,\n      duration: string,\n      skills: [\n        {\n          name: string,\n          hours: number,\n          difficulty: 'Beginner'|'Intermediate'|'Advanced',\n          resources: [{ title: string, url: string, type: 'blog'|'docs' }]\n        }\n      ]\n    }\n  ]\n}\nReturn exactly 4 phases. Each skill MUST have EXACTLY 1 resource that is either a blog post or official documentation (do not include videos). Skills must be specific to the dream job.";
  const userMessage = `Dream Job: ${input.dreamJob}\nCurrent Skills: ${input.currentSkills.join(', ')}\nExperience Level: ${input.experienceLevel}\nHours Per Week: ${input.hoursPerWeek}`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      model: GROQ_MODEL,
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Groq generateSkillsRoadmap error:', error);
    return {
      totalMonths: 6,
      phases: [
        {
          phase: 1,
          title: "Foundation",
          duration: "1 month",
          skills: [
            {
              name: "Fundamentals",
              hours: 40,
              difficulty: "Beginner",
              resources: [{ title: "MDN Web Docs", url: "https://developer.mozilla.org", type: "docs" }]
            }
          ]
        },
        {
          phase: 2,
          title: "Core Concepts",
          duration: "2 months",
          skills: [
            {
              name: "Advanced Frameworks",
              hours: 80,
              difficulty: "Intermediate",
              resources: [{ title: "Official Documentation", url: "#", type: "docs" }]
            }
          ]
        },
        {
          phase: 3,
          title: "System Design",
          duration: "2 months",
          skills: [
            {
              name: "Architecture",
              hours: 80,
              difficulty: "Advanced",
              resources: [{ title: "System Design Primer", url: "#", type: "blog" }]
            }
          ]
        },
        {
          phase: 4,
          title: "Interview Prep",
          duration: "1 month",
          skills: [
            {
              name: "Mock Interviews",
              hours: 40,
              difficulty: "Advanced",
              resources: [{ title: "Pramp Blog", url: "https://pramp.com/blog", type: "blog" }]
            }
          ]
        }
      ]
    };
  }
}

export async function generateInterviewPlan(input: {
  targetCompany: string;
  role: string;
  availableDays: string[];
  formats: string[];
  timezone: string;
}) {
  const systemPrompt = "You are an expert interview coach and scheduling specialist. Generate a realistic interview preparation plan and return exactly this JSON structure:\n{\n  timeline: [\n    {\n      week: number,\n      roundType: string,\n      suggestedDay: string,\n      suggestedTime: string,\n      duration: string,\n      tips: string[]\n    }\n  ],\n  prepSchedule: [\n    {\n      week: number,\n      focus: string,\n      tasks: string[]\n    }\n  ],\n  recommendedResources: [\n    { title: string, url: string }\n  ],\n  practiceQuestions: [\n    {\n      round: string,\n      questions: [\n        { question: string, difficulty: 'Easy'|'Medium'|'Hard', hint: string }\n      ]\n    }\n  ]\n}\nMake the plan specific to the company and role. Include 4 weeks.";
  const userMessage = `Company: ${input.targetCompany}\nRole: ${input.role}\nAvailable Days: ${input.availableDays.join(', ')}\nFormats: ${input.formats.join(', ')}\nTimezone: ${input.timezone}`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      model: GROQ_MODEL,
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Groq generateInterviewPlan error:', error);
    return {
      timeline: [
        { week: 1, roundType: "Recruiter Screen", suggestedDay: "Monday", suggestedTime: "10:00 AM", duration: "30 mins", tips: ["Research company culture"] },
        { week: 2, roundType: "Technical Screen", suggestedDay: "Wednesday", suggestedTime: "2:00 PM", duration: "1 hour", tips: ["Practice data structures"] },
        { week: 3, roundType: "System Design", suggestedDay: "Tuesday", suggestedTime: "1:00 PM", duration: "1 hour", tips: ["Review architecture patterns"] },
        { week: 4, roundType: "Onsite", suggestedDay: "Thursday", suggestedTime: "9:00 AM", duration: "4 hours", tips: ["Rest well", "Prepare behavioral stories"] }
      ],
      prepSchedule: [
        { week: 1, focus: "Behavioral & Resume", tasks: ["Update resume", "STAR method prep"] },
        { week: 2, focus: "Algorithms", tasks: ["LeetCode mediums", "Time complexity review"] },
        { week: 3, focus: "System Design", tasks: ["Scalability concepts", "Mock design sessions"] },
        { week: 4, focus: "Company specific", tasks: ["Deep dive into product", "Culture fit questions"] }
      ],
      recommendedResources: [
        { title: "Grokking the System Design Interview", url: "https://educative.io" },
        { title: "LeetCode Premium", url: "https://leetcode.com" }
      ],
      practiceQuestions: [
        {
          round: "Technical Screen",
          questions: [
            { question: "Implement a rate limiter.", difficulty: "Medium", hint: "Consider using a token bucket algorithm." },
            { question: "Find the median of two sorted arrays.", difficulty: "Hard", hint: "Use binary search on the smaller array." }
          ]
        },
        {
          round: "System Design",
          questions: [
            { question: "Design Twitter timeline.", difficulty: "Hard", hint: "Discuss fan-out on write vs read." }
          ]
        }
      ]
    };
  }
}

export async function analyzeCandidate(username: string, role: string) {
  let repos = [];
  try {
    const githubRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
      {
        headers: import.meta.env.VITE_GITHUB_TOKEN ? {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        } : undefined
      }
    );
    if (githubRes.ok) {
      repos = await githubRes.json();
    }
  } catch (err) {
    console.warn("GitHub fetch failed", err);
  }

  const repoDataStr = JSON.stringify(
    repos.map((r: any) => ({
      name: r.name,
      language: r.language,
      stars: r.stargazers_count,
      description: r.description,
      topics: r.topics
    }))
  );

  const systemPrompt = `You are a strict technical hiring manager. Analyze this GitHub profile for the role of ${role} and return exactly this JSON:\n{\n  "score": number (0-100),\n  "verdict": "Strong Hire"|"Hire"|"No Hire",\n  "strengths": string[] (3-4 items),\n  "weaknesses": string[] (2-3 items),\n  "topLanguages": string[],\n  "repoCount": number,\n  "commitActivity": "Daily"|"Weekly"|"Monthly"|"Inactive",\n  "summary": "string"\n}\nBe strict. Score honestly based on the actual repos.`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: repoDataStr }
      ],
      model: GROQ_MODEL,
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Groq analyzeCandidate error:', error);
    return {
      score: 75,
      verdict: "Hire",
      strengths: ["Clean code", "Consistent commits", "Good documentation"],
      weaknesses: ["Limited testing", "Few complex architectures"],
      topLanguages: ["TypeScript", "Python"],
      repoCount: 15,
      commitActivity: "Weekly",
      summary: "A solid developer with good consistency but limited exposure to large-scale systems."
    };
  }
}

export async function matchJobs(linkedinUrl: string) {
  const systemPrompt = "You are an expert tech recruiter with deep knowledge of the startup ecosystem. Based on the LinkedIn profile URL provided, generate a highly detailed profile and return EXACTLY 10 job matches from real YC and top tech companies.\n\nReturn this exact JSON structure:\n{\n  profile: {\n    name: string,\n    headline: string,\n    skills: string[] (8-10 skills),\n    domain: string,\n    experienceLevel: string,\n    confidenceScore: number (85-98),\n    summary: string (2-3 sentences)\n  },\n  jobs: [\n    {\n      id: string,\n      title: string,\n      company: string,\n      location: string,\n      jobType: 'Full-time'|'Remote'|'Hybrid',\n      salary: string (e.g. '$120k - $160k'),\n      matchScore: number (0.50 to 0.99),\n      applyUrl: string,\n      tags: string[],\n      whyMatch: string (1 sentence explaining the match),\n      postedAgo: string (e.g. '2 days ago')\n    }\n  ]\n}\n\nUse ONLY these real companies (mix of YC + big tech):\nLinear, Vercel, Supabase, Notion, Figma, Stripe, Airbnb, Coinbase, Brex, Rippling, Deel, Scale AI, Weights & Biases, Hugging Face, Replicate, Modal, Fly.io, Clerk, PlanetScale, Neon, Turso, Resend, Loops, Posthog, Dub, Cal.com, Raycast, Arc, OpenAI, Anthropic, Mistral, Cohere.\n\nSort jobs by matchScore descending.\nMake salary, location, jobType realistic for each company.\nwhyMatch must be specific to the profile's skills.";

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Find matches for linkedin profile: ${linkedinUrl}` }
      ],
      model: GROQ_MODEL,
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Groq matchJobs error:', error);
    return {
      profile: {
        name: linkedinUrl.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || "Alex Developer",
        headline: "Senior Software Engineer",
        skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "PostgreSQL", "Next.js"],
        domain: "Engineering",
        experienceLevel: "Senior",
        confidenceScore: 92,
        summary: "Passionate software engineer with 5+ years of experience building scalable web applications. Strong focus on frontend architecture and developer experience. Proven ability to lead features from conception to deployment."
      },
      jobs: [
        { id: "1", title: "Senior Frontend Engineer", company: "Linear", location: "San Francisco, CA", jobType: "Hybrid", salary: "$160k - $200k", matchScore: 98, applyUrl: "https://linear.app/careers", tags: ["React", "TypeScript"], whyMatch: "Your deep React and TypeScript experience aligns perfectly with Linear's frontend stack.", postedAgo: "2 days ago" },
        { id: "2", title: "Full Stack Developer", company: "Vercel", location: "Remote", jobType: "Remote", salary: "$150k - $190k", matchScore: 95, applyUrl: "https://vercel.com/careers", tags: ["Next.js", "Edge"], whyMatch: "Your expertise with Next.js makes you an ideal candidate to help build out Vercel's edge infrastructure.", postedAgo: "5 hours ago" },
        { id: "3", title: "Product Engineer", company: "Supabase", location: "Remote", jobType: "Remote", salary: "$140k - $180k", matchScore: 91, applyUrl: "https://supabase.com/careers", tags: ["PostgreSQL", "React"], whyMatch: "Strong PostgreSQL and Node.js skills fit exactly into Supabase's open-source engineering ecosystem.", postedAgo: "1 day ago" },
        { id: "4", title: "Software Engineer", company: "Notion", location: "San Francisco, CA", jobType: "Hybrid", salary: "$150k - $210k", matchScore: 88, applyUrl: "https://notion.so/careers", tags: ["Full Stack", "TypeScript"], whyMatch: "Your frontend architecture experience will help scale Notion's complex real-time collaboration features.", postedAgo: "3 days ago" },
        { id: "5", title: "Backend Engineer", company: "Stripe", location: "Seattle, WA", jobType: "Hybrid", salary: "$170k - $230k", matchScore: 85, applyUrl: "https://stripe.com/jobs", tags: ["API", "Systems"], whyMatch: "Your backend distributed scalable architecture experience is highly desirable for Stripe's core financial services API.", postedAgo: "1 week ago" },
        { id: "6", title: "Senior Software Engineer", company: "Figma", location: "San Francisco, CA", jobType: "Hybrid", salary: "$180k - $240k", matchScore: 82, applyUrl: "https://figma.com/careers", tags: ["C++", "WebGL"], whyMatch: "Your interest in performance optimization aligns with Figma's core editing engine challenges.", postedAgo: "4 days ago" },
        { id: "7", title: "Platform Engineer", company: "Coinbase", location: "Remote", jobType: "Remote", salary: "$160k - $220k", matchScore: 78, applyUrl: "https://coinbase.com/careers", tags: ["Go", "Distributed Systems"], whyMatch: "Your AWS and Docker skills are excellent for scaling Coinbase's high-throughput crypto infrastructure.", postedAgo: "2 days ago" },
        { id: "8", title: "Frontend Lead", company: "Airbnb", location: "San Francisco, CA", jobType: "Hybrid", salary: "$190k - $250k", matchScore: 75, applyUrl: "https://careers.airbnb.com", tags: ["React", "UI/UX"], whyMatch: "Your history of leading features from conception to deployment makes you a strong candidate for this leadership role.", postedAgo: "1 day ago" },
        { id: "9", title: "Systems Engineer", company: "Scale AI", location: "San Francisco, CA", jobType: "Full-time", salary: "$160k - $210k", matchScore: 70, applyUrl: "https://scale.com/careers", tags: ["Python", "ML Infrastructure"], whyMatch: "Your backend systems knowledge can help scale the complex data pipelines at Scale AI.", postedAgo: "6 hours ago" },
        { id: "10", title: "Developer Advocate", company: "Hugging Face", location: "Paris, France / Remote", jobType: "Remote", salary: "$130k - $170k", matchScore: 65, applyUrl: "https://huggingface.co/careers", tags: ["Open Source", "Python"], whyMatch: "Your passion for developer experience makes you a dark-horse candidate for advocating open-source ML models.", postedAgo: "2 weeks ago" }
      ]
    };
  }
}
