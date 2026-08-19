/**
 * app/api/contact/route.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Portfolio contact form API endpoint.
 *
 * Security measures applied:
 *   • Server-side validation (name, email, message are required)
 *   • Input length caps (prevent oversized payloads)
 *   • Header-injection prevention (newlines stripped from all fields)
 *   • IP-based rate limiting (configurable via env vars)
 *   • All SMTP credentials stay server-side — never returned to client
 *   • Raw errors never exposed to the client
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/emailService";
import { checkRateLimit } from "@/lib/rateLimiter";

/* ── Response helpers ──────────────────────────────────────────────────────── */

const ok = (message: string) =>
  NextResponse.json({ success: true, message }, { status: 200 });

const err = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

/* ── Sanitization helpers ──────────────────────────────────────────────────── */

/** Strip CR/LF to prevent email header injection */
const stripNewlines = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

/** Basic email format check */
const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/* ── POST handler ──────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest): Promise<NextResponse> {
  /* 1 ── Rate limiting ──────────────────────────────────────────────────── */
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    const retryMinutes = Math.ceil((rate.retryAfterMs ?? 900_000) / 60_000);
    return err(
      `Too many requests. Please wait ${retryMinutes} minute${retryMinutes !== 1 ? "s" : ""} before trying again.`,
      429,
    );
  }

  /* 2 ── Parse body ─────────────────────────────────────────────────────── */
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return err("Invalid request body.", 400);
  }

  /* 3 ── Extract & coerce fields ────────────────────────────────────────── */
  const rawName    = typeof body.name    === "string" ? body.name    : "";
  const rawEmail   = typeof body.email   === "string" ? body.email   : "";
  const rawCompany = typeof body.company === "string" ? body.company : "";
  const rawMessage = typeof body.message === "string" ? body.message : "";

  /* 4 ── Sanitize (strip header-injection characters) ───────────────────── */
  const name    = stripNewlines(rawName).slice(0, 120);
  const email   = stripNewlines(rawEmail).slice(0, 254);
  const company = stripNewlines(rawCompany).slice(0, 120);
  const message = rawMessage.replace(/[\r]/g, "").trim().slice(0, 5_000);

  /* 5 ── Server-side validation ─────────────────────────────────────────── */
  if (!name)    return err("Name is required.");
  if (name.length < 2) return err("Name must be at least 2 characters.");

  if (!email)            return err("Email address is required.");
  if (!isValidEmail(email)) return err("Please provide a valid email address.");

  if (!message)          return err("Message is required.");
  if (message.length < 10) return err("Message must be at least 10 characters.");

  /* 6 ── Send via SMTP service ──────────────────────────────────────────── */
  const result = await sendContactEmail({
    senderName:  name,
    senderEmail: email,
    company:     company || undefined,
    message,
  });

  /* 7 ── Respond safely ─────────────────────────────────────────────────── */
  if (result.success) {
    return ok("Thanks for reaching out! I'll get back to you within 24 hours.");
  }

  // Map internal error codes to safe user-facing messages
  const userMessage = (() => {
    switch (result.error) {
      case "AUTH_FAILED":
        return "Email service authentication failed. Please try contacting me directly at awaismustafavhr@gmail.com";
      case "CONNECTION_REFUSED":
      case "CONNECTION_TIMEOUT":
      case "DNS_RESOLUTION_FAILED":
        return "Unable to reach the email server right now. Please try again in a few minutes.";
      case "TLS_ERROR":
        return "Secure connection to the mail server failed. Please try again later.";
      default:
        return "Unable to send your message right now. Please try again or contact me directly.";
    }
  })();

  return err(userMessage, 500);
}
