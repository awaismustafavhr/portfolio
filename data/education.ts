export type EducationItem = {
  institution: string;
  initials: string;
  level: string;
  degree: string;
  field: string;
  range: string;
  grade: string;
  highlights: string[];
  skills: string[];
};

export const education: EducationItem[] = [
  {
    institution: "COMSATS University Islamabad, Vehari Campus",
    initials: "CUI",
    level: "Bachelor's",
    degree: "BS Software Engineering",
    field: "Software Engineering",
    range: "2022 – 2026",
    grade: "2.85 / 4 GPA",
    highlights: [
      "Relevant coursework: OOP, Data Structures, Database Systems, Software Design & Analysis, Web Programming, Data Science, Information Security.",
      "Built a final-year project — an Online Blood Donation Request Portal — using React.js, Node.js, and MongoDB with role-based access control.",
      "Developed strong problem-solving skills through practical assignments and team-based software engineering projects.",
    ],
    skills: ["OOP", "Data Structures", "Web Programming", "Database Systems", "Data Science", "Information Security"],
  },
];
