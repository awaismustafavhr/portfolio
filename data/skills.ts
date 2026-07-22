export type SkillCategory =
  | "All"
  | "Frontend"
  | "Backend"
  | "Tools & DevOps"
  | "Design";

export type Skill = {
  name: string;
  level: number;
  icon: string;
  category: Exclude<SkillCategory, "All">;
};

export const skillCategories: SkillCategory[] = [
  "All",
  "Frontend",
  "Backend",
  "Tools & DevOps",
  "Design",
];

export const skills: Skill[] = [
  { name: "React", level: 78, icon: "R", category: "Frontend" },
  { name: "Next.js", level: 72, icon: "N", category: "Frontend" },
  { name: "TypeScript", level: 70, icon: "TS", category: "Frontend" },
  { name: "Tailwind CSS", level: 80, icon: "TW", category: "Frontend" },
  { name: "Framer Motion", level: 65, icon: "FM", category: "Frontend" },
  { name: "HTML5 / CSS3", level: 85, icon: "HC", category: "Frontend" },
  { name: "Node.js", level: 68, icon: "ND", category: "Backend" },
  { name: "Express", level: 65, icon: "EX", category: "Backend" },
  { name: "MongoDB", level: 70, icon: "MG", category: "Backend" },
  { name: "REST APIs", level: 72, icon: "API", category: "Backend" },
  { name: "Git / GitHub", level: 75, icon: "GT", category: "Tools & DevOps" },
  { name: "VS Code", level: 85, icon: "VS", category: "Tools & DevOps" },
  { name: "Figma", level: 60, icon: "FG", category: "Tools & DevOps" },
  { name: "Vercel", level: 65, icon: "VC", category: "Tools & DevOps" },
  { name: "UI/UX Design", level: 60, icon: "UX", category: "Design" },
  { name: "Responsive Design", level: 75, icon: "RD", category: "Design" },
];

export const marqueeTechnologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind",
  "MongoDB",
  "Express",
  "Git",
  "Vercel",
  "Figma",
];
