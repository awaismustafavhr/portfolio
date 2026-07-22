import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll-provider";
import { InitialLoader } from "@/components/ui/initial-loader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Awais Mustafa | Next.js Portfolio",
  description:
    "Industrial-grade personal portfolio built with Next.js, Tailwind CSS, Framer Motion, and glassmorphism aesthetics.",
  keywords: ["Next.js portfolio", "frontend developer", "UI UX designer", "React", "TypeScript"],
  openGraph: {
    title: "Awais Mustafa| Next.js Portfolio",
    description:
      "A premium portfolio showcasing product design, frontend engineering, and polished digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-background font-body text-text-primary antialiased`}>
        <SmoothScrollProvider>
          <InitialLoader />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
