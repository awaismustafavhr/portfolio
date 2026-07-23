export type ProjectCategory =
  | "All"
  | "Web App"
  | "Mobile"
  | "Open Source"
  | "UI/UX";

export type Project = {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  category: Exclude<ProjectCategory, "All">;
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  color: string;
};

export const projectCategories: ProjectCategory[] = [
  "All",
  "Web App",
  "Mobile",
  "Open Source",
  "UI/UX",
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Lenis smooth scrolling with glassmorphism design.",
    fullDescription:
      "This portfolio website showcases modern web development expertise. Built with Next.js 14, TypeScript, Tailwind CSS, and Lenis smooth scrolling, it features an interactive dark theme with glassmorphism visual effects, custom keyframe particle animations, and fluid Framer Motion transitions. Includes complete sections for projects, skills, experience, education, testimonials, and contact with Resend email integration.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Lenis"],
    category: "Web App",
    image: "/images/project-portfolio-preview.png",
    liveUrl: "https://yourportfolio.com",
    githubUrl: "https://github.com/awaismustafa/portfolio",
    featured: true,
    color: "#7C3AED",
  },
  {
    id: 2,
    title: "Online Blood Donation Request Portal",
    description:
      "A life-saving web platform connecting blood donors with patients in need, featuring real-time donor search, request management, and emergency alerts.",
    fullDescription:
      "A full-stack web application built to bridge the gap between blood donors and recipients. Features include donor registration with blood group management, live donor search with location filtering, urgent blood request posting, admin dashboard for request tracking, SMS/email notifications for emergency requests, and a responsive interface accessible on all devices. Built with the MERN stack and deployed on Vercel.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Vercel"],
    category: "Web App",
    image: "/images/project-blood-donation.png",
    liveUrl: "https://online-blood-donation-five.vercel.app/",
    githubUrl: "https://github.com/awaismustafa/online-blood-donation",
    featured: true,
    color: "#EF4444",
  },
  {
    id: 3,
    title: "University Complaint Management System",
    description:
      "A robust university complaint portal enabling students to submit, track, and resolve grievances with departmental routing and status updates.",
    fullDescription:
      "A comprehensive complaint management system designed for university environments. Students can submit complaints across categories like academic, administrative, and hostel issues. The system features role-based access for students, department heads, and admins, automated routing based on complaint type, real-time status tracking with email notifications, resolution timelines, priority escalation, and a detailed analytics dashboard for management oversight.",
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    category: "Web App",
    image: "/images/project-complaint-system.png",
    liveUrl: "https://university-complaint-system.vercel.app",
    githubUrl: "https://github.com/awaismustafa/university-complaint-system",
    featured: true,
    color: "#06B6D4",
  },
  {
    id: 4,
    title: "Task Management App",
    description:
      "A real-time collaborative task management board with user roles, drag-and-drop workflow, and instant Socket.io updates.",
    fullDescription:
      "A productivity app built with React, Node.js, and Socket.io for team collaboration. Features interactive drag-and-drop task boards, deadline alerts, customizable project columns, role-based access control, and instant WebSocket notifications.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "Web App",
    image: "/images/project-taskmanager.png",
    liveUrl: "https://task-manager-demo.com",
    githubUrl: "https://github.com/awaismustafa/task-manager",
    featured: false,
    color: "#EC4899",
  },
  {
    id: 5,
    title: "Weather Application",
    description:
      "A clean weather forecasting application delivering live meteorological data, radar maps, and location search.",
    fullDescription:
      "An intuitive weather monitoring web app created with React and Tailwind CSS. Features 7-day hourly forecasts, atmospheric graphs, geolocation detection, and instant city search powered by OpenWeather API.",
    tags: ["React", "API", "Tailwind", "Responsive"],
    category: "Web App",
    image: "/images/project-weather.png",
    liveUrl: "https://weather-app-demo.com",
    githubUrl: "https://github.com/awaismustafa/weather-app",
    featured: false,
    color: "#7C3AED",
  },
  {
    id: 6,
    title: "Blog Platform",
    description:
      "A modern content publishing platform featuring live Markdown editing, reader comments, and admin analytics.",
    fullDescription:
      "A modern blog and content publishing platform built with Next.js and MongoDB. Supports live Markdown editing, custom tag filtering, social sharing, nested reader comments, and SEO optimization.",
    tags: ["Next.js", "MongoDB", "Markdown", "Tailwind"],
    category: "Web App",
    image: "/images/project-blog.png",
    liveUrl: "https://blog-platform-demo.com",
    githubUrl: "https://github.com/awaismustafa/blog-platform",
    featured: false,
    color: "#06B6D4",
  },
];
