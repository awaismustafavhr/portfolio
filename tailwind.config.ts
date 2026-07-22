import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./emails/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0a0f",
          secondary: "#0f0f1a",
        },
        glass: {
          bg: "rgba(255,255,255,0.05)",
          border: "rgba(255,255,255,0.10)",
          hover: "rgba(255,255,255,0.08)",
        },
        accent: {
          purple: "#7C3AED",
          cyan: "#06B6D4",
          pink: "#EC4899",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#475569",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        glow: "0 0 20px rgba(124, 58, 237, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)",
      },
      backgroundImage: {
        accent: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 50%, #EC4899 100%)",
      },
      keyframes: {
        "orb-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(20px, -20px) scale(1.05)" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.35)", opacity: ".6" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        orb: "orb-float 8s ease-in-out infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        bounceSoft: "bounceSoft 2s ease-in-out infinite",
        marqueeLeft: "marqueeLeft 30s linear infinite",
        marqueeRight: "marqueeRight 30s linear infinite",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
