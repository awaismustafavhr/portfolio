﻿"use client";

import { type ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  FileDown,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  Star,
  Terminal,
  Zap,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { infoGrid, stats } from "@/data/site";
import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";

/* ─── Resume filename — must match /public exactly ───────────────────── */
const RESUME_FILE = "Awais-Mustafa-Resume.pdf";

/* ─── Framer Motion variants ──────────────────────────────────────────── */
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

/* ─── Info icon map ───────────────────────────────────────────────────── */
const INFO_ICONS: Record<string, ReactNode> = {
  Location:     <MapPin       className="h-[17px] w-[17px]" />,
  Email:        <Mail         className="h-[17px] w-[17px]" />,
  Availability: <CheckCircle2 className="h-[17px] w-[17px]" />,
  Languages:    <Globe        className="h-[17px] w-[17px]" />,
};

/* ═══════════════════════════════════════════════════════════════════════ */
export function AboutSection() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section className="section-shell relative py-24 md:py-32" id="about">
      {/* Grid texture */}
      <div className="section-grid-bg opacity-20" />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb section-orb-alt absolute -left-48 top-24 h-[440px] w-[440px] bg-accent-purple/12"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="section-orb absolute -right-32 bottom-20 h-[380px] w-[380px] bg-accent-cyan/10"
          style={{ animationDelay: "3s", animationDuration: "17s" }}
        />
      </div>

      <div className="container-shell relative">
        {/* Section heading */}
        <SectionHeading
          eyebrow="GET TO KNOW ME"
          title="About Me"
          subtitle="Software Engineering graduate and full-stack developer — committed to clean code, intentional design, and products that make a real impact."
        />

        {/* ── Primary 3-col layout ─────────────────────────────────────── */}
        {/*
          Breakpoints:
            <lg  → stacked single column
             lg  → [portrait | bio+cards] 2-col
             xl  → [portrait | bio | sidebar] 3-col, all cols stretch equally
        */}
        <div
          className={cn(
            "mt-16 grid w-full gap-8",
            /* lg: 2 equal-ish cols, portrait slightly narrower */
            "lg:grid-cols-[minmax(260px,320px)_1fr] lg:gap-10",
            /* xl: 3 cols, sidebar has minimum width but grows with the grid */
            "xl:grid-cols-[minmax(280px,320px)_1fr_minmax(260px,320px)] xl:items-start xl:gap-10",
          )}
        >
          {/* ── Col 1 — Portrait ──────────────────────────────────────── */}
          <motion.div
            className="relative mx-auto w-full max-w-[320px] shrink-0 lg:mx-0 lg:sticky lg:top-28"
            initial="hidden"
            variants={fadeLeft}
            viewport={{ once: true, amount: 0.25 }}
            whileInView="visible"
          >
            {/* Glow halo */}
            <div
              className="pointer-events-none absolute -inset-12 -z-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(124,58,237,0.38) 0%, rgba(6,182,212,0.22) 55%, transparent 72%)",
                filter: "blur(48px)",
              }}
            />

            {/* Decorative corners */}
            <div className="absolute -right-3 -top-3 h-16 w-16 rounded-2xl border border-white/[0.07] bg-white/[0.015] backdrop-blur-sm" />
            <div className="absolute -bottom-3 -left-3 h-12 w-12 rounded-2xl border border-white/[0.07] bg-white/[0.015] backdrop-blur-sm" />

            {/* Gradient border frame */}
            <div
              className="relative rounded-[28px] p-[1.5px] shadow-[0_32px_72px_-16px_rgba(0,0,0,0.7)]"
            >
              <div
                className="absolute inset-0 rounded-[28px]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(124,58,237,0.8) 0%, rgba(6,182,212,0.55) 50%, rgba(236,72,153,0.5) 100%)",
                }}
              />
              <div className="relative overflow-hidden rounded-[26.5px] bg-[#0c0c16] p-2">
                <div className="group relative overflow-hidden rounded-[24px]">
                  <Image
                    alt="Awais Mustafa – Full Stack Developer"
                    className="aspect-[3/4] w-full object-cover object-top transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    height={960}
                    priority
                    src="/images/profile-portrait.jpg"
                    width={720}
                  />
                  {/* Depth overlays */}
                  <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/55 via-black/[0.04] to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Identity tag */}
                  <div className="absolute inset-x-3 bottom-3">
                    <div className="glass-panel-strong rounded-[14px] border-white/[0.15] px-4 py-2.5 backdrop-blur-2xl">
                      <p className="font-heading text-[13.5px] font-bold leading-none text-white">
                        M. Awais Mustafa
                      </p>
                      <p className="mt-1 text-[9.5px] font-bold uppercase tracking-[0.24em] text-gradient">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat badges */}
            <FloatingBadge
              className="bottom-[88px] -left-5 sm:-left-7"
              delay={0.35}
              icon={<Star className="h-[15px] w-[15px]" />}
              title="1+ Years"
              subtitle="Experience"
            />
            <FloatingBadge
              className="-top-4 -right-4 sm:-top-5 sm:-right-6"
              delay={0.5}
              icon={<Rocket className="h-[15px] w-[15px]" />}
              title="10+ Built"
              subtitle="Projects"
            />
          </motion.div>

          {/* ── Col 2 — Bio content ───────────────────────────────────── */}
          <motion.div
            className={cn(
              "flex min-w-0 flex-col",
              /* xl: right divider between col2 and col3 */
              "xl:border-r xl:border-white/[0.06] xl:pr-10",
            )}
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            whileInView="visible"
          >
            {/* ── Live status badge ── */}
            <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/[0.07] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
              </span>
              <Zap className="h-3 w-3 text-accent-cyan" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gradient">
                Full Stack Developer
              </span>
            </div>

            {/* ── Headline ── */}
            <h3 className="font-heading text-[26px] font-bold leading-[1.15] tracking-tight text-white sm:text-[30px] md:text-[34px]">
              Building digital products
              <br />
              with{" "}
              <span className="text-gradient">clean code</span>
              {" "}and
              <br />
              <span className="text-gradient">intentional design</span>
            </h3>

            {/* ── Bio ── */}
            <div className="mt-7 space-y-4 text-[14px] leading-[1.9] text-text-secondary sm:text-[14.5px]">
              <p>
                <span className="float-left mr-2 -mt-0.5 font-heading text-[20px] font-bold leading-none text-gradient">
                  I
                </span>
                am a dedicated full-stack developer and Software Engineering graduate
                (COMSATS University, 2022–2026) with hands-on experience across web
                development, data science, and production-grade full-stack systems.
                Driven by a love for clean architecture and elegant user experiences.
              </p>
              <p>
                With 1+ years of professional experience — including an onsite role at{" "}
                <span className="font-semibold text-white/90">CodeDesk Studio</span> — I
                have built and shipped production apps using JavaScript, React, Next.js,
                and Node.js, collaborating across frontend and backend teams daily.
              </p>
              <p>
                I am committed to continuous improvement, exploring new engineering
                patterns, and delivering meaningful digital products that create real
                impact for users and businesses.
              </p>
            </div>

            {/* ── Tech pills ── */}
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "React.js", "Next.js", "Node.js", "MongoDB",
                "Flutter", "TypeScript", "Tailwind CSS", "Express.js",
              ].map((t) => (
                <span
                  key={t}
                  className="glass-panel inline-flex items-center gap-1.5 rounded-xl border-white/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary transition-colors duration-300 hover:border-accent-cyan/25 hover:text-white/80"
                >
                  <span className="h-1 w-1 rounded-full accent-gradient" />
                  {t}
                </span>
              ))}
            </div>

            {/* ── 2-col quick facts ── */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <QuickFactCard
                icon={<Terminal className="h-[16px] w-[16px]" />}
                label="Stack"
                value="MERN + Flutter"
              />
              <QuickFactCard
                icon={<BriefcaseBusiness className="h-[16px] w-[16px]" />}
                label="Status"
                value="Open to Work"
              />
              <QuickFactCard
                icon={<GraduationCap className="h-[16px] w-[16px]" />}
                label="Degree"
                value="BS Software Eng."
              />
              <QuickFactCard
                icon={<Sparkles className="h-[16px] w-[16px]" />}
                label="Focus"
                value="Full Stack · Web"
              />
            </div>

            {/* ── Mobile-only: info cards + CTA ── */}
            <div className="mt-8 flex flex-col gap-3 xl:hidden">
              <InfoCards />
              <DownloadCVButton />
            </div>
          </motion.div>

          {/* ── Col 3 — Sidebar (xl only) ─────────────────────────────── */}
          <motion.div
            className="hidden xl:flex xl:flex-col xl:gap-3"
            initial="hidden"
            variants={fadeRight}
            viewport={{ once: true, amount: 0.2 }}
            whileInView="visible"
          >
            {/* Sidebar heading */}
            <p className="mb-1 text-[9.5px] font-bold uppercase tracking-[0.3em] text-text-muted">
              Quick Info
            </p>
            <InfoCards />
            <DownloadCVButton />
          </motion.div>
        </div>

        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((item, i) => (
            <StatCard key={item.label} index={i} inView={statsInView} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/*  Sub-components                                                         */
/* ─────────────────────────────────────────────────────────────────────── */

/** 4 info cards — Location / Email / Availability / Languages */
function InfoCards() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
      {infoGrid.map((item) => (
        <div
          key={item.label}
          className={cn(
            "glass-panel group relative flex items-center gap-3.5 overflow-hidden",
            "rounded-[16px] border border-white/[0.07] p-3.5",
            "transition-all duration-300",
            "hover:-translate-y-[2px] hover:border-accent-cyan/30",
            "hover:shadow-[0_8px_32px_-8px_rgba(6,182,212,0.18)]",
          )}
        >
          {/* Hover gradient wash */}
          <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-gradient-to-br from-accent-purple/[0.05] to-accent-cyan/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Icon */}
          <div
            className={cn(
              "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]",
              "accent-gradient-animated text-white shadow-md",
              "transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3",
            )}
          >
            {INFO_ICONS[item.label] ?? <BriefcaseBusiness className="h-[17px] w-[17px]" />}
          </div>

          {/* Text */}
          <div className="relative min-w-0 flex-1">
            <p className="text-[8.5px] font-bold uppercase tracking-[0.3em] text-text-muted">
              {item.label}
            </p>
            <p className="mt-0.5 truncate text-[12.5px] font-semibold text-white/85 transition-colors duration-200 group-hover:text-white">
              {item.value}
            </p>
          </div>

          {/* Hover arrow */}
          <span className="shrink-0 text-sm text-accent-cyan opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-70">
            →
          </span>
        </div>
      ))}
    </div>
  );
}

/** Download CV button — points to the exact PDF in /public */
function DownloadCVButton() {
  return (
    <a
      className={cn(
        "btn-primary glow-ring-strong interactive-press focus-ring",
        "group relative mt-0.5 inline-flex w-full items-center justify-center gap-3",
        "overflow-hidden rounded-[16px] accent-gradient-animated",
        "px-5 py-4 text-[13px] font-semibold text-white shadow-lg",
      )}
      download={RESUME_FILE}
      href={`/${RESUME_FILE}`}
    >
      {/* Shimmer sweep on hover */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s linear infinite",
        }}
      />

      <FileDown className="relative z-10 h-[17px] w-[17px] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />

      <span className="relative z-10 font-semibold">Download CV</span>

      <span className="relative z-10 rounded-md bg-white/[0.18] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white/80">
        PDF
      </span>

      <Download className="relative z-10 ml-auto h-4 w-4 opacity-45 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

/** Small 2-col quick-fact card used inside the bio column */
function QuickFactCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-panel group flex items-center gap-3 rounded-[14px] border-white/[0.06] p-3 transition-colors duration-300 hover:border-accent-cyan/20">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] accent-gradient-animated text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[8.5px] font-bold uppercase tracking-[0.26em] text-text-muted">
          {label}
        </p>
        <p className="mt-0.5 truncate text-[12px] font-semibold text-white/85">{value}</p>
      </div>
    </div>
  );
}

/** Floating badge overlaid on the portrait */
function FloatingBadge({
  className,
  icon,
  title,
  subtitle,
  delay = 0.2,
}: {
  className: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        "glass-panel-strong absolute z-10 rounded-2xl border border-white/[0.14]",
        "px-3.5 py-2.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl",
        className,
      )}
      initial={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 200, damping: 18 }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <div className="flex items-center gap-2.5">
        <div className="accent-gradient-animated flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white shadow-md">
          {icon}
        </div>
        <div>
          <p className="text-[13px] font-bold leading-none text-white">{title}</p>
          <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-text-muted">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/** Animated stat card in the bottom row */
function StatCard({
  label,
  value,
  suffix,
  inView,
  index,
}: {
  label: string;
  value: number;
  suffix: string;
  inView: boolean;
  index: number;
}) {
  const count = useCounter(value, inView);

  return (
    <motion.div
      className={cn(
        "glass-panel glass-hover border-gradient group relative",
        "overflow-hidden rounded-2xl border border-white/[0.07]",
        "px-6 py-7 text-center",
        "transition-all duration-400",
        "hover:-translate-y-2 hover:border-accent-cyan/25",
        "hover:shadow-xl hover:shadow-accent-purple/10",
      )}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.55, delay: index * 0.09 }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/[0.06] via-transparent to-accent-purple/[0.06] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <span className="pointer-events-none absolute left-3 top-3 h-1.5 w-1.5 rounded-full accent-gradient opacity-35 transition-opacity group-hover:opacity-90" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full accent-gradient opacity-35 transition-opacity group-hover:opacity-90" />

      <p className="relative font-heading text-[38px] font-bold leading-none tracking-tight text-gradient sm:text-[44px] md:text-5xl">
        {count}
        <span className="text-white/65">{inView ? suffix : ""}</span>
      </p>
      <p className="relative mt-3.5 text-[10.5px] font-bold uppercase tracking-[0.26em] text-text-secondary">
        {label}
      </p>
    </motion.div>
  );
}
