"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── timing constants ──────────────────────────────────────────────────── */
const MIN_DISPLAY_MS = 900;   // always visible at least this long
const MAX_DISPLAY_MS = 2800;  // never blocks longer than this

export function InitialLoader() {
  const [visible, setVisible]   = useState(true);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());

  /* Smart exit: waits for document.readyState + MIN_DISPLAY_MS, caps at MAX */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const dismiss = () => {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, remaining);
    };

    // Hard cap so a slow network never blocks forever
    const cap = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, MAX_DISPLAY_MS);

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    return () => {
      clearTimeout(cap);
      window.removeEventListener("load", dismiss);
      document.body.style.overflow = "";
    };
  }, []);

  /* Smooth fake progress — eases to ~88% quickly, waits for real dismiss */
  useEffect(() => {
    if (!visible) return;

    let raf: number;
    const start = Date.now();
    const TARGET = 88;
    const DURATION = MAX_DISPLAY_MS * 0.8;

    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setProgress(Math.round(eased * TARGET));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setProgress(100);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, #07070d 0%, #0a0a16 60%, #080814 100%)" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* ── Grid texture (matches section-grid-bg) ── */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
              opacity: 0.5,
            }}
          />

          {/* ── Ambient orbs ── */}
          <div
            className="section-orb section-orb-alt pointer-events-none absolute"
            style={{
              width: 420,
              height: 420,
              left: "15%",
              top: "18%",
              background: "rgba(124, 58, 237, 0.22)",
              filter: "blur(96px)",
            }}
          />
          <div
            className="section-orb pointer-events-none absolute"
            style={{
              width: 340,
              height: 340,
              right: "10%",
              top: "22%",
              background: "rgba(6, 182, 212, 0.18)",
              filter: "blur(96px)",
              animationDelay: "2s",
              animationDuration: "18s",
            }}
          />

          {/* ── Scan-line sweep (single pass top → bottom) ── */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.55) 30%, rgba(6,182,212,0.9) 50%, rgba(124,58,237,0.55) 70%, transparent 100%)",
              boxShadow: "0 0 28px 6px rgba(6,182,212,0.35)",
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "100vh", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />

          {/* ── Main content ── */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-7"
            initial="hidden"
            animate="visible"
          >
            {/* Logo Badge with animated gradient border */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.72, y: 16 },
                visible: {
                  opacity: 1, scale: 1, y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="relative"
            >
              {/* Animated gradient border */}
              <div
                className="absolute -inset-[2px] rounded-[22px] accent-gradient-animated opacity-80"
                style={{ filter: "blur(1px)" }}
              />
              {/* Outer ambient glow */}
              <div
                className="absolute -inset-4 rounded-[32px] opacity-25"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,58,237,0.7) 0%, rgba(6,182,212,0.5) 50%, transparent 70%)",
                  filter: "blur(24px)",
                }}
              />
              <div className="glass-panel-strong relative flex h-[76px] w-[76px] items-center justify-center rounded-[20px]">
                <span className="font-heading text-[28px] font-bold tracking-tight text-gradient">
                  AM
                </span>
              </div>
            </motion.div>

            {/* Name + Tagline */}
            <motion.div
              className="flex flex-col items-center gap-2"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.35 },
                },
              }}
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="font-heading text-[22px] font-bold tracking-tight text-white sm:text-[26px]"
              >
                Awais Mustafa
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 0.75, y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="text-[10px] font-bold uppercase tracking-[0.32em] text-gradient"
              >
                Full Stack Developer
              </motion.p>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              className="flex flex-col items-center gap-2.5"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 0.55, duration: 0.4 },
                },
              }}
            >
              <div
                className="relative h-[3px] w-52 overflow-hidden rounded-full sm:w-64"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                {/* Shimmer sweep on bar */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s linear infinite",
                  }}
                />
                <motion.div
                  className="h-full rounded-full accent-gradient"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.15 }}
                />
              </div>
              <span className="font-heading text-[10px] font-semibold tabular-nums tracking-[0.22em] text-text-muted">
                {progress}%
              </span>
            </motion.div>
          </motion.div>

          {/* ── Full-width bottom progress rail ── */}
          <motion.div
            className="absolute bottom-0 inset-x-0 h-[2px]"
            style={{ background: "rgba(255,255,255,0.04)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full accent-gradient-animated"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.15 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
