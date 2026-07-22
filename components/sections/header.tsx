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
};

export function Header({ activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarSolid, setNavbarSolid] = useState(false);
  const { scrollTo, lenis } = useSmoothScroll();

  useEffect(() => {
    if (lenis) {
      const updateNavbar = () => {
        setNavbarSolid(lenis.scroll > 50);
      };

      updateNavbar();
      const unsubscribe = lenis.on("scroll", updateNavbar);

      return () => {
        unsubscribe();
      };
    }

    const handleScroll = () => {
      setNavbarSolid(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lenis]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
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
          "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
          navbarSolid
            ? "border-b border-white/10 bg-black/50 backdrop-blur-2xl shadow-lg"
            : "bg-transparent",
        )}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="container-shell flex h-[72px] items-center justify-between gap-4">
          <button
            className="font-heading text-2xl font-bold tracking-tight text-gradient interactive-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-lg"
            onClick={() => handleNavClick("home")}
            type="button"
          >
            AM
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  className={cn(
                    "group relative text-sm text-text-secondary transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-md px-1 py-0.5",
                    isActive && "text-gradient font-medium",
                  )}
                  onClick={() => handleNavClick(link.id)}
                  type="button"
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-[2px] w-full origin-left rounded-full accent-gradient transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </button>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <button
              className="group glass-panel relative inline-flex overflow-hidden rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white interactive-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              onClick={() => handleNavClick("contact")}
              type="button"
            >
              <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
              <span className="relative z-10">Hire me</span>
            </button>
          </div>

          <button
            aria-label="Open navigation menu"
            className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden interactive-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            onClick={() => toggleMobileMenu(true)}
            type="button"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.aside
            animate={{ opacity: 1, x: 0 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xl md:hidden"
            exit={{ opacity: 0, x: "100%" }}
            initial={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-panel ml-auto flex h-full w-full max-w-sm flex-col p-6 border-l border-white/10">
              <div className="mb-12 flex items-center justify-between">
                <span className="font-heading text-2xl font-bold tracking-tight text-gradient">
                  AM
                </span>
                <button
                  aria-label="Close navigation menu"
                  className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full interactive-press"
                  onClick={() => toggleMobileMenu(false)}
                  type="button"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    className="text-left font-heading text-3xl font-semibold text-white hover:text-accent-cyan transition-colors interactive-press"
                    onClick={() => handleNavClick(link.id)}
                    type="button"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <button
                  className="accent-gradient w-full py-4 rounded-full text-white font-medium text-center shadow-glow interactive-press"
                  onClick={() => handleNavClick("contact")}
                  type="button"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
