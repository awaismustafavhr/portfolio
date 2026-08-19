/**
 * rateLimiter.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Lightweight in-process IP-based rate limiter for Next.js API routes.
 * Uses a Map stored in the module scope (persists across requests within the
 * same serverless instance; auto-resets on cold starts).
 *
 * Configuration is driven by env vars with safe fallbacks:
 *   RATE_LIMIT_MAX         — max requests per window  (default: 5)
 *   RATE_LIMIT_WINDOW_MS   — window in milliseconds   (default: 900000 = 15min)
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface RateEntry {
  count: number;
  resetAt: number; // epoch ms
}

const store = new Map<string, RateEntry>();

function getConfig() {
  const max = parseInt(process.env.RATE_LIMIT_MAX ?? "5", 10);
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "900000", 10);
  return {
    max: isNaN(max) ? 5 : max,
    windowMs: isNaN(windowMs) ? 900_000 : windowMs,
  };
}

/**
 * Check whether a given identifier (IP address or similar) has exceeded the
 * rate limit.
 *
 * @returns `{ allowed: true }` when under the limit.
 * @returns `{ allowed: false, retryAfterMs: number }` when rate limited.
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean;
  retryAfterMs?: number;
} {
  const { max, windowMs } = getConfig();
  const now = Date.now();

  let entry = store.get(identifier);

  // First visit or window expired → create / reset
  if (!entry || now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(identifier, entry);
    return { allowed: true };
  }

  // Within the window
  if (entry.count < max) {
    entry.count += 1;
    return { allowed: true };
  }

  // Limit exceeded
  return { allowed: false, retryAfterMs: entry.resetAt - now };
}

/**
 * Periodically purge expired entries to prevent unbounded memory growth.
 * Call this once, e.g. inside a module-scope setInterval.
 */
export function purgeExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now >= entry.resetAt) store.delete(key);
  }
}

// Auto-purge every 30 minutes
if (typeof setInterval !== "undefined") {
  setInterval(purgeExpiredEntries, 30 * 60 * 1000);
}
