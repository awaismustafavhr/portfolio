"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { useSmoothScroll } from "@/components/ui/smooth-scroll-provider";
import { heroRoles, socialLinks } from "@/data/site";
import { useTypewriter } from "@/hooks/useTypewriter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();
  const typedRole = useTypewriter({ words: heroRoles });

  return (
    <section className="section-shell min-h-screen pt-28" id="home">
      <ParticlesBackground />
      <div className="container-shell flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center py-16 text-center">
        <motion.div
          animate="visible"
          className="relative z-10 flex max-w-4xl flex-col items-center"
          initial="hidden"
          variants={heroContainer}
        >
          <motion.div
            className="glass-panel mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm text-text-secondary"
            variants={fadeUp}
          >
            <span className="h-2.5 w-2.5 animate-pulseDot rounded-full bg-emerald-400" />
            Available for Work
          </motion.div>

          <motion.p
            className="font-body text-lg text-text-secondary md:text-xl"
            variants={fadeUp}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="font-heading text-5xl font-bold leading-tight tracking-tight text-white md:text-[80px]"
            transition={{ duration: 0.65, delay: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
          >
            Awais Mustafa
          </motion.h1>

          <motion.div
            className="font-heading text-3xl font-semibold md:text-5xl mt-4 flex items-center justify-center"
            variants={fadeUp}
          >
            <span className="text-gradient">{typedRole}</span>
            <span className="ml-1 animate-blink text-white">|</span>
          </motion.div>

          <motion.p
            className="mt-8 max-w-2xl text-base leading-8 text-text-secondary md:text-lg"
            variants={fadeUp}
          >
            I build modern web applications using the MERN stack. Focused on clean
            code, responsive design, and creating user-friendly interfaces that
            provide great experiences.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap justify-center gap-4" variants={fadeUp}>
            <button
              className="accent-gradient glow-ring interactive-press inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-white transition duration-300 hover:scale-105"
              onClick={() => scrollTo("#projects")}
              type="button"
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </button>
            <a
              className="glass-panel glass-hover interactive-press inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 text-sm font-medium text-white"
              download
              href="/resume.pdf"
            >
              Download CV <Download className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            variants={fadeUp}
          >
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.label}
                aria-label={item.label}
                className="glass-panel group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                href={item.href}
                rel="noreferrer"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                target="_blank"
                transition={{ delay: 0.4 + index * 0.08, duration: 0.22 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 72%)`,
                  }}
                />
                <span
                  className="relative z-10 transition-colors duration-300 group-hover:text-white"
                  style={{ color: item.color }}
                >
                  <SocialIcon type={item.icon} />
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
  if (type === "mail") return <Mail className="h-5 w-5" />;

  if (type === "facebook") {
    return (
      <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.438H7.078v-3.49h3.047V9.41c0-3.017 1.792-4.687 4.533-4.687 1.313 0 2.686.235 2.686.235v2.962h-1.514c-1.491 0-1.956.931-1.956 1.887v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.099 24 12.073Z" />
      </svg>
    );
  }

  if (type === "x") {
    return (
      <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.585-6.64 7.585H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.297 19.48h2.039L6.486 3.133H4.298l13.306 17.5Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 .5C5.649.5.5 5.649.5 12A11.5 11.5 0 0 0 8.36 22.045c.575.106.785-.25.785-.556 0-.275-.01-1.004-.016-1.971-3.182.691-3.854-1.533-3.854-1.533-.52-1.322-1.27-1.674-1.27-1.674-1.038-.71.079-.696.079-.696 1.147.08 1.75 1.178 1.75 1.178 1.019 1.748 2.672 1.243 3.323.951.104-.738.398-1.243.724-1.529-2.54-.289-5.211-1.27-5.211-5.653 0-1.248.446-2.268 1.177-3.067-.118-.289-.51-1.452.112-3.027 0 0 .96-.307 3.146 1.172A10.95 10.95 0 0 1 12 6.032c.973.004 1.954.132 2.87.387 2.184-1.479 3.143-1.172 3.143-1.172.624 1.575.232 2.738.114 3.027.733.799 1.175 1.819 1.175 3.067 0 4.394-2.675 5.361-5.223 5.645.409.352.774 1.047.774 2.111 0 1.524-.014 2.753-.014 3.126 0 .309.207.668.79.555A11.5 11.5 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
    </svg>
  );
}
