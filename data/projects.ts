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
      "A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion featuring glassmorphism design and smooth animations.",
    fullDescription:
      "This portfolio website is a showcase of modern web design and development. Built with Next.js 14, TypeScript, and Tailwind CSS, it features a sleek dark theme with glassmorphism effects, animated gradient backgrounds, and smooth Framer Motion transitions. The site includes sections for home, about, skills, projects, experience, education, testimonials, and contact with a Resend API integration for form submissions.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Vercel"],
    category: "Web App",
    image: "/images/project-velocity.svg",
    liveUrl: "https://yourportfolio.com",
    githubUrl: "https://github.com/awaismustafa/portfolio",
    featured: true,
    color: "#7C3AED",
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description:
      "A MERN stack admin dashboard for managing products, orders, and customers with authentication and real-time updates.",
    fullDescription:
      "A full-featured e-commerce admin dashboard built with the MERN stack (MongoDB, Express, React, Node.js). Features include product management, order tracking, customer insights, authentication with JWT, and a responsive UI built with Tailwind CSS. The backend provides RESTful APIs for all CRUD operations.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    category: "Web App",
    image: "/images/project-pulse.svg",
    liveUrl: "https://ecommerce-dashboard-demo.com",
    githubUrl: "https://github.com/awaismustafa/ecommerce-dashboard",
    featured: true,
    color: "#06B6D4",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A collaborative task management application with user authentication, real-time updates, and drag-and-drop functionality.",
    fullDescription:
      "A modern task management application built with React, Node.js, and Socket.io for real-time collaboration. Features include user authentication, task creation and assignment, drag-and-drop board, and responsive design. Perfect for teams to manage projects efficiently.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "Web App",
    image: "/images/project-nimbus.svg",
    liveUrl: "https://task-manager-demo.com",
    githubUrl: "https://github.com/awaismustafa/task-manager",
    featured: false,
    color: "#EC4899",
  },
  {
    id: 4,
    title: "Weather Application",
    description:
      "A beautiful weather app that provides current weather and forecasts using a third-party weather API with location-based search.",
    fullDescription:
      "A clean and intuitive weather application built with React and Tailwind CSS. Features include current weather conditions, 7-day forecast, location search, and responsive design. Uses OpenWeatherMap API to fetch real-time weather data.",
    tags: ["React", "API", "Tailwind", "Responsive"],
    category: "Web App",
    image: "/images/project-clarity.svg",
    liveUrl: "https://weather-app-demo.com",
    githubUrl: "https://github.com/awaismustafa/weather-app",
    featured: false,
    color: "#7C3AED",
  },
  {
    id: 5,
    title: "Blog Platform",
    description:
      "A full-stack blog platform with Markdown support, user comments, and an admin interface for managing posts.",
    fullDescription:
      "A modern blog platform built with Next.js and MongoDB. Features include Markdown rendering, user authentication, comment system, and an intuitive admin dashboard for creating and managing blog posts. Styled with Tailwind CSS for a clean, professional look.",
    tags: ["Next.js", "MongoDB", "Markdown", "Tailwind"],
    category: "Web App",
    image: "/images/project-orbit.svg",
    liveUrl: "https://blog-platform-demo.com",
    githubUrl: "https://github.com/awaismustafa/blog-platform",
    featured: false,
    color: "#06B6D4",
  },
];
