"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { useSmoothScroll } from "@/components/ui/smooth-scroll-provider";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { lenis } = useSmoothScroll();

  const titleId = useMemo(
    () => (project ? `project-modal-title-${project.id}` : "project-modal-title"),
    [project],
  );

  useEffect(() => {
    if (!project) return;

    // Pause Lenis background scrolling when modal is open
    if (lenis) {
      lenis.stop();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (lenis) {
        lenis.start();
      }
    };
  }, [lenis, onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-labelledby={titleId}
            aria-modal="true"
            className="glass-panel max-h-[90vh] w-full max-w-4xl overflow-y-auto p-6 md:p-12 border border-white/10 shadow-2xl rounded-3xl"
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gradient">
                  {project.category}
                </p>
                <h3
                  className="mt-3 font-heading text-3xl font-semibold text-white md:text-4xl"
                  id={titleId}
                >
                  {project.title}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                aria-label="Close project details"
                className="glass-panel glass-hover inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 interactive-press"
                onClick={onClose}
                type="button"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="glass-panel relative mb-8 overflow-hidden rounded-[24px] border border-white/10">
              <Image
                alt={project.title}
                className="h-auto w-full object-cover"
                height={900}
                priority
                src={project.image}
                width={1600}
              />
            </div>

            <p className="max-w-3xl text-lg leading-8 text-text-secondary">
              {project.fullDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-panel rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                className="accent-gradient glow-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02] interactive-press shadow-md"
                href={project.liveUrl}
                rel="noreferrer"
                target="_blank"
              >
                Live Demo <ExternalLink className="h-4 w-4" />
              </a>
              <a
                className="glass-panel glass-hover inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white interactive-press"
                href={project.githubUrl}
                rel="noreferrer"
                target="_blank"
              >
                Source Code <Github className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
