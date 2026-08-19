﻿"use client";

import { type ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  BriefcaseBusiness,
  Download,
  FileDown,
  Globe,
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

/* ─── animation variants ──────────────────────────────────────────────── */
const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 } },
};

/* ─── icon map for info cards ──────────────────────────────────────────── */
const infoIconMap: Record<string, ReactNode> = {
  Location:     <MapPin       className="h-4 w-4" />,
  Email:        <Mail         className="h-4 w-4" />,
  Availability: <Sparkles     className="h-4 w-4" />,
  Languages:    <Globe        className="h-4 w-4" />,
};

/* ═══════════════════════════════════════════════════════════════════════ */
export function AboutSection() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 });

  return (
    <section className="section-shell relative py-28 md:py-32" id="about">
      {/* Subtle grid */}
      <div className="section-grid-bg opacity-25" />

      {/* Accent orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="section-orb section-orb-alt absolute -left-40 top-20 h-[420px] w-[420px] bg-accent-purple/14"
          style={{ animationDuration: "18s" }} />
        <div className="section-orb absolute -right-24 bottom-16 h-[360px] w-[360px] bg-accent-cyan/12"
          style={{ animationDelay: "2.5s", animationDuration: "16s" }} />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="GET TO KNOW ME"
          title="About Me"
          subtitle="Software Engineering graduate and full-stack developer — committed to clean code, intentional design, and building products that make an impact."
        />

        {/* ── Main 3-column grid ─────────────────────────────────────────── */}
        <div className="mt-18 grid items-start gap-12
          lg:grid-cols-[300px_1fr]
          xl:grid-cols-[300px_1fr_288px]
          xl:gap-10">

          {/* ── Col 1: Profile portrait ─────────────────────────────────── */}
          <motion.div
            className="relative mx-auto w-full max-w-[300px] shrink-0 lg:max-w-none lg:sticky lg:top-28"
            initial="hidden"
            variants={fadeLeft}
            viewport={{ once: true, amount: 0.3 }}
            whileInView="visible"
          >
            {/* Ambient glow behind photo */}
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(124,58,237,0.4), rgba(6,182,212,0.25) 55%, transparent 72%)",
                filter: "blur(52px)",
                opacity: 0.9,
              }} />

            {/* Corner accents */}
            <div className="absolute -right-2 -top-2 h-16 w-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm" />
            <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm" />

            {/* Photo frame */}
            <div className="relative rounded-[28px] p-[1.5px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.65)]">
              <div className="absolute inset-0 rounded-[28px]"
                style={{ background: "linear-gradient(145deg, rgba(124,58,237,0.75), rgba(6,182,212,0.55) 50%, rgba(236,72,153,0.5))" }} />
              <div className="relative overflow-hidden rounded-[26.5px] bg-[#0c0c16] p-2">
                <div className="group relative overflow-hidden rounded-[24px]">
                  <Image
                    alt="Awais Mustafa – Full Stack Developer"
                    className="aspect-[3/4] w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    height={960}
                    priority
                    src="/images/profile-portrait.jpg"
                    width={720}
                  />
                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                  {/* Bottom name tag */}
                  <div className="absolute bottom-0 inset-x-0 px-4 py-3">
                    <div className="glass-panel-strong rounded-2xl border-white/[0.14] px-4 py-2.5">
                      <p className="font-heading text-[14px] font-bold leading-none text-white">M. Awais Mustafa</p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gradient">Full Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <FloatingBadge
              className="bottom-20 -left-5 sm:-left-7"
              delay={0.3}
              icon={<Star className="h-4 w-4" />}
              title="1+ Years"
              subtitle="Experience"
            />
            <FloatingBadge
              className="-top-3 -right-4 sm:-top-5 sm:-right-6"
              delay={0.45}
              icon={<Rocket className="h-4 w-4" />}
              title="10+ Built"
              subtitle="Projects"
            />
          </motion.div>

          {/* ── Col 2: Bio text ─────────────────────────────────────────── */}
          <motion.div
            className="flex min-w-0 flex-col xl:border-r xl:border-white/[0.07] xl:pr-10"
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true, amount: 0.25 }}
            whileInView="visible"
          >
            {/* Role badge */}
            <div className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/[0.07] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
              </span>
              <Zap className="h-3 w-3 text-accent-cyan" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-gradient">
                Full Stack Developer
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-heading text-[28px] font-bold leading-[1.15] tracking-tight text-white
              sm:text-[34px] md:text-[38px]">
              Building digital products
              <br className="hidden sm:block" />
              with{" "}
              <span className="text-gradient">clean code</span>
              {" "}and
              <br className="hidden sm:block" />
              <span className="text-gradient">intentional design</span>
            </h3>

            {/* Bio paragraphs */}
            <div className="mt-8 space-y-5 text-[14.5px] leading-[1.95] text-text-secondary sm:text-[15px]">
              <p>
                <span className="font-heading text-[22px] font-bold leading-none text-gradient float-left mr-2 -mt-1">I</span>
                am a dedicated full-stack developer and Software Engineering graduate (COMSATS
                University, 2022–2026) with hands-on experience in web development, data science,
                and full-stack solutions. My journey has been driven by a love for clean code,
                thoughtful architecture, and elegant user experiences.
              </p>
              <p>
                With 1+ years of professional experience — including an onsite role at{" "}
                <span className="font-semibold text-white/90">CodeDesk Studio</span> — I have
                built production-grade apps and websites using JavaScript, React, Next.js, and
                Node.js, collaborating with cross-functional teams daily.
              </p>
              <p>
                I am committed to continuous improvement, exploring new engineering patterns, and
                shipping meaningful digital products that create real impact for users and businesses.
              </p>
            </div>

            {/* Tech pills row */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["React.js", "Next.js", "Node.js", "MongoDB", "Flutter", "TypeScript", "Tailwind CSS"].map((t) => (
                <span key={t}
                  className="glass-panel inline-flex items-center gap-1.5 rounded-xl border-white/[0.08] px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  <span className="h-1 w-1 rounded-full accent-gradient" />
                  {t}
                </span>
              ))}
            </div>

            {/* Certs / quick-wins row */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="glass-panel flex items-center gap-3 rounded-2xl border-white/[0.06] p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl accent-gradient-animated text-white shadow-sm">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">Stack</p>
                  <p className="mt-0.5 text-[12.5px] font-semibold text-white/90">MERN + Flutter + SQL</p>
                </div>
              </div>
              <div className="glass-panel flex items-center gap-3 rounded-2xl border-white/[0.06] p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl accent-gradient-animated text-white shadow-sm">
                  <BriefcaseBusiness className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">Role</p>
                  <p className="mt-0.5 text-[12.5px] font-semibold text-white/90">Open to Work · Freelance</p>
                </div>
              </div>
            </div>

            {/* Mobile: info cards + CTA */}
            <div className="mt-10 flex flex-col gap-4 xl:hidden">
              <InfoCards />
              <DownloadCVButton />
            </div>
          </motion.div>

          {/* ── Col 3 (xl only): Info cards + CTA ──────────────────────── */}
          <motion.div
            className="hidden xl:flex xl:flex-col xl:gap-3"
            initial="hidden"
            variants={fadeRight}
            viewport={{ once: true, amount: 0.25 }}
            whileInView="visible"
          >
            <InfoCards />
            <div className="mt-2">
              <DownloadCVButton />
            </div>
          </motion.div>
        </div>

        {/* ── Stats bar ───────────────────────────────────────────────────── */}
        <div ref={statsRef}
          className="mt-20 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <StatCard key={item.label} index={index} inView={statsInView} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ───────────────────────────────────────────────────── */

function InfoCards() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
      {infoGrid.map((item) => (
        <div key={item.label}
          className="glass-panel glass-hover group relative flex items-center gap-4 overflow-hidden rounded-[18px] border border-white/[0.07] p-4 transition-all duration-300 hover:border-accent-cyan/30">
          {/* Hover shimmer */}
          <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-r from-accent-purple/[0.04] to-accent-cyan/[0.04] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

          <div className="relative accent-gradient-animated flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
            {infoIconMap[item.label] ?? <BriefcaseBusiness className="h-4 w-4" />}
          </div>

          <div className="relative min-w-0 flex-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-text-muted">
              {item.label}
            </p>
            <p className="mt-0.5 truncate text-[13px] font-semibold text-white/90 transition-colors group-hover:text-white">
              {item.value}
            </p>
          </div>

          {/* Right arrow accent */}
          <span className="shrink-0 text-text-muted opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-accent-cyan">
            →
          </span>
        </div>
      ))}
    </div>
  );
}

function DownloadCVButton() {
  return (
    <a
      className="btn-primary glow-ring-strong group relative mt-1 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-[18px] accent-gradient-animated px-6 py-4 text-[13.5px] font-semibold text-white shadow-xl interactive-press focus-ring"
      download="Awais-Mustafa-Resume.pdf"
      href="/resume.pdf"
    >
      {/* Shimmer sweep */}
      <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2.2s linear infinite",
        }} />

      <FileDown className="relative z-10 h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="relative z-10">Download CV</span>
      <span className="relative z-10 rounded-lg bg-white/[0.15] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80">
        PDF
      </span>
      <Download className="relative z-10 ml-auto h-[16px] w-[16px] opacity-50 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

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
      className={`glass-panel-strong absolute z-10 rounded-2xl border border-white/[0.14] px-4 py-3 shadow-[0_14px_36px_-8px_rgba(0,0,0,0.55)] backdrop-blur-2xl ${className}`}
      initial={{ opacity: 0, scale: 0.55 }}
      transition={{ duration: 0.65, delay, type: "spring", stiffness: 200, damping: 18 }}
      viewport={{ once: true, amount: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.06, y: -3 }}
    >
      <div className="flex items-center gap-3">
        <div className="accent-gradient-animated flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md">
          {icon}
        </div>
        <div>
          <p className="text-[14px] font-bold leading-none text-white">{title}</p>
          <p className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-text-muted">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

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
      className="glass-panel glass-hover border-gradient group relative overflow-hidden rounded-2xl border border-white/[0.07] px-6 py-7 text-center transition-all duration-400 hover:-translate-y-2 hover:border-accent-cyan/25 hover:shadow-xl hover:shadow-accent-purple/10"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay: index * 0.09 }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/[0.07] via-transparent to-accent-purple/[0.07] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <span className="pointer-events-none absolute left-3 top-3 h-1.5 w-1.5 rounded-full accent-gradient opacity-40 group-hover:opacity-100 transition-opacity" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full accent-gradient opacity-40 group-hover:opacity-100 transition-opacity" />
      <p className="relative font-heading text-[38px] font-bold leading-none tracking-tight text-gradient sm:text-[44px] md:text-5xl">
        {count}
        <span className="text-white/70">{inView ? suffix : ""}</span>
      </p>
      <p className="relative mt-4 text-[10.5px] font-bold uppercase tracking-[0.28em] text-text-secondary">
        {label}
      </p>
    </motion.div>
  );
}
