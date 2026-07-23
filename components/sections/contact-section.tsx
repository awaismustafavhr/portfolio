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

      const result = (await response.json()) as { message?: string };

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
    <section className="section-shell bg-background-secondary py-28" id="contact">
      <div className="container-shell">
        <SectionHeading
          eyebrow="LET'S BUILD"
          title="Contact Me"
          subtitle="Have a project in mind or just want to say hello? I'd love to hear from you."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* ── Left column: info ── */}
          <div className="flex flex-col gap-5">
            {/* Hero CTA card */}
            <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-cyan/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-accent-purple/10 blur-2xl" />
              <div className="relative">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-cyan">
                  <MessageSquare className="h-3 w-3" />
                  Open for opportunities
                </span>
                <h3 className="font-heading text-2xl font-bold leading-snug text-white md:text-3xl">
                  Ready to create something{" "}
                  <span className="text-gradient">memorable</span>
                </h3>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  I partner with founders, teams, and ambitious brands to craft premium digital
                  products that look refined, perform fast, and scale with confidence.
                </p>
              </div>
            </div>

            {/* Contact detail cards */}
            <div className="flex flex-col gap-3">
              {contactDetails.map((detail) => {
                const icon = contactIcons[detail.label] ?? <Mail className="h-5 w-5" />;
                return (
                  <a
                    key={detail.label}
                    className="glass-panel glass-hover group flex items-center gap-4 rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:border-accent-cyan/30"
                    href={detail.href}
                  >
                    <div className="accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md">
                      {icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-text-muted">
                        {detail.label}
                      </p>
                      <p className="mt-1 truncate text-sm font-medium text-white">
                        {detail.value}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-cyan" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Right column: form ── */}
          <form
            ref={formRef}
            className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10"
            onSubmit={handleContactSubmit}
          >
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-accent-purple/8 blur-3xl" />
            <div className="relative">
              <h4 className="mb-6 font-heading text-xl font-semibold text-white">
                Send a Message
              </h4>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField label="Full Name" name="name" placeholder="Your name" />
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
                  placeholder="Tell me about your project, timeline, and goals..."
                />
              </div>

              <button
                className="accent-gradient glow-ring mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-sm font-semibold text-white shadow-md transition duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={contactState.loading}
                type="submit"
              >
                {contactState.loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending your message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              {contactState.message ? (
                <div
                  className={cn(
                    "mt-4 flex items-center gap-3 rounded-2xl border p-4 text-sm",
                    contactState.success
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-rose-500/30 bg-rose-500/10 text-rose-400",
                  )}
                >
                  {contactState.success ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 shrink-0" />
                  )}
                  <span>{contactState.message}</span>
                </div>
              ) : null}
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
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-text-muted outline-none transition-all duration-200 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/50 hover:border-white/20";

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
        {label}
      </span>
      {multiline ? (
        <textarea
          className={cn(inputClass, "min-h-[150px] resize-none")}
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
