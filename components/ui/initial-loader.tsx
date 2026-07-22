"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loader is active
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "";
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 80);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0a0a0f]"
        >
          {/* Ambient background glows */}
          <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-accent-purple/20 blur-[100px]" />
          <div className="pointer-events-none absolute h-[250px] w-[250px] rounded-full bg-accent-cyan/15 blur-[90px]" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Logo Badge */}
            <div className="glass-panel flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 shadow-glow">
              <span className="font-heading text-3xl font-bold tracking-tight text-gradient">
                AM
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full accent-gradient"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
              <span className="font-heading text-xs font-medium tracking-[0.25em] text-text-secondary">
                {Math.min(progress, 100)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
