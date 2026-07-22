"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Loader2, Send } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { contactDetails } from "@/data/site";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [contactState, setContactState] = useState<{
    loading: boolean;
    message: string;
    success: boolean;
  }>({ loading: false, message: "", success: false });

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

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

      event.currentTarget.reset();
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
          subtitle="Tell me about your next product, redesign, or engineering challenge."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="space-y-5">
            <div className="glass-panel p-8 border border-white/10 rounded-3xl">
              <h3 className="font-heading text-3xl font-semibold text-white">
                Ready to create something memorable
              </h3>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                I partner with founders, teams, and ambitious brands to craft
                premium digital products that look refined, perform fast, and
                scale with confidence.
              </p>
            </div>
            {contactDetails.map((detail) => (
              <a
                key={detail.label}
                className="glass-panel glass-hover flex items-center justify-between gap-4 p-5 border border-white/10 rounded-2xl interactive-press"
                href={detail.href}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-white font-medium">{detail.value}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-accent-cyan shrink-0" />
              </a>
            ))}
          </div>

          <form className="glass-panel p-8 border border-white/10 rounded-3xl" onSubmit={handleContactSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Name" name="name" placeholder="Your name" />
              <FormField
                label="Email"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
            </div>
            <div className="mt-5">
              <FormField
                label="Company"
                name="company"
                placeholder="Company or brand"
              />
            </div>
            <div className="mt-5">
              <FormField
                label="Message"
                multiline
                name="message"
                placeholder="Tell me about your project, timeline, and goals."
              />
            </div>

            <button
              className="accent-gradient glow-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-medium text-white transition duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              disabled={contactState.loading}
              type="submit"
            >
              {contactState.loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
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
                  "mt-4 p-4 rounded-xl text-sm border flex items-center gap-2",
                  contactState.success
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400",
                )}
              >
                <span>{contactState.message}</span>
              </div>
            ) : null}
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
  const className =
    "glass-panel w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan";

  return (
    <label className="block">
      <span className="mb-2 block text-sm text-text-secondary">{label}</span>
      {multiline ? (
        <textarea
          className={cn(className, "min-h-[160px] resize-none")}
          name={name}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          className={className}
          name={name}
          placeholder={placeholder}
          required
          type={type}
        />
      )}
    </label>
  );
}
