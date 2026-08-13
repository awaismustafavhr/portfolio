"use client";

import { type ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  BriefcaseBusiness,
  Download,
  FileDown,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { infoGrid, stats } from "@/data/site";
import { useCounter } from "@/hooks/useCounter";

export function AboutSection() {
  const aboutStatsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(aboutStatsRef, { once: true, amount: 0.4 });

  return (
    <section className="section-shell relative py-28 md:py-32" id="about">
      {/* Section background grid */}
      <div className="section-grid-bg opacity-30" />

      {/* Section accent orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb section-orb-alt absolute -left-32 top-16 h-[380px] w-[380px] bg-accent-purple/18"
          style={{ animationDuration: "18s" }}
        />
        <div
          className="section-orb absolute -right-20 bottom-10 h-[340px] w-[340px] bg-accent-cyan/14"
          style={{ animationDelay: "2.5s", animationDuration: "16s" }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="GET TO KNOW ME"
          title="About Me"
          subtitle="A full stack developer committed to engineering excellence, thoughtful design, and building products that matter."
        />

        {/* Main two-column grid */}
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20 xl:gap-24">

          {/* Left: Profile image column */}
          <motion.div
            className="relative mx-auto w-full max-w-[400px] lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -70 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {/* Ambient background glow */}
            <div
              className="absolute -inset-8 -z-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.35), rgba(6,182,212,0.28) 55%, transparent 72%)",
                filter: "blur(56px)",
                opacity: 0.85,
              }}
            />

            {/* Decorative corner accent */}
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm" />
            <div className="absolute -bottom-3 -left-3 h-20 w-20 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm" />

            {/* Gradient border frame */}
            <div className="relative rounded-[32px] p-[1.5px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 rounded-[32px]" style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(6,182,212,0.55) 50%, rgba(236,72,153,0.5))",
              }} />
              <div className="relative overflow-hidden rounded-[30.5px] bg-[#0c0c16] p-2.5">
                <div className="group relative overflow-hidden rounded-[26px]">
                  <Image
                    alt="Awais Mustafa – Full Stack Developer"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    height={960}
                    priority
                    src="/images/profile-portrait.jpg"
                    width={768}
                  />
                  {/* Vignette overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  {/* Top inner border highlight */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <FloatingBadge
              className="bottom-8 -left-6 sm:-left-8"
              delay={0.3}
              icon={<Star className="h-4 w-4" />}
              subtitle="Experience"
              title="1+ Years"
            />
            <FloatingBadge
              className="-top-4 -right-5 sm:-top-6 sm:-right-7"
              delay={0.45}
              icon={<Rocket className="h-4 w-4" />}
              subtitle="Projects"
              title="10+ Built"
            />
          </motion.div>

          {/* Right: Content column */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 70 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {/* Role badge */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.08] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-gradient">
                <Zap className="mr-1 inline h-3 w-3 -translate-y-[1px]" />
                Full Stack Developer
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-heading text-[30px] font-bold leading-[1.18] tracking-tight text-white sm:text-[34px] md:text-[40px]">
              Building digital products with{" "}
              <span className="text-gradient">clean code</span>
              <br className="hidden sm:block" />
              and <span className="text-gradient">intentional design</span>
            </h3>

            {/* Bio paragraphs */}
            <div className="mt-7 space-y-5 text-[15px] leading-[1.9] text-text-secondary md:text-[16px]">
              <p className="first-letter:font-heading first-letter:text-3xl first-letter:font-bold first-letter:text-gradient first-letter:mr-1.5 first-letter:float-left first-letter:leading-none">
                I&apos;m a dedicated full stack developer with a passion for creating modern,
                responsive web applications using the MERN stack. My journey has been driven
                by a love for clean code, thoughtful architecture, and elegant user experiences.
              </p>
              <p>
                With 1+ years of hands-on experience, I&apos;ve delivered personal and freelance
                projects ranging from internal tools to public-facing platforms. My focus is on
                building user-friendly interfaces backed by robust, scalable backend systems.
              </p>
              <p>
                I&apos;m committed to continuous learning — refining my engineering craft,
                exploring new patterns, and building meaningful digital products that create
                real impact for users and businesses.
              </p>
            </div>

            {/* Info grid + CTA block */}
            <div className="mt-10 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {infoGrid.map((item) => (
                  <div
                    key={item.label}
                    className="glass-panel glass-hover group flex items-center gap-4 rounded-[1.25rem] border border-white/[0.08] p-4 sm:p-5 transition-all duration-300 hover:border-accent-cyan/25"
                  >
                    <div className="accent-gradient-animated flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                      {item.label === "Location" ? (
                        <MapPin className="h-5 w-5" />
                      ) : item.label === "Email" ? (
                        <Mail className="h-5 w-5" />
                      ) : item.label === "Availability" ? (
                        <Sparkles className="h-5 w-5" />
                      ) : (
                        <BriefcaseBusiness className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 truncate text-[14px] font-semibold text-white/90 group-hover:text-white transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                className="btn-primary glow-ring-strong group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-[1.25rem] accent-gradient-animated px-8 py-4.5 text-[15px] font-semibold text-white shadow-lg interactive-press focus-ring"
                download
                href="/resume.pdf"
              >
                <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2.5s linear infinite",
                  }}
                />
                <span className="relative z-10 flex h-6 w-6 items-center justify-center">
                  <FileDown className="h-[20px] w-[20px] transition-transform duration-300 group-hover:-translate-y-0.5" />
                </span>
                <span className="relative z-10 flex items-center gap-2">
                  Download CV
                  <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-white/75 sm:inline">
                    (PDF)
                  </span>
                </span>
                <Download className="relative z-10 h-[20px] w-[20px] transition-transform duration-300 group-hover:translate-x-0.5 opacity-60" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div
          ref={aboutStatsRef}
          className="mt-20 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((item, index) => (
            <StatCard key={item.label} index={index} inView={statsInView} {...item} />
          ))}
        </div>
      </div>
    </section>
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
      className={`glass-panel-strong absolute rounded-2xl border border-white/[0.12] px-4 py-3 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 220, damping: 20 }}
      viewport={{ once: true, amount: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -3 }}
    >
      <div className="flex items-center gap-3">
        <div className="accent-gradient-animated flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-md">
          {icon}
        </div>
        <div>
          <p className="text-[14px] font-bold text-white leading-tight">{title}</p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
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
      className="glass-panel glass-hover border-gradient group relative overflow-hidden rounded-2xl border border-white/[0.08] px-6 py-7 text-center transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-cyan/25"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/[0.06] via-transparent to-accent-purple/[0.06] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      {/* Corner accents */}
      <span className="pointer-events-none absolute left-3 top-3 h-1.5 w-1.5 rounded-sm accent-gradient opacity-50 transition-opacity group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-1.5 w-1.5 rounded-sm accent-gradient opacity-50 transition-opacity group-hover:opacity-100" />

      <p className="relative font-heading text-[36px] font-bold leading-none tracking-tight text-gradient sm:text-[42px] md:text-5xl">
        {count}
        <span className="text-white/80">{inView ? suffix : ""}</span>
      </p>
      <p className="relative mt-3.5 text-[11px] font-bold uppercase tracking-[0.26em] text-text-secondary sm:text-xs">
        {label}
      </p>
    </motion.div>
  );
}
