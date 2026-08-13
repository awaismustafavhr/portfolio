export const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Testimonials", href: "#testimonials", id: "testimonials" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

export const heroRoles = [
  "Full Stack Developer",
  "MERN Stack Specialist",
  "React Developer",
  "Next.js Engineer",
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/awaismustafavhr",
    icon: "github",
    color: "#f0f6fc",
    glowColor: "rgba(240, 246, 252, 0.16)",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/choudhary.awais.542652",
    icon: "facebook",
    color: "#1877f2",
    glowColor: "rgba(24, 119, 242, 0.18)",
  },
  {
    label: "X",
    href: "https://x.com/awaischoud76718",
    icon: "x",
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.14)",
  },
  {
    label: "Email",
    href: "mailto:awaismustafavhr@gmail.com",
    icon: "mail",
    color: "#ea4335",
    glowColor: "rgba(234, 67, 53, 0.18)",
  },
] as const;

export const stats = [
  { label: "Years Exp", value: 1, suffix: "+" },
  { label: "Projects", value: 10, suffix: "+" },
  { label: "Clients", value: 5, suffix: "+" },
  { label: "Satisfaction", value: 95, suffix: "%" },
] as const;

export const infoGrid = [
  { label: "Location", value: "Vehari, Pakistan" },
  { label: "Email", value: "awaismustafavhr@gmail.com" },
  { label: "Availability", value: "Open to Work" },
  { label: "Languages", value: "English, Urdu" },
] as const;

export const contactDetails = [
  { label: "Email", value: "awaismustafavhr@gmail.com", href: "mailto:awaismustafavhr@gmail.com" },
  { label: "Location", value: "Vehari, Pakistan", href: "#contact" },
  {
    label: "Availability",
    value: "Open for freelance and full-time roles",
    href: "#contact",
  },
] as const;

export const certifications = [
  {
    platform: "Coursera",
    title: "Full Stack Web Development",
    date: "Issued Jan 2026",
    link: "https://coursera.org",
  },
  {
    platform: "Udemy",
    title: "MERN Stack Bootcamp",
    date: "Issued Aug 2025",
    link: "https://udemy.com",
  },
  {
    platform: "FreeCodeCamp",
    title: "JavaScript Algorithms and Data Structures",
    date: "Issued May 2025",
    link: "https://freecodecamp.org",
  },
] as const;
