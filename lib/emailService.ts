/**
 * emailService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised, reusable SMTP email service for the portfolio.
 * All SMTP configuration is read exclusively from environment variables.
 * Credentials are NEVER logged, returned to the client, or exposed anywhere.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import nodemailer, { type Transporter } from "nodemailer";

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface ContactEmailPayload {
  senderName: string;
  senderEmail: string;
  company?: string;
  message: string;
}

export interface EmailResult {
  success: boolean;
  error?: string; // safe, non-sensitive description — never includes credentials
}

/* ── Config validation ─────────────────────────────────────────────────────── */

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase();
  const user = process.env.SMTP_USER?.trim();
  // Strip all whitespace — Gmail App Passwords are 16 chars; spaces are visual only
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const toEmail = process.env.CONTACT_EMAIL?.trim() || user;

  const missing: string[] = [];
  if (!host) missing.push("SMTP_HOST");
  if (!user) missing.push("SMTP_USER");
  if (!pass) missing.push("SMTP_PASS");

  if (missing.length > 0) {
    throw new Error(`SMTP misconfiguration: missing env vars — ${missing.join(", ")}`);
  }

  const port = portRaw ? parseInt(portRaw, 10) : 587;
  if (isNaN(port)) throw new Error("SMTP_PORT must be a valid number.");

  // When SMTP_SECURE is not set, derive from port (465 → true, else → false)
  const secure = secureRaw !== undefined
    ? secureRaw === "true"
    : port === 465;

  return { host, port, secure, user: user!, pass: pass!, toEmail: toEmail! };
}

/* ── Transporter factory (created fresh per request — safe for serverless) ── */

function createTransporter(): Transporter {
  const { host, port, secure, user, pass } = getSmtpConfig();

  return nodemailer.createTransport({
    host,
    port,
    secure,            // false = STARTTLS on port 587 | true = SSL on port 465
    auth: { user, pass },
    tls: {
      // Accept self-signed certs in dev; in production Gmail uses valid certs
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
    // Generous timeouts for cold-start serverless environments
    connectionTimeout: 10_000,
    greetingTimeout: 8_000,
    socketTimeout: 12_000,
  });
}

/* ── Connection verification ───────────────────────────────────────────────── */

export async function verifySmtpConnection(): Promise<EmailResult> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return { success: true };
  } catch (err) {
    // Log the technical detail server-side only — never send to client
    console.error("[emailService] SMTP verify failed:", classifyError(err));
    return { success: false, error: classifyError(err) };
  }
}

/* ── Contact form email ────────────────────────────────────────────────────── */

export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<EmailResult> {
  const { senderName, senderEmail, company, message } = payload;

  try {
    const config = getSmtpConfig();
    const transporter = createTransporter();

    // Verify before sending — fail fast with a clear message
    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${config.user}>`,
      replyTo: `"${senderName}" <${senderEmail}>`,
      to: config.toEmail,
      subject: `Portfolio inquiry from ${senderName}`,
      text: buildPlainText({ senderName, senderEmail, company, message }),
      html: buildHtml({ senderName, senderEmail, company, message }),
    });

    return { success: true };
  } catch (err) {
    const safe = classifyError(err);
    console.error("[emailService] sendContactEmail failed:", safe);
    return { success: false, error: safe };
  }
}

/* ── Error classifier — converts SMTP errors into safe, readable strings ──── */

function classifyError(err: unknown): string {
  if (!(err instanceof Error)) return "Unknown error occurred.";

  const msg = err.message;

  if (msg.includes("535") || msg.includes("Invalid login") || msg.includes("BadCredentials")) {
    return "AUTH_FAILED";
  }
  if (msg.includes("ECONNREFUSED")) return "CONNECTION_REFUSED";
  if (msg.includes("ETIMEDOUT") || msg.includes("ESOCKET")) return "CONNECTION_TIMEOUT";
  if (msg.includes("getaddrinfo") || msg.includes("ENOTFOUND")) return "DNS_RESOLUTION_FAILED";
  if (msg.includes("certificate") || msg.includes("TLS")) return "TLS_ERROR";
  if (msg.includes("EAUTH")) return "AUTH_FAILED";

  // Generic — do NOT include the raw error message (may contain paths/config)
  return "SMTP_ERROR";
}

/* ── Email body builders ───────────────────────────────────────────────────── */

function buildPlainText(p: ContactEmailPayload): string {
  return [
    "New portfolio contact form submission",
    "─────────────────────────────────────",
    `Name:    ${p.senderName}`,
    `Email:   ${p.senderEmail}`,
    `Company: ${p.company || "Not provided"}`,
    "",
    "Message:",
    p.message,
  ].join("\n");
}

function buildHtml(p: ContactEmailPayload): string {
  // Escape user-provided content to prevent HTML injection
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const name = esc(p.senderName);
  const email = esc(p.senderEmail);
  const company = esc(p.company || "Not provided");
  const msg = esc(p.message).replace(/\n/g, "<br/>");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;border-radius:12px;overflow:hidden;
               border:1px solid #e2e8f0;max-width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);
                     padding:28px 32px;">
            <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">
              📬 New Portfolio Inquiry
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:14px;border-bottom:1px solid #f1f5f9;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;
                               letter-spacing:0.1em;color:#64748b;">Name</span><br/>
                  <span style="font-size:15px;color:#0f172a;font-weight:600;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;
                               letter-spacing:0.1em;color:#64748b;">Email</span><br/>
                  <a href="mailto:${email}"
                     style="font-size:15px;color:#2563eb;font-weight:600;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;
                               letter-spacing:0.1em;color:#64748b;">Company</span><br/>
                  <span style="font-size:15px;color:#0f172a;">${company}</span>
                </td>
              </tr>
              <tr>
                <td style="padding-top:20px;">
                  <span style="font-size:11px;font-weight:700;text-transform:uppercase;
                               letter-spacing:0.1em;color:#64748b;">Message</span>
                  <div style="margin-top:10px;padding:16px;background:#f8fafc;
                              border-radius:8px;border:1px solid #e2e8f0;
                              font-size:14px;line-height:1.7;color:#1e293b;">
                    ${msg}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:18px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;
                     font-size:11px;color:#94a3b8;text-align:center;">
            Sent via awaismustafa.dev portfolio contact form
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
