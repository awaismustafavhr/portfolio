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
    title: "AI Tools Reseller Platform",
    description:
      "A full-stack SaaS platform enabling users to resell premium AI tools like ChatGPT, Midjourney, and Gemini under one subscription with role-based access and billing.",
    fullDescription:
      "A comprehensive AI tools reseller platform built with the MERN stack. Users can subscribe and resell access to 50+ AI tools including ChatGPT, Midjourney, Gemini, DALL-E and more. Features include role-based user management, subscription billing, admin dashboard for tool management, API key provisioning, usage analytics, and a clean responsive UI. Deployed on Vercel with secure authentication and real-time usage tracking.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Vercel", "REST APIs"],
    category: "Web App",
    image: "/images/project-ai-tools.svg",
    liveUrl: "https://ai-tool-reseller-platform-q9agvm59v-awais-mern-projects.vercel.app",
    githubUrl: "https://github.com/awaismustafavhr/ai-tool-reseller-platform",
    featured: true,
    color: "#7C3AED",
  },
  {
    id: 2,
    title: "Zinger Heaven — Restaurant Platform",
    description:
      "A full-stack restaurant ordering platform for Zinger Heaven with online menu browsing, order placement, deal management, and real-time order tracking.",
    fullDescription:
      "Zinger Heaven is a complete restaurant web platform built with the MERN stack. Customers can browse the menu, add items to cart, place orders online, and track delivery in real time. Features include category-based menu filtering, deal promotions, order history, admin panel for managing items and orders, responsive design for mobile users, and smooth checkout flow. Deployed on Render.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Render"],
    category: "Web App",
    image: "/images/project-zinger-heaven.svg",
    liveUrl: "https://zinger-heavens.onrender.com",
    githubUrl: "https://github.com/awaismustafavhr/zinger-heaven",
    featured: true,
    color: "#F97316",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Lenis smooth scrolling with glassmorphism design.",
    fullDescription:
      "This portfolio website showcases modern web development expertise. Built with Next.js 14, TypeScript, Tailwind CSS, and Lenis smooth scrolling, it features an interactive dark theme with glassmorphism visual effects, custom keyframe particle animations, and fluid Framer Motion transitions. Includes complete sections for projects, skills, experience, education, testimonials, and contact with email integration.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Lenis"],
    category: "Web App",
    image: "/images/project-portfolio-preview.png",
    liveUrl: "https://yourportfolio.com",
    githubUrl: "https://github.com/awaismustafavhr/portfolio",
    featured: true,
    color: "#7C3AED",
  },
  {
    id: 4,
    title: "Online Blood Donation Request Portal",
    description:
      "A life-saving web platform connecting blood donors with patients in need, featuring real-time donor search, request management, and role-based dashboards.",
    fullDescription:
      "A full-stack web application built to bridge the gap between blood donors and recipients. Features include donor registration with blood group management, live donor search with location filtering, urgent blood request posting, admin dashboard for request tracking, and a responsive interface. Implemented role-based access control for four user roles (Donor, Recipient, Medical Admin, System Admin) with dedicated dashboards and secure authentication.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Vercel"],
    category: "Web App",
    image: "/images/project-blood-donation.png",
    liveUrl: "https://online-blood-donation-five.vercel.app/",
    githubUrl: "https://github.com/awaismustafavhr/online-blood-donation",
    featured: true,
    color: "#EF4444",
  },
  {
    id: 5,
    title: "University Complaint Management System",
    description:
      "A Flutter mobile app enabling students to submit and track complaints against departments, faculty, or HODs with role-based workflows and real-time notifications.",
    fullDescription:
      "Designed and developed a University Complaint Management System mobile application using Flutter and Supabase. Students can safely register and submit complaints/requests against departments, faculty, teachers, or HODs. Features role-based workflows for assigning, reviewing, escalating, and resolving complaints, with real-time status updates and push notifications. Built for both Android and iOS with a clean, responsive UI.",
    tags: ["Flutter", "Supabase", "Dart", "Role-Based Access"],
    category: "Mobile",
    image: "/images/project-complaint-system.png",
    liveUrl: "https://university-complaint-system.vercel.app",
    githubUrl: "https://github.com/awaismustafavhr/university-complaint-system",
    featured: true,
    color: "#06B6D4",
  },
  {
    id: 6,
    title: "Finance Tracker Web",
    description:
      "A full-stack finance tracker with React.js and Angular frontend, allowing users to record income/expenses, categorize transactions, and view spending summaries.",
    fullDescription:
      "Built a Finance Tracker web application with a modern UI using React.js and Angular, enabling users to record income/expenses, categorize transactions, and view spending summaries. Developed a scalable backend using Node.js and MongoDB, designing RESTful APIs for secure CRUD operations, filtering, and reporting. Implemented data validation and optimized API performance to ensure accurate financial tracking and a smooth user experience.",
    tags: ["React.js", "Angular", "Node.js", "MongoDB", "REST APIs"],
    category: "Web App",
    image: "/images/project-ecommerce.png",
    liveUrl: "https://finance-tracker-demo.com",
    githubUrl: "https://github.com/awaismustafavhr/finance-tracker",
    featured: false,
    color: "#10B981",
  },
  {
    id: 7,
    title: "Task Manager App",
    description:
      "A cross-platform Flutter mobile app for creating, updating, and organizing tasks with due dates, priority levels, and status tracking.",
    fullDescription:
      "Developed a cross-platform Task Manager mobile app using Flutter and Supabase, allowing users to create, update, and organize tasks with due dates and priority levels. Implemented core features such as task status tracking (To-Do / In Progress / Done), reminders/notifications, and a clean, responsive UI for both Android and iOS.",
    tags: ["Flutter", "Supabase", "Dart", "Mobile"],
    category: "Mobile",
    image: "/images/project-taskmanager.png",
    liveUrl: "https://task-manager-demo.com",
    githubUrl: "https://github.com/awaismustafavhr/task-manager",
    featured: false,
    color: "#EC4899",
  },
  {
    id: 8,
    title: "Weather Application",
    description:
      "A clean weather forecasting application delivering live meteorological data, radar maps, and location search.",
    fullDescription:
      "An intuitive weather monitoring web app created with React and Tailwind CSS. Features 7-day hourly forecasts, atmospheric graphs, geolocation detection, and instant city search powered by OpenWeather API.",
    tags: ["React", "API", "Tailwind", "Responsive"],
    category: "Web App",
    image: "/images/project-weather.png",
    liveUrl: "https://weather-app-demo.com",
    githubUrl: "https://github.com/awaismustafavhr/weather-app",
    featured: false,
    color: "#7C3AED",
  },
];
