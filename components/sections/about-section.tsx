"use client";

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
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { infoGrid, stats } from "@/data/site";
import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";

const RESUME_FILE = "awais-mustafa-resume.pdf";

const fadeLeft = {
  hidden: { opacity: 0, x: -34 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.06 },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 34 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
  },
};

const INFO_ICONS: Record<string, ReactNode> = {
  Location: <MapPin className="h-[17px] w-[17px]" />,
  Email: <Mail className="h-[17px] w-[17px]" />,
  Availability: <CheckCircle2 className="h-[17px] w-[17px]" />,
  Languages: <Globe className="h-[17px] w-[17px]" />,
};

export function AboutSection() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section className="section-shell relative py-24 md:py-32" id="about">
      <div className="section-grid-bg opacity-20" />
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
        <SectionHeading
          eyebrow="GET TO KNOW ME"
          title="About Me"
          subtitle="Software Engineering graduate and full-stack developer — committed to clean code, intentional design, and products that make a real impact."
        />

        <div className="border-gradient glass-panel mt-16 rounded-[30px] border border-white/[0.08] p-5 sm:p-7 lg:p-9 xl:p-10">
          <div className="grid gap-7 lg:grid-cols-[minmax(250px,315px)_minmax(0,1fr)] xl:grid-cols-[minmax(250px,315px)_minmax(0,1fr)_minmax(250px,290px)] xl:gap-8">
            <motion.div
              className="relative mx-auto w-full max-w-[315px] lg:mx-0"
              initial="hidden"
              variants={fadeLeft}
              viewport={{ once: true, amount: 0.25 }}
              whileInView="visible"
            >
              <div
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(124,58,237,0.35) 0%, rgba(6,182,212,0.2) 52%, transparent 72%)",
                  filter: "blur(46px)",
                }}
              />

              <div className="relative rounded-[26px] p-[1.5px] shadow-[0_32px_70px_-20px_rgba(0,0,0,0.72)]">
                <div
                  className="absolute inset-0 rounded-[26px]"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(124,58,237,0.78) 0%, rgba(6,182,212,0.5) 52%, rgba(236,72,153,0.45) 100%)",
                  }}
                />
                <div className="relative overflow-hidden rounded-[24.5px] bg-[#0c0c16] p-2.5">
                  <div className="relative overflow-hidden rounded-[21px]">
                    <Image
                      alt="Awais Mustafa – Full Stack Developer"
                      className="aspect-[4/5] w-full object-contain bg-[#0a0a14]"
                      height={1100}
                      priority
                      src="/images/profile-portrait.jpg"
                      width={880}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/48 via-black/[0.04] to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 backdrop-blur-sm">
                <p className="font-heading text-[13.5px] font-bold text-white">
                  M. Awais Mustafa
                </p>
                <p className="mt-1 text-[9.5px] font-bold uppercase tracking-[0.23em] text-gradient">
                  Full Stack Developer
                </p>
              </div>
            </motion.div>

            <motion.div
              className="min-w-0"
              initial="hidden"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              <div className="mb-6 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/[0.07] px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-45" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
                  </span>
                  <Zap className="h-3 w-3 text-accent-cyan" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gradient">
                    Full Stack Developer
                  </span>
                </div>
              </div>

              <h3 className="text-center font-heading text-[27px] font-bold leading-[1.15] tracking-tight text-white sm:text-[31px] md:text-[35px] lg:text-left">
                Building digital products with
                <span className="text-gradient"> clean code</span> and
                <span className="text-gradient"> intentional design</span>
              </h3>

              <div className="mt-6 space-y-4 text-[14px] leading-8 text-text-secondary sm:text-[15px]">
                <p className="rounded-2xl border border-white/[0.07] bg-white/[0.015] px-4 py-3.5 text-left">
                  I am a dedicated full-stack developer and Software Engineering graduate
                  (COMSATS University, 2022–2026) with hands-on experience across web
                  development, data science, and production-grade systems.
                </p>
                <p className="rounded-2xl border border-white/[0.07] bg-white/[0.015] px-4 py-3.5 text-left">
                  With 1+ years of professional experience — including an onsite role at{" "}
                  <span className="font-semibold text-white/90">CodeDesk Studio</span> — I
                  have built and shipped production apps using JavaScript, React, Next.js,
                  and Node.js, collaborating across frontend and backend teams daily.
                </p>
                <p className="rounded-2xl border border-white/[0.07] bg-white/[0.015] px-4 py-3.5 text-left">
                  I am committed to continuous improvement, exploring new engineering
                  patterns, and delivering meaningful digital products that create real
                  impact for users and businesses.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
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

              <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                {[
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "MongoDB",
                  "Flutter",
                  "TypeScript",
                  "Tailwind CSS",
                  "Express.js",
                ].map((tech) => (
                  <span
                    className="glass-panel inline-flex items-center gap-1.5 rounded-xl border-white/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary"
                    key={tech}
                  >
                    <span className="h-1 w-1 rounded-full accent-gradient" />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.aside
              className="space-y-3 xl:block"
              initial="hidden"
              variants={fadeRight}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              <p className="text-[9.5px] font-bold uppercase tracking-[0.3em] text-text-muted">
                Quick Info
              </p>
              <InfoCards />
              <DownloadCVButton />
            </motion.aside>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" ref={statsRef}>
          {stats.map((item, index) => (
            <StatCard
              index={index}
              inView={statsInView}
              key={item.label}
              label={item.label}
              suffix={item.suffix}
              value={item.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoCards() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
      {infoGrid.map((item) => (
        <div
          className={cn(
            "glass-panel group relative flex items-center gap-3.5 overflow-hidden rounded-[16px] border border-white/[0.07] p-3.5",
            "transition-all duration-300 hover:-translate-y-[2px] hover:border-accent-cyan/30 hover:shadow-[0_8px_32px_-8px_rgba(6,182,212,0.18)]",
          )}
          key={item.label}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-gradient-to-br from-accent-purple/[0.05] to-accent-cyan/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="accent-gradient-animated relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
            {INFO_ICONS[item.label] ?? <BriefcaseBusiness className="h-[17px] w-[17px]" />}
          </div>

          <div className="relative min-w-0 flex-1">
            <p className="text-[8.5px] font-bold uppercase tracking-[0.3em] text-text-muted">
              {item.label}
            </p>
            <p className="mt-0.5 truncate text-[12.5px] font-semibold text-white/85 transition-colors duration-200 group-hover:text-white">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DownloadCVButton() {
  return (
    <a
      className={cn(
        "btn-primary glow-ring-strong interactive-press focus-ring group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-[16px] accent-gradient-animated px-5 py-4 text-[13px] font-semibold text-white shadow-lg",
      )}
      download={RESUME_FILE}
      href={`/${RESUME_FILE}`}
    >
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
      <div className="accent-gradient-animated flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
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
        "glass-panel glass-hover border-gradient group relative overflow-hidden rounded-2xl border border-white/[0.07] px-6 py-7 text-center transition-all duration-400",
        "hover:-translate-y-2 hover:border-accent-cyan/25 hover:shadow-xl hover:shadow-accent-purple/10",
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
      <p className="relative mt-3 text-[10px] font-bold uppercase tracking-[0.28em] text-text-muted">
        {label}
      </p>
    </motion.div>
  );
}
