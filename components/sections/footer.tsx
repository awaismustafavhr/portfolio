"use client";

import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { useSmoothScroll } from "@/components/ui/smooth-scroll-provider";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const footerSocials = [
  {
    href: "https://www.linkedin.com/in/muhammad-awais-mustafa-224956319/",
    label: "LinkedIn",
    icon: <Linkedin className="h-4 w-4" />,
  },
  {
    href: "https://github.com/awaismustafavhr",
    label: "GitHub",
    icon: <Github className="h-4 w-4" />,
  },
  {
    href: "mailto:awaismustafavhr@gmail.com",
    label: "Email",
    icon: <Mail className="h-4 w-4" />,
  },
];

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-black/40">
      {/* Ambient gradient top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />

      <div className="container-shell py-12">
        {/* Top row */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <button
              className="font-heading text-2xl font-bold text-white transition-colors hover:text-accent-cyan"
              onClick={() => scrollTo("#home")}
              type="button"
            >
              AM
            </button>
            <p className="text-xs text-text-muted">Full Stack Developer</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                className="text-sm text-text-secondary transition-colors hover:text-white"
                onClick={() => scrollTo(link.href)}
                type="button"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {footerSocials.map((s) => (
              <a
                key={s.label}
                aria-label={s.label}
                className="glass-panel flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text-secondary transition-all duration-200 hover:border-accent-cyan/40 hover:text-accent-cyan hover:-translate-y-0.5"
                href={s.href}
                rel="noreferrer"
                target="_blank"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px bg-white/[0.06]" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-text-muted md:flex-row">
          <p>
            © 2026 Awais Mustafa. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with{" "}
            <Heart className="h-3 w-3 fill-accent-pink text-accent-pink" />
            {" "}using Next.js &amp; Tailwind CSS
          </p>
          <button
            className="font-medium text-text-secondary transition-colors hover:text-accent-cyan"
            onClick={() => scrollTo("#home")}
            type="button"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
