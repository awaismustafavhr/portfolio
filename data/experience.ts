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
    company: "CodeDesk Studio",
    role: "Full Stack Developer",
    type: "Onsite",
    date: "June – Sep 2025",
    summary: [
      "Developed frontend and backend for production apps and websites using JavaScript, Node.js, and Next.js.",
      "Contributed to multiple projects, collaborating with frontend and backend teams while gaining solid frontend design knowledge.",
      "Actively participated in daily standups for progress updates and issue resolution.",
    ],
    tags: ["JavaScript", "Node.js", "Next.js", "React"],
  },
  {
    company: "Connect & Learn",
    role: "Web Developer",
    type: "Project",
    date: "Jan 2024 – Sep 2024",
    summary: [
      "Developed a collaborative learning platform offering skill exchange, personalized tutoring, real-world project opportunities, and an innovative project ideas space.",
      "The platform serves as an innovation hub, fostering creativity and creating a connected ecosystem for users to engage, excel, and advance their educational and professional pursuits.",
    ],
    tags: ["React", "Node.js", "Next.js", "Express", "MongoDB", "Tailwind CSS"],
  },
];
