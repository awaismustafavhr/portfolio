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
    name: "Next.js",
    level: 85,
    proficiency: "Expert",
    icon: "Zap",
    category: "Frontend",
    description: "App Router, Server Components, SSR/SSG, Dynamic Routing & SEO optimization.",
  },
  {
    name: "TypeScript",
    level: 80,
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
    name: "Angular",
    level: 72,
    proficiency: "Proficient",
    icon: "Sparkles",
    category: "Frontend",
    description: "Component-based architecture, Services, RxJS & reactive forms.",
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
    level: 82,
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
    name: "Flutter",
    level: 75,
    proficiency: "Advanced",
    icon: "Smartphone",
    category: "Tools & DevOps",
    description: "Cross-platform mobile apps for Android & iOS with Dart and Supabase integration.",
  },
  {
    name: "Git & GitHub",
    level: 85,
    proficiency: "Expert",
    icon: "GitBranch",
    category: "Tools & DevOps",
    description: "Version control workflows, Feature branching, Pull requests & Merge strategies.",
  },
  {
    name: "Supabase",
    level: 74,
    proficiency: "Advanced",
    icon: "Cloud",
    category: "Tools & DevOps",
    description: "Real-time database, Auth, Row-level security & Edge Functions.",
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
    icon: "Monitor",
    category: "Design",
    description: "Mobile-first layouts, Fluid typography & Cross-browser consistency.",
  },
];

export const marqueeTechnologies = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "Express.js",
  "Angular",
  "Flutter",
  "Supabase",
  "Git & GitHub",
  "REST APIs",
];
