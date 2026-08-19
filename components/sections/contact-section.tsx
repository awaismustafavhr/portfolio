"use client";

import { FormEvent, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { contactDetails } from "@/data/site";
import { cn } from "@/lib/utils";

const contactIcons: Record<string, React.ReactNode> = {
  Email: <Mail className="h-5 w-5" />,
  Location: <MapPin className="h-5 w-5" />,
  Availability: <Sparkles className="h-5 w-5" />,
};

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [contactState, setContactState] = useState<{
    loading: boolean;
    message: string;
    success: boolean;
  }>({ loading: false, message: "", success: false });

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    setContactState({ loading: true, message: "", success: false });

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to send your message right now.");
      }

      formRef.current?.reset();
      setContactState({
        loading: false,
        message: result.message ?? "Message sent successfully.",
        success: true,
      });
    } catch (error) {
      setContactState({
        loading: false,
        message:
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
        success: false,
      });
    }
  };

  return (
    <section className="section-shell relative py-28 md:py-32" id="contact">
      {/* Background elements */}
      <div className="section-grid-bg opacity-25" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb section-orb-alt absolute left-[-120px] top-[10%] h-[400px] w-[400px] bg-accent-cyan/13"
          style={{ animationDuration: "18s" }}
        />
        <div
          className="section-orb absolute right-[-100px] bottom-[8%] h-[380px] w-[380px] bg-accent-purple/13"
          style={{ animationDelay: "3s", animationDuration: "19s" }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="LET'S BUILD"
          title="Get In Touch"
          subtitle="Have a project in mind, want to collaborate, or just want to say hello? My inbox is always open."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* ── Left column: info ── */}
          <div className="flex flex-col gap-5">
            {/* Hero CTA card */}
            <div className="border-gradient glass-panel glass-hover group relative overflow-hidden rounded-[28px] border border-white/[0.08] p-8">
              {/* Large ambient glows */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent-cyan/12 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-accent-purple/12 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Corner dots */}
              <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-1.5 rounded-full accent-gradient opacity-60" />
              <span className="pointer-events-none absolute right-4 bottom-4 h-1.5 w-1.5 rounded-full accent-gradient opacity-40" />

              <div className="relative">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.08] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-accent-cyan">
                  <MessageSquare className="h-3 w-3" />
                  Open for opportunities
                </span>
                <h3 className="font-heading text-[26px] font-bold leading-[1.2] tracking-tight text-white sm:text-[30px] md:text-[34px]">
                  Ready to create something{" "}
                  <span className="text-gradient">truly exceptional</span>
                </h3>
                <p className="mt-4 text-[14px] leading-[1.85] text-text-secondary sm:text-[15px]">
                  I partner with founders, teams, and ambitious brands to craft premium digital
                  products that look refined, perform fast, and scale with confidence. Let&apos;s discuss how we can work together.
                </p>

                {/* Response time badge */}
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-5">
                  <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                      Available Now
                    </span>
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Typical response: <span className="font-semibold text-text-secondary">within 24 hours</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Contact detail cards */}
            <div className="flex flex-col gap-3">
              {contactDetails.map((detail) => {
                const icon = contactIcons[detail.label] ?? <Mail className="h-5 w-5" />;
                return (
                  <a
                    key={detail.label}
                    className="border-gradient glass-panel glass-hover group/info flex items-center gap-4 rounded-[22px] border border-white/[0.08] p-5 transition-all duration-400 hover:border-accent-cyan/30 interactive-press focus-ring"
                    href={detail.href}
                  >
                    {/* Icon with glow */}
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 rounded-2xl accent-gradient opacity-30 blur-md transition-opacity duration-300 group-hover/info:opacity-50" />
                      <div className="glass-panel-strong relative flex h-12 w-12 items-center justify-center rounded-2xl border-white/[0.1]">
                        <div className="absolute inset-[2px] rounded-[14px] accent-gradient-animated" />
                        <span className="relative text-white drop-shadow-sm">{icon}</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
                        {detail.label}
                      </p>
                      <p className="mt-1 truncate text-[14px] font-semibold text-white sm:text-[15px]">
                        {detail.value}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-text-muted transition-all duration-400 group-hover/info:translate-x-1 group-hover/info:text-accent-cyan" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Right column: form ── */}
          <form
            ref={formRef}
            className="border-gradient glass-panel glass-hover group/form relative overflow-hidden rounded-[28px] border border-white/[0.08] p-8 md:p-10"
            onSubmit={handleContactSubmit}
          >
            {/* Form ambient glows */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-accent-purple/10 blur-3xl transition-opacity duration-500 group-hover/form:opacity-100" />
            <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-accent-cyan/[0.08] blur-2xl transition-opacity duration-500 group-hover/form:opacity-100" />

            {/* Corner dots */}
            <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-1.5 rounded-full accent-gradient opacity-60" />
            <span className="pointer-events-none absolute right-4 top-4 h-1.5 w-1.5 rounded-full accent-gradient opacity-30" />
            <span className="pointer-events-none absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full accent-gradient opacity-40" />

            <div className="relative">
              {/* Form header */}
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-muted">
                    <Send className="h-3 w-3 text-accent-cyan" />
                    Contact Form
                  </span>
                  <h4 className="font-heading text-[22px] font-bold tracking-tight text-white sm:text-[24px]">
                    Send a Message
                  </h4>
                </div>
                <span className="hidden flex-col items-end text-right sm:flex">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Fast &amp; Secure</span>
                  <span className="mt-1 text-[11px] text-text-secondary">Encrypted submission</span>
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FormField label="Full Name" name="name" placeholder="Your full name" />
                <FormField
                  label="Email Address"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div className="mt-5">
                <FormField
                  label="Company / Brand"
                  name="company"
                  placeholder="Company or project name (optional)"
                />
              </div>
              <div className="mt-5">
                <FormField
                  label="Message"
                  multiline
                  name="message"
                  placeholder="Tell me about your project, timeline, budget and goals..."
                />
              </div>

              <button
                className="btn-primary glow-ring-strong mt-6 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-[20px] accent-gradient-animated px-6 py-4 text-[13.5px] font-bold text-white interactive-press focus-ring disabled:cursor-not-allowed disabled:opacity-70"
                disabled={contactState.loading}
                type="submit"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  {contactState.loading ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      Sending your message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4.5 w-4.5 transition-transform duration-300 group-hover/form:translate-x-0.5 group-hover/form:-translate-y-0.5" />
                    </>
                  )}
                </span>
              </button>

              {contactState.message ? (
                <motion.div
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "mt-5 flex items-start gap-3 rounded-[18px] border p-5",
                    contactState.success
                      ? "border-emerald-400/25 bg-emerald-400/[0.08]"
                      : "border-rose-400/25 bg-rose-400/[0.08]",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                      contactState.success
                        ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-400"
                        : "border border-rose-400/25 bg-rose-400/10 text-rose-400",
                    )}
                  >
                    {contactState.success ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-[13.5px] font-semibold sm:text-[14px]",
                        contactState.success ? "text-emerald-400" : "text-rose-400",
                      )}
                    >
                      {contactState.success ? "All set!" : "Oops!"}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-[13px] leading-[1.65]",
                        contactState.success ? "text-emerald-400/80" : "text-rose-400/80",
                      )}
                    >
                      {contactState.message}
                    </p>
                  </div>
                </motion.div>
              ) : null}

              {/* Privacy note */}
              <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-text-muted">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-cyan/70" />
                Your information is kept completely private and will never be shared with third parties.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  placeholder,
  type = "text",
  multiline = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  multiline?: boolean;
}) {
  const inputClass =
    "peer w-full rounded-[16px] border border-white/[0.09] bg-white/[0.035] px-[18px] py-3.5 text-[14px] leading-relaxed text-white placeholder:text-text-muted/80 outline-none transition-all duration-300 focus:border-accent-cyan/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(6,182,212,0.08)] hover:border-white/[0.18] focus-ring";

  return (
    <label className="group/fld block">
      <span className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 group-focus-within/fld:text-accent-cyan">
        {label}
      </span>
      {multiline ? (
        <textarea
          className={cn(inputClass, "min-h-[150px] resize-y py-3")}
          name={name}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          className={inputClass}
          name={name}
          placeholder={placeholder}
          required
          type={type}
        />
      )}
    </label>
  );
}
