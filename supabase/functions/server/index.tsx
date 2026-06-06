import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-a85c355c/health", (c) => {
  return c.json({ status: "ok" });
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const now = () => Date.now();
const hourAgo = () => now() - 60 * 60 * 1000;
const dayAgo = () => now() - 24 * 60 * 60 * 1000;

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

/** Fetch a JSON array from KV, filter by predicate, and write it back. Returns the filtered array. */
async function refreshList(key: string, keepFn: (ts: number) => boolean): Promise<number[]> {
  const raw = await kv.get(key);
  const list: number[] = raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : [];
  const fresh = list.filter(keepFn);
  await kv.set(key, fresh);
  return fresh;
}

// ─── Spam Scoring ─────────────────────────────────────────────────────────────

const SPAM_KEYWORDS = [
  "casino", "lottery", "winner", "prize", "click here", "buy now",
  "free money", "earn money", "make money", "crypto", "bitcoin",
  "investment opportunity", "million dollars", "100% free",
  "seo", "backlinks", "followers", "instagram followers",
  "whatsapp", "telegram group", "onlyfans", "adult",
];

function spamScore(name: string, email: string, message: string): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  const lowerMsg = message.toLowerCase();

  // URL count
  const urlMatches = (message.match(/https?:\/\/[^\s]+/gi) || []).length;
  if (urlMatches >= 3) { score += 30; reasons.push(`${urlMatches} URLs detected`); }
  else if (urlMatches === 2) { score += 15; reasons.push("2 URLs detected"); }
  else if (urlMatches === 1) { score += 5; }

  // Spam keywords
  const hitKeywords = SPAM_KEYWORDS.filter(kw => lowerMsg.includes(kw));
  if (hitKeywords.length > 0) {
    score += hitKeywords.length * 20;
    reasons.push(`Spam keywords: ${hitKeywords.slice(0, 3).join(", ")}`);
  }

  // ALL CAPS ratio
  const letters = message.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 10) {
    const capsRatio = (message.replace(/[^A-Z]/g, "").length) / letters.length;
    if (capsRatio > 0.7) { score += 25; reasons.push(`${Math.round(capsRatio * 100)}% uppercase`); }
  }

  // Repeated characters (aaaaaa)
  if (/(.)\1{5,}/.test(message)) { score += 20; reasons.push("Repeated characters"); }

  // Disposable email domains
  const disposableDomains = ["mailinator.com", "guerrillamail.com", "tempmail.com", "10minutemail.com", "throwam.com", "yopmail.com", "sharklasers.com", "trashmail.com"];
  const emailDomain = email.split("@")[1]?.toLowerCase();
  if (emailDomain && disposableDomains.includes(emailDomain)) {
    score += 50; reasons.push("Disposable email domain");
  }

  // Very short message (just probing)
  if (message.trim().length < 20) { score += 10; reasons.push("Very short message"); }

  // Name looks like a bot
  if (/^[a-z]{1,4}\d{3,}$/i.test(name.trim())) { score += 25; reasons.push("Bot-like name pattern"); }

  return { score, reasons };
}

// ─── Contact Endpoint ─────────────────────────────────────────────────────────

app.post("/make-server-a85c355c/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message, _honeypot } = body;

    // ── Honeypot ──────────────────────────────────────────────────────────
    if (_honeypot && _honeypot.trim() !== "") {
      return c.json({ success: true }); // Silent accept to fool bots
    }

    // ── Input validation ──────────────────────────────────────────────────
    if (!name || !email || !message) {
      return c.json({ error: "All fields are required." }, 400);
    }
    const trimName = name.trim();
    const trimEmail = email.trim().toLowerCase();
    const trimMsg = message.trim();

    if (trimName.length < 2 || trimName.length > 100) {
      return c.json({ error: "Name must be between 2 and 100 characters." }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimEmail)) {
      return c.json({ error: "Please provide a valid email address." }, 400);
    }
    if (trimMsg.length < 10) {
      return c.json({ error: "Message must be at least 10 characters long." }, 400);
    }
    if (trimMsg.length > 2000) {
      return c.json({ error: "Message must not exceed 2000 characters." }, 400);
    }

    const ts = now();
    const ip = c.req.header("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // ── Spam scoring ──────────────────────────────────────────────────────
    const spam = spamScore(trimName, trimEmail, trimMsg);
    // Hard block if score >= 70
    if (spam.score >= 70) {
      console.log(`Spam blocked [score=${spam.score}] from IP=${ip} email=${trimEmail}: ${spam.reasons.join("; ")}`);
      return c.json({ error: "Your message was flagged as spam. If this is a mistake, please email me directly." }, 422);
    }

    // ── Cooldown: 60s between submissions from same IP ─────────────────────
    const cooldownKey = `contact:cooldown:${ip}`;
    const lastSubmit = await kv.get(cooldownKey);
    if (lastSubmit) {
      const lastTs = typeof lastSubmit === "number" ? lastSubmit : parseInt(lastSubmit as string, 10);
      const elapsed = ts - lastTs;
      if (elapsed < 60_000) {
        const wait = Math.ceil((60_000 - elapsed) / 1000);
        return c.json({ error: `Please wait ${wait} second(s) before sending another message.` }, 429);
      }
    }

    // ── Rate limit by IP: 3/hour, 8/day ──────────────────────────────────
    const ipHourKey = `contact:ratelimit:ip:hour:${ip}`;
    const ipDayKey = `contact:ratelimit:ip:day:${ip}`;

    const ipHourList = await refreshList(ipHourKey, t => t > hourAgo());
    const ipDayList = await refreshList(ipDayKey, t => t > dayAgo());

    if (ipHourList.length >= 3) {
      const resetMins = Math.ceil((Math.min(...ipHourList) + 3_600_000 - ts) / 60_000);
      return c.json({ error: `Hourly limit reached (3/hr). Please try again in ${resetMins} minute(s).` }, 429);
    }
    if (ipDayList.length >= 8) {
      return c.json({ error: "Daily message limit reached from your network. Please try again tomorrow." }, 429);
    }

    // ── Rate limit by email: 2/day ────────────────────────────────────────
    const emailDayKey = `contact:ratelimit:email:${await sha256(trimEmail)}`;
    const emailDayList = await refreshList(emailDayKey, t => t > dayAgo());
    if (emailDayList.length >= 2) {
      return c.json({ error: "This email has already sent messages today. Please try again tomorrow." }, 429);
    }

    // ── Global daily cap: 30 messages/day (abuse guard) ───────────────────
    const globalDayKey = `contact:global:day:${new Date(ts).toISOString().slice(0, 10)}`;
    const globalDayList = await refreshList(globalDayKey, t => t > dayAgo());
    if (globalDayList.length >= 30) {
      return c.json({ error: "Daily message capacity reached. Please try again tomorrow or email me directly." }, 429);
    }

    // ── Duplicate content detection: same message within 24h ──────────────
    const contentFingerprint = `${trimEmail}:${trimMsg.toLowerCase().slice(0, 200)}`;
    const contentHash = await sha256(contentFingerprint);
    const dupKey = `contact:dedup:${contentHash}`;
    const dupExists = await kv.get(dupKey);
    if (dupExists) {
      return c.json({ error: "This exact message was already received. Please wait 24 hours before resending." }, 429);
    }

    // ── All checks passed — persist message ───────────────────────────────
    const msgId = crypto.randomUUID();
    const msgKey = `contact:msg:${ts}:${msgId}`;

    await Promise.all([
      // Store message
      kv.set(msgKey, {
        id: msgId,
        name: trimName,
        email: trimEmail,
        message: trimMsg,
        ip,
        spamScore: spam.score,
        spamReasons: spam.reasons,
        receivedAt: new Date(ts).toISOString(),
      }),
      // Update rate limit lists
      kv.set(cooldownKey, ts),
      kv.set(ipHourKey, [...ipHourList, ts]),
      kv.set(ipDayKey, [...ipDayList, ts]),
      kv.set(emailDayKey, [...emailDayList, ts]),
      kv.set(globalDayKey, [...globalDayList, ts]),
      // Store content fingerprint (24h dedup)
      kv.set(dupKey, { blockedUntil: ts + 86_400_000 }),
    ]);

    // ── Send email alert via Resend ────────────────────────────────────────
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    let emailStatus = "skipped";

    if (resendApiKey) {
      const spamBadge = spam.score >= 40
        ? `<span style="background:#c0392b;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;">⚠ Spam score: ${spam.score}</span>`
        : spam.score >= 20
        ? `<span style="background:#e67e22;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;">Spam score: ${spam.score}</span>`
        : `<span style="background:#27ae60;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;">Clean · score: ${spam.score}</span>`;

      const emailBody = `
        <div style="font-family:'Segoe UI',sans-serif;background:#0a0a14;color:#e0e0e0;padding:28px;border-radius:10px;border:1px solid #c0392b44;max-width:600px;margin:0 auto;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
            <h2 style="color:#c0392b;margin:0;font-size:18px;letter-spacing:1px;">📬 New Portfolio Message</h2>
            ${spamBadge}
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr style="border-bottom:1px solid #ffffff10;">
              <td style="color:#8888a8;padding:8px 0;width:110px;font-size:13px;">From</td>
              <td style="color:#fff;padding:8px 0;font-size:13px;">${trimName.replace(/</g,"&lt;")}</td>
            </tr>
            <tr style="border-bottom:1px solid #ffffff10;">
              <td style="color:#8888a8;padding:8px 0;font-size:13px;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${trimEmail}" style="color:#e74c3c;font-size:13px;">${trimEmail}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #ffffff10;">
              <td style="color:#8888a8;padding:8px 0;font-size:13px;">Received</td>
              <td style="color:#fff;padding:8px 0;font-size:13px;">${new Date(ts).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})} IST</td>
            </tr>
            <tr style="border-bottom:1px solid #ffffff10;">
              <td style="color:#8888a8;padding:8px 0;font-size:13px;">IP</td>
              <td style="color:#555570;padding:8px 0;font-size:12px;font-family:monospace;">${ip}</td>
            </tr>
            <tr style="border-bottom:1px solid #ffffff10;">
              <td style="color:#8888a8;padding:8px 0;font-size:13px;">Msg ID</td>
              <td style="color:#555570;padding:8px 0;font-size:11px;font-family:monospace;">${msgId}</td>
            </tr>
            ${spam.reasons.length > 0 ? `
            <tr>
              <td style="color:#8888a8;padding:8px 0;font-size:13px;">Flags</td>
              <td style="color:#e67e22;padding:8px 0;font-size:12px;">${spam.reasons.join(" · ")}</td>
            </tr>` : ""}
          </table>

          <p style="color:#8888a8;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Message</p>
          <div style="background:#080810;border:1px solid #ffffff10;border-radius:8px;padding:16px;color:#e0e0e0;white-space:pre-wrap;word-break:break-word;font-size:14px;line-height:1.6;">${trimMsg.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>

          <div style="margin-top:20px;display:flex;gap:12px;">
            <a href="mailto:${trimEmail}?subject=Re: Your message on my portfolio" style="display:inline-block;background:linear-gradient(135deg,#c0392b,#922b21);color:#fff;padding:8px 18px;border-radius:6px;text-decoration:none;font-size:13px;">Reply →</a>
          </div>

          <p style="color:#333355;font-size:11px;margin:20px 0 0;border-top:1px solid #ffffff08;padding-top:12px;">Sent via DRoy-007 Portfolio · Narula Institute of Technology</p>
        </div>
      `;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Portfolio <onboarding@resend.dev>",
          to: ["roydebarpan07@gmail.com"],
          reply_to: trimEmail,
          subject: `[Portfolio] ${trimName} sent you a message`,
          html: emailBody,
        }),
      });

      emailStatus = res.ok ? "sent" : `failed:${await res.text()}`;
      if (!res.ok) console.log(`Resend error: ${emailStatus}`);
    }

    console.log(`Contact stored msgId=${msgId} spamScore=${spam.score} emailStatus=${emailStatus}`);
    return c.json({ success: true, id: msgId });

  } catch (err) {
    console.log(`Contact endpoint error: ${err}`);
    return c.json({ error: "An unexpected error occurred. Please try again later." }, 500);
  }
});

Deno.serve(app.fetch);
