"use client";

import { ArrowUp, Facebook, Github, Heart, Linkedin, Mail, Sparkles, Twitter } from "lucide-react";
import { useSmoothScroll } from "@/components/ui/smooth-scroll-provider";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Me" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const featuredLinks = [
  {
    href: "https://online-blood-donation-five.vercel.app/",
    label: "Blood Donation Request Portal",
    external: true,
  },
  {
    href: "https://university-complaint-system.vercel.app",
    label: "University Complaint System",
    external: true,
  },
  {
    href: "https://github.com/awaismustafavhr/portfolio",
    label: "Portfolio Source Code",
    external: true,
  },
];

const socialLinks = [
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
    href: "https://www.facebook.com/choudhary.awais.542652",
    label: "Facebook",
    icon: <Facebook className="h-4 w-4" />,
  },
  {
    href: "https://x.com/awaischoud76718",
    label: "X (Twitter)",
    icon: <Twitter className="h-4 w-4" />,
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
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080811]">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-purple to-transparent" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-accent-purple/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-accent-cyan/5 blur-3xl" />

      <div className="container-shell py-16">
        {/* ── Top Main Footer Grid ── */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">

          {/* Column 1: Brand & Status (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <button
                className="accent-gradient font-heading flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md ring-1 ring-white/20 transition-transform hover:scale-105"
                onClick={() => scrollTo("#home")}
                type="button"
              >
                AM
              </button>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Awais Mustafa</h3>
                <p className="text-xs text-text-muted">Full Stack Web Developer</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-text-secondary max-w-sm">
              Building scalable, high-performance web applications with Next.js, React, Node.js, and
              the MERN stack. Focused on clean code and user-centered design.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for freelance &amp; full-time roles
            </div>
          </div>

          {/* Column 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-text-muted">
              Navigation
            </p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent-cyan"
                    onClick={() => scrollTo(link.href)}
                    type="button"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured & Social (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-text-muted mb-3">
                Featured Work
              </p>
              <ul className="space-y-2">
                {featuredLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      className="text-sm text-text-secondary transition-colors duration-200 hover:text-white hover:underline"
                      href={item.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-text-muted mb-3">
                Connect With Me
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    aria-label={s.label}
                    className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-text-secondary transition-all duration-300 hover:border-accent-cyan/40 hover:text-accent-cyan hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-cyan/10"
                    href={s.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-14 h-px bg-white/[0.08]" />

        {/* ── Bottom Bar ── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Awais Mustafa. All rights reserved.</p>

          <p className="flex items-center gap-1.5 text-text-secondary">
            Built with <Heart className="h-3.5 w-3.5 fill-accent-pink text-accent-pink" /> using Next.js 14 &amp; Tailwind CSS
          </p>

          <button
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-accent-cyan/40 hover:text-accent-cyan interactive-press"
            onClick={() => scrollTo("#home")}
            type="button"
          >
            Back to Top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
