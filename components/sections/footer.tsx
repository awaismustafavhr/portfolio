"use client";

import { useSmoothScroll } from "@/components/ui/smooth-scroll-provider";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="border-t border-white/10 py-8 bg-black/30">
      <div className="container-shell flex flex-col items-center justify-between gap-4 text-sm text-text-secondary md:flex-row">
        <button
          className="font-heading text-lg font-bold text-white hover:text-accent-cyan transition-colors"
          onClick={() => scrollTo("#home")}
          type="button"
        >
          AM
        </button>
        <p>© 2026 Awais Mustafa. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a
            className="hover:text-white transition-colors"
            href="https://www.linkedin.com/in/muhammad-awais-mustafa-224956319/"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className="hover:text-white transition-colors"
            href="https://github.com/awaismustafavhr"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <button
            className="hover:text-accent-cyan transition-colors interactive-press font-medium"
            onClick={() => scrollTo("#home")}
            type="button"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
