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
    field: "Software Engineering & Human Computer Interaction",
    range: "2019 - 2023",
    grade: "2.85 GPA",
    highlights: [
      "Focused on frontend architecture, product thinking, and human-centered design.",
      "Built final-year projects around accessible web platforms and scalable APIs.",
      "Contributed to collaborative labs with peer-reviewed design critiques.",
    ],
    skills: ["Algorithms", "Databases", "UX Research", "Systems Design"],
  },
];
