"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useReducedMotion } from "framer-motion";

export function ParticlesBackground() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const updateIsMobile = (event?: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    updateIsMobile(mediaQuery);
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  if (reduceMotion) {
    return null;
  }

  return (
    <ParticlesProvider init={loadSlim}>
      <ParticlesCanvas isMobile={isMobile} />
    </ParticlesProvider>
  );
}

function ParticlesCanvas({ isMobile }: { isMobile: boolean }) {
  const { loaded } = useParticlesProvider();
  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      detectRetina: false,
      fpsLimit: 40,
      fullScreen: { enable: false },
      interactivity: {
        detectsOn: "window" as const,
        events: {
          onClick: { enable: false },
          onHover: { enable: false },
          resize: { enable: true },
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        color: { value: "#ffffff" },
        links: isMobile
          ? { enable: false }
          : {
              color: "#ffffff",
              distance: 110,
              enable: true,
              opacity: 0.05,
              width: 1,
            },
        move: {
          direction: "top" as const,
          enable: true,
          outModes: { default: "out" as const },
          speed: isMobile ? 0.22 : 0.35,
        },
        number: {
          density: { enable: true, width: 1200, height: 800 },
          value: isMobile ? 18 : 30,
        },
        opacity: { value: isMobile ? 0.16 : 0.22 },
        shape: { type: "circle" as const },
        size: { value: { min: 1, max: isMobile ? 1.6 : 2 } },
      },
    }),
    [isMobile],
  );

  if (!loaded) return null;

  return (
    <Particles
      className="pointer-events-none absolute inset-0"
      id="hero-particles"
      options={options}
    />
  );
}
