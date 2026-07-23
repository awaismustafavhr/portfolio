export type SkillCategory =
  | "All"
  | "Frontend"
  | "Backend"
  | "Tools & DevOps"
  | "Design";

export type ProficiencyLevel = "Expert" | "Advanced" | "Proficient";

export type Skill = {
  name: string;
  level: number;
  proficiency: ProficiencyLevel;
  icon: string;
  category: Exclude<SkillCategory, "All">;
  description: string;
};

export const skillCategories: SkillCategory[] = [
  "All",
  "Frontend",
  "Backend",
  "Tools & DevOps",
  "Design",
];

export const skills: Skill[] = [
  // Frontend
  {
    name: "React.js",
    level: 88,
    proficiency: "Expert",
    icon: "Code2",
    category: "Frontend",
    description: "Component architecture, Custom Hooks, State Management & Fiber reconciliation.",
  },
  {
    name: "Next.js 14",
    level: 85,
    proficiency: "Expert",
    icon: "Zap",
    category: "Frontend",
    description: "App Router, Server Components, SSR/SSG, Dynamic Routing & SEO optimization.",
  },
  {
    name: "TypeScript",
    level: 82,
    proficiency: "Advanced",
    icon: "FileCode",
    category: "Frontend",
    description: "Strict typing, Generics, Interfaces, Type guards & Enterprise code safety.",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    proficiency: "Expert",
    icon: "Layout",
    category: "Frontend",
    description: "Utility-first design systems, Responsive layouts & Glassmorphism themes.",
  },
  {
    name: "Framer Motion",
    level: 78,
    proficiency: "Advanced",
    icon: "Sparkles",
    category: "Frontend",
    description: "Fluid micro-interactions, Keyframe animations & Scroll-driven transitions.",
  },
  {
    name: "HTML5 / CSS3",
    level: 92,
    proficiency: "Expert",
    icon: "Globe",
    category: "Frontend",
    description: "Semantic HTML structure, CSS Grid/Flexbox, Keyframes & Accessibility (a11y).",
  },

  // Backend
  {
    name: "Node.js",
    level: 80,
    proficiency: "Advanced",
    icon: "Server",
    category: "Backend",
    description: "Asynchronous I/O, Event loop tuning, Express middleware & Microservices.",
  },
  {
    name: "Express.js",
    level: 82,
    proficiency: "Advanced",
    icon: "Cpu",
    category: "Backend",
    description: "RESTful API design, Middleware chains, Error handling & JWT authentication.",
  },
  {
    name: "MongoDB",
    level: 78,
    proficiency: "Advanced",
    icon: "Database",
    category: "Backend",
    description: "Mongoose ODM, Aggregation pipelines, Indexing & Schema validation.",
  },
  {
    name: "REST APIs",
    level: 85,
    proficiency: "Expert",
    icon: "Network",
    category: "Backend",
    description: "Resource structuring, CORS policies, Rate limiting & OpenAPI specs.",
  },

  // Tools & DevOps
  {
    name: "Git & GitHub",
    level: 85,
    proficiency: "Expert",
    icon: "GitBranch",
    category: "Tools & DevOps",
    description: "Version control workflows, Feature branching, Pull requests & Merge strategies.",
  },
  {
    name: "Vercel & Deployment",
    level: 80,
    proficiency: "Advanced",
    icon: "Cloud",
    category: "Tools & DevOps",
    description: "CI/CD pipelines, Edge Functions, Environment vars & Production builds.",
  },
  {
    name: "VS Code",
    level: 90,
    proficiency: "Expert",
    icon: "Terminal",
    category: "Tools & DevOps",
    description: "Custom keybindings, Linter configurations, Debugging & Extensions.",
  },
  {
    name: "Postman",
    level: 82,
    proficiency: "Advanced",
    icon: "Send",
    category: "Tools & DevOps",
    description: "API testing, Automated collection suites, Environment variables & Mocking.",
  },

  // Design
  {
    name: "UI/UX Design",
    level: 75,
    proficiency: "Proficient",
    icon: "Palette",
    category: "Design",
    description: "Wireframing, High-fidelity mockups, Visual hierarchy & Design tokens.",
  },
  {
    name: "Responsive Web Design",
    level: 92,
    proficiency: "Expert",
    icon: "Smartphone",
    category: "Design",
    description: "Mobile-first layouts, Fluid typography & Cross-browser consistency.",
  },
];

export const marqueeTechnologies = [
  "React.js",
  "Next.js 14",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "Express.js",
  "Framer Motion",
  "Git & GitHub",
  "Vercel",
  "REST APIs",
  "UI/UX Design",
];
