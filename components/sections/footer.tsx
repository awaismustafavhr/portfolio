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
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-black/40 backdrop-blur-md">
      {/* Top accent gradient hairline */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/3 right-1/3 top-0 h-[2px] accent-gradient opacity-50" />

      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -bottom-24 left-[10%] h-64 w-64 rounded-full bg-accent-purple/10 blur-[80px]"
        style={{ animation: "orb-float 22s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 right-[8%] h-60 w-60 rounded-full bg-accent-cyan/10 blur-[80px]"
        style={{ animation: "orb-float-alt 24s ease-in-out infinite", animationDelay: "2s" }}
      />

      {/* Grid pattern overlay */}
      <div className="section-grid-bg opacity-[0.15] mix-blend-overlay" />

      <div className="container-shell relative py-16 md:py-20">
        {/* ── Top Main Footer Grid ── */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">

          {/* Column 1: Brand & Status (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => scrollTo("#home")}
                type="button"
                className="group/logo relative transition-transform hover:scale-105 focus-ring rounded-xl"
              >
                <div className="absolute inset-0 rounded-xl accent-gradient opacity-40 blur-md transition-opacity duration-300 group-hover/logo:opacity-60" />
                <div className="glass-panel-strong relative flex h-11 w-11 items-center justify-center rounded-xl border-white/[0.14]">
                  <div className="absolute inset-[2px] rounded-[10px] accent-gradient-animated" />
                  <span className="relative font-heading text-[18px] font-bold text-white drop-shadow-sm">
                    AM
                  </span>
                </div>
              </button>
              <div>
                <h3 className="font-heading text-[19px] font-bold tracking-tight text-white sm:text-[20px]">
                  Awais Mustafa
                </h3>
                <p className="text-[11.5px] font-medium text-text-muted">Full Stack MERN Developer</p>
              </div>
            </div>

            <p className="text-[13.5px] leading-[1.85] text-text-secondary max-w-sm sm:text-[14px]">
              Building scalable, high-performance web applications with Next.js, React, Node.js, and
              the MERN stack. Passionate about clean architecture, pixel-perfect UI, and thoughtful UX.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3.5 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                  Available for freelance &amp; full-time roles
                </span>
              </div>
            </div>

            {/* Quick social preview row */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
                Connect:
              </span>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    aria-label={s.label}
                    href={s.href}
                    rel="noreferrer"
                    target="_blank"
                    className="group/sc inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:bg-accent-cyan/[0.06] hover:text-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/10 focus-ring"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full accent-gradient" />
              <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-muted">
                Navigation
              </p>
            </div>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    type="button"
                    className="group/nav relative inline-flex items-center gap-2 text-[13.5px] text-text-secondary transition-colors duration-300 hover:text-white focus-ring rounded px-1 py-0.5"
                  >
                    <span className="h-1 w-1 rounded-full bg-text-muted transition-all duration-300 group-hover/nav:scale-150 group-hover/nav:accent-gradient group-hover/nav:shadow-[0_0_6px_var(--color-accent-cyan)]" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 accent-gradient transition-all duration-400 ease-out group-hover/nav:w-full" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured & Social (4 cols) */}
          <div className="lg:col-span-4 space-y-7">
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <span className="h-1 w-1 rounded-full accent-gradient" />
                <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-muted">
                  Featured Work
                </p>
              </div>
              <ul className="space-y-2.5">
                {featuredLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      className="group/fw inline-flex max-w-full items-start gap-2 text-[13.5px] leading-snug text-text-secondary transition-colors duration-300 hover:text-white focus-ring rounded px-1"
                      href={item.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.025] text-text-muted transition-all duration-300 group-hover/fw:border-accent-cyan/30 group-hover/fw:bg-accent-cyan/[0.06] group-hover/fw:text-accent-cyan">
                        <Sparkles className="h-3 w-3" />
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="truncate">{item.label}</span>
                        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 accent-gradient transition-all duration-400 ease-out group-hover/fw:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <span className="h-1 w-1 rounded-full accent-gradient" />
                <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-text-muted">
                  Find me on
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    aria-label={s.label}
                    title={s.label}
                    href={s.href}
                    rel="noreferrer"
                    target="_blank"
                    className="group/soc relative inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[12px] font-semibold text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/30 hover:bg-white/[0.05] hover:text-white focus-ring"
                  >
                    <span className="text-text-muted transition-colors duration-300 group-hover/soc:text-accent-cyan">
                      {s.icon}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-16 relative h-px overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/0 via-accent-purple/20 to-accent-cyan/0 opacity-60" />
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[12px] font-medium text-text-muted tracking-wide">
            © {new Date().getFullYear()} Awais Mustafa. All rights reserved.
          </p>

          <div className="glass-panel flex items-center gap-2 rounded-full border-white/[0.08] px-4 py-2 text-[11px] text-text-secondary">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 fill-accent-purple text-accent-purple animate-pulse" />
            <span>using</span>
            <span className="font-semibold text-white">Next.js 14</span>
          </div>

          <button
            onClick={() => scrollTo("#home")}
            type="button"
            className="group/btp inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:bg-accent-cyan/[0.06] hover:text-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/10 interactive-press focus-ring"
          >
            Back to Top
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full accent-gradient text-white">
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover/btp:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
