"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Mail, Code2, Facebook, Github, Linkedin } from "lucide-react";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { useSmoothScroll } from "@/components/ui/smooth-scroll-provider";
import { heroRoles, socialLinks } from "@/data/site";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();
  const typedRole = useTypewriter({ words: heroRoles });
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-shell relative min-h-screen pt-28" id="home">
      {/* Hero-specific grid overlay */}
      <div className="section-grid-bg" />

      {/* Hero accent orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb absolute left-[8%] top-[22%] h-[360px] w-[360px] bg-accent-purple/25"
          style={{ animationDuration: "16s" }}
        />
        <div
          className="section-orb section-orb-alt absolute right-[6%] top-[18%] h-[320px] w-[320px] bg-accent-cyan/20"
          style={{ animationDelay: "2s", animationDuration: "18s" }}
        />
        <div
          className="section-orb absolute left-1/2 bottom-[5%] h-[420px] w-[420px] -translate-x-1/2 bg-accent-blue/12"
          style={{ animationDelay: "3.5s", animationDuration: "20s" }}
        />
      </div>

      <ParticlesBackground />

      <div className="container-shell relative flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center py-16 text-center">
        <motion.div
          animate="visible"
          className="relative z-10 flex w-full max-w-5xl flex-col items-center"
          initial="hidden"
          variants={heroContainer}
        >
          {/* Status pill with glow */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full accent-gradient opacity-0 blur transition-opacity duration-500 group-hover:opacity-30" />
              <div className="glass-panel relative inline-flex items-center gap-3 rounded-full border-white/[0.12] px-5 py-2.5 text-[13px]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-medium text-text-secondary">Available for Work</span>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />
                <span className="hidden items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gradient sm:inline-flex">
                  <Code2 className="h-3 w-3" />
                  MERN Stack
                </span>
              </div>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={fadeUp}
            className="mb-4 font-body text-[17px] text-text-secondary md:text-[19px]"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name with decorative glow */}
          <motion.div variants={fadeUp} className="relative w-full">
            <div className="pointer-events-none absolute -inset-10 mx-auto h-[200px] w-[90%] max-w-4xl rounded-full bg-gradient-to-r from-accent-purple/20 via-accent-cyan/15 to-accent-pink/15 blur-3xl opacity-60" />
            <h1 className="relative font-heading text-[44px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[56px] md:text-[84px] lg:text-[96px]">
              <span className="inline-block bg-clip-text text-transparent" style={{
                backgroundImage: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)",
                WebkitBackgroundClip: "text",
              }}>
                Awais
              </span>
              <br className="sm:hidden" />
              <span className="text-gradient sm:ml-4">Mustafa</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex min-h-[3rem] items-center justify-center font-heading text-[22px] font-semibold sm:text-[28px] md:text-[40px] md:leading-tight"
          >
            <span className="text-gradient">{typedRole}</span>
            {!reduceMotion && (
              <span
                className="ml-1.5 inline-block h-[1em] w-[3px] rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #a78bfa, #22d3ee)",
                  animation: "blink 1s step-end infinite",
                }}
              />
            )}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-[15px] leading-8 text-text-secondary sm:text-base md:text-[17px] md:leading-[2]"
          >
            I craft premium web experiences with the MERN stack. Engineering
            <span className="text-white/90"> clean code</span>,
            <span className="text-white/90"> thoughtful design</span>, and
            performant interfaces that turn ideas into remarkable digital products.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="mt-10 grid w-full max-w-xl grid-cols-3 gap-3 sm:gap-6">
            {[
              { label: "Experience", value: "1+ Yrs" },
              { label: "Projects", value: "10+" },
              { label: "Satisfaction", value: "95%" },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel rounded-2xl border-white/[0.08] px-3 py-3 sm:px-4 sm:py-4">
                <p className="font-heading text-[17px] font-bold text-gradient sm:text-xl md:text-2xl">{stat.value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted sm:text-[11px]">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <button
              className="btn-primary glow-ring-strong interactive-press focus-ring inline-flex items-center gap-2.5 overflow-hidden rounded-full accent-gradient-animated px-8 py-4 text-[14px] font-semibold text-white sm:px-10 sm:py-4.5 sm:text-sm"
              onClick={() => scrollTo("#projects")}
              type="button"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                View My Work
                <span className="relative inline-flex">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </button>

            <a
              className="glass-panel glass-hover border-gradient interactive-press focus-ring group inline-flex items-center gap-2.5 rounded-full border-white/[0.12] px-8 py-4 text-[14px] font-semibold text-white sm:px-10 sm:py-4.5 sm:text-sm"
              download="awais-mustafa-resume.pdf"
              href="/awais-mustafa-resume.pdf"
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
              Download CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="mt-11 flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
            <span className="mr-1 hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted sm:inline-flex">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
              Connect
            </span>
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.label}
                aria-label={item.label}
                className="group/soc relative focus-ring"
                href={item.href}
                rel="noreferrer"
                target="_blank"
                initial={{ opacity: 0, scale: 0.82, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.95 + index * 0.07, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Ambient glow on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1.5 rounded-[22px] opacity-0 blur-xl transition-all duration-500 ease-out group-hover/soc:opacity-60"
                  style={{ backgroundColor: item.glowColor }}
                />
                {/* Outer frame */}
                <span
                  className={cn(
                    "glass-panel relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[20px] border transition-all duration-400 ease-out will-change-transform",
                    "border-white/[0.09] hover:-translate-y-1 sm:h-12 sm:w-12",
                  )}
                >
                  {/* Gradient inner background on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[1px] rounded-[19px] opacity-0 transition-opacity duration-400 ease-out group-hover/soc:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${item.glowColor}55 0%, transparent 65%)`,
                    }}
                  />
                  {/* Thin border accent on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[20px] border opacity-0 transition-opacity duration-400 group-hover/soc:opacity-100"
                    style={{ borderColor: `${item.color}66` }}
                  />
                  {/* Icon */}
                  <span
                    className="social-icon-wrap relative z-10 flex h-[18px] w-[18px] items-center justify-center transition-all duration-400 ease-out group-hover/soc:scale-110"
                    style={
                      {
                        color: "rgba(255,255,255,0.40)",
                        "--brand-color": item.color,
                      } as React.CSSProperties
                    }
                  >
                    <SocialIcon type={item.icon} />
                  </span>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ type }: { type: string }) {
  if (type === "mail") return <Mail className="h-[18px] w-[18px]" />;

  if (type === "facebook") {
    return (
      <svg aria-hidden="true" className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.438H7.078v-3.49h3.047V9.41c0-3.017 1.792-4.687 4.533-4.687 1.313 0 2.686.235 2.686.235v2.962h-1.514c-1.491 0-1.956.931-1.956 1.887v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.099 24 12.073Z" />
      </svg>
    );
  }

  if (type === "x") {
    return (
      <svg aria-hidden="true" className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.585-6.64 7.585H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.297 19.48h2.039L6.486 3.133H4.298l13.306 17.5Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
      <path d="M12 .5C5.649.5.5 5.649.5 12A11.5 11.5 0 0 0 8.36 22.045c.575.106.785-.25.785-.556 0-.275-.01-1.004-.016-1.971-3.182.691-3.854-1.533-3.854-1.533-.52-1.322-1.27-1.674-1.27-1.674-1.038-.71.079-.696.079-.696 1.147.08 1.75 1.178 1.75 1.178 1.019 1.748 2.672 1.243 3.323.951.104-.738.398-1.243.724-1.529-2.54-.289-5.211-1.27-5.211-5.653 0-1.248.446-2.268 1.177-3.067-.118-.289-.51-1.452.112-3.027 0 0 .96-.307 3.146 1.172A10.95 10.95 0 0 1 12 6.032c.973.004 1.954.132 2.87.387 2.184-1.479 3.143-1.172 3.143-1.172.624 1.575.232 2.738.114 3.027.733.799 1.175 1.819 1.175 3.067 0 4.394-2.675 5.361-5.223 5.645.409.352.774 1.047.774 2.111 0 1.524-.014 2.753-.014 3.126 0 .309.207.668.79.555A11.5 11.5 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
    </svg>
  );
}
