"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { useSmoothScroll } from "@/components/ui/smooth-scroll-provider";
import { cn } from "@/lib/utils";

type HeaderProps = {
  activeSection: string;
  onNavClick?: (id: string) => void;
};

export function Header({ activeSection, onNavClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarSolid, setNavbarSolid] = useState(false);
  const [navProgress, setNavProgress] = useState(0);
  const { scrollTo, lenis } = useSmoothScroll();

  useEffect(() => {
    let isCurrentlySolid = window.scrollY > 40;
    setNavbarSolid(isCurrentlySolid);

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      setNavProgress(pct);
    };

    updateProgress();

    if (lenis) {
      const updateNavbar = () => {
        const nextSolid = lenis.scroll > 40;
        if (nextSolid !== isCurrentlySolid) {
          isCurrentlySolid = nextSolid;
          setNavbarSolid(nextSolid);
        }
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(100, (lenis.scroll / max) * 100) : 0;
        setNavProgress(pct);
      };

      const unsubscribe = lenis.on("scroll", updateNavbar);
      return () => {
        unsubscribe();
      };
    }

    const handleScroll = () => {
      const nextSolid = window.scrollY > 40;
      if (nextSolid !== isCurrentlySolid) {
        isCurrentlySolid = nextSolid;
        setNavbarSolid(nextSolid);
      }
      updateProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lenis]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(id);
    }
    if (lenis) {
      lenis.start();
    }
    scrollTo(`#${id}`);
  };

  const toggleMobileMenu = (open: boolean) => {
    setMobileMenuOpen(open);
    if (lenis) {
      if (open) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  };

  return (
    <>
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500 transform-gpu",
          navbarSolid
            ? "border-b border-white/[0.08] bg-[#07070d]/75 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]"
            : "bg-transparent",
        )}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        {/* Scroll progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04]">
          <motion.div
            className="h-full accent-gradient-animated"
            style={{ width: `${navProgress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        <div className="container-shell flex h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <button
            className="group relative font-heading focus-ring flex items-center gap-2.5 rounded-xl px-1.5 py-1.5 interactive-press"
            onClick={() => handleNavClick("home")}
            type="button"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl accent-gradient opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-40" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-[10px] accent-gradient-animated font-heading text-[16px] font-bold text-white shadow-lg">
                AM
              </div>
            </div>
            <span className="hidden font-heading text-[15px] font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white sm:inline-block md:hidden lg:inline-block">
              Awais
              <span className="text-gradient">.dev</span>
            </span>
          </button>

          {/* Desktop nav (centered floating pill) */}
          <nav className="hidden flex-1 items-center justify-center md:flex">
            <div className="glass-panel inline-flex items-center gap-1 rounded-full border-white/[0.09] bg-white/[0.02] p-1.5 backdrop-blur-xl shadow-[0_8px_32px_-16px_rgba(0,0,0,0.5)]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 focus-ring",
                      isActive
                        ? "text-white"
                        : "text-text-secondary hover:text-white hover:bg-white/[0.04]",
                    )}
                    onClick={() => handleNavClick(link.id)}
                    type="button"
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 -z-0 rounded-full accent-gradient opacity-95 shadow-[0_2px_12px_-4px_rgba(124,58,237,0.5)]"
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right placeholder to balance flex layout on md+ */}
          <div className="hidden w-[120px] shrink-0 md:block" />

          {/* Mobile menu toggle */}
          <button
            aria-label="Open navigation menu"
            className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full border-white/[0.1] interactive-press focus-ring md:hidden"
            onClick={() => toggleMobileMenu(true)}
            type="button"
          >
            <Menu className="h-[18px] w-[18px] text-white" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.aside
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[110] md:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
              onClick={() => toggleMobileMenu(false)}
            />
            {/* Panel */}
            <motion.div
              animate={{ x: 0 }}
              className="glass-panel-strong absolute right-0 top-0 flex h-full w-full max-w-[85vw] flex-col overflow-hidden border-l border-white/[0.1]"
              exit={{ x: "100%" }}
              initial={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl accent-gradient-animated font-heading text-base font-bold text-white shadow-lg">
                    AM
                  </div>
                  <div>
                    <p className="font-heading text-[15px] font-semibold text-white">Awais Mustafa</p>
                    <p className="text-[11px] text-text-muted">Full Stack Developer</p>
                  </div>
                </div>
                <button
                  aria-label="Close navigation menu"
                  className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-xl border-white/[0.1] interactive-press focus-ring"
                  onClick={() => toggleMobileMenu(false)}
                  type="button"
                >
                  <X className="h-[18px] w-[18px] text-white" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-2">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <button
                        key={link.id}
                        className={cn(
                          "group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left transition-all duration-300 interactive-press",
                          isActive
                            ? "bg-white/[0.06] text-white border border-white/[0.1]"
                            : "text-text-secondary hover:bg-white/[0.03] hover:text-white",
                        )}
                        onClick={() => handleNavClick(link.id)}
                        type="button"
                      >
                        <span className="font-heading text-xl font-semibold">{link.label}</span>
                        <svg
                          className={cn(
                            "h-4 w-4 transition-all duration-300",
                            isActive ? "text-gradient opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                          )}
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="border-t border-white/[0.08] px-6 py-5">
                <button
                  className="btn-primary glow-ring-strong flex w-full items-center justify-center gap-2.5 rounded-2xl accent-gradient-animated py-4 text-[14px] font-semibold text-white interactive-press focus-ring"
                  onClick={() => handleNavClick("contact")}
                  type="button"
                >
                  Hire Me
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
