export type ExperienceItem = {
  company: string;
  role: string;
  type: string;
  date: string;
  summary: string[];
  tags: string[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "Freelance",
    role: "Full Stack Developer",
    type: "Freelance",
    date: "2024 - Present",
    summary: [
      "Developed and deployed multiple web applications using MERN stack for various clients.",
      "Designed responsive user interfaces with React and Tailwind CSS.",
      "Built RESTful APIs with Node.js and Express, integrating MongoDB databases.",
    ],
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
  },
  {
    company: "Self-Learning & Projects",
    role: "MERN Stack Developer",
    type: "Personal",
    date: "2023 - 2024",
    summary: [
      "Completed comprehensive courses on full stack web development.",
      "Built multiple personal projects to practice and showcase skills.",
      "Contributed to open-source projects and collaborated with other developers.",
    ],
    tags: ["Next.js", "TypeScript", "Git", "Vercel"],
  },
];
