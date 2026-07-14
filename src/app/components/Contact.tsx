import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, MessageSquare, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { FadeIn } from "./shared/FadeIn";
import { SectionHeader } from "./shared/SectionHeader";
import { SOCIAL_LINKS } from "../data/portfolioData";
import { GithubIcon, LinkedInIcon, InstagramIcon, XIcon } from "../../assets/icons/SocialIcons";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-a85c355c`;
const CHAR_LIMIT = 2000;
const COOLDOWN_MS = 60_000; // mirror server cooldown for UX

function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case "github": return <GithubIcon className="w-4 h-4" />;
    case "linkedin": return <LinkedInIcon className="w-4 h-4" />;
    case "instagram": return <InstagramIcon className="w-4 h-4" />;
    case "twitter": return <XIcon className="w-4 h-4" />;
    case "email": return <Mail className="w-4 h-4" />;
    default: return null;
  }
}

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldownSec, setCooldownSec] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = () => {
    setCooldownSec(60);
    cooldownRef.current = setInterval(() => {
      setCooldownSec(prev => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || cooldownSec > 0) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ name, email, message, _honeypot: honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        // Start cooldown on rate-limit errors
        if (res.status === 429) startCooldown();
        return;
      }

      setStatus("success");
      setName(""); setEmail(""); setMessage(""); setHoneypot("");
      startCooldown();

      // Return to idle (with cooldown still running) after 6s
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please check your connection and try again.");
    }
  };

  const charColor =
    message.length > CHAR_LIMIT * 0.95 ? "text-[#e74c3c]" :
      message.length > CHAR_LIMIT * 0.8 ? "text-[#e67e22]" :
        "text-[#555570]";

  const isDisabled = status === "loading" || cooldownSec > 0;

  return (
    <section
      id="contact"
      className="relative h-screen flex flex-col overflow-hidden bg-[#0a0a14] pt-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(192,57,43,0.08),transparent)] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 py-6">
        <FadeIn>
          <SectionHeader number="05" title="Contact" />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ── Left: Info + Socials ─────────────────────────────────────── */}
          <FadeIn delay={0.1} direction="left">
            <div className="space-y-5">
              <div>
                <h2
                  className="text-white"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "1.75rem" }}
                >
                  Let's{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #e74c3c, #9b59b6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Connect
                  </span>
                </h2>
                <div className="flex items-center gap-2 mt-2 text-[#8888a8]">
                  <MapPin className="w-3.5 h-3.5 text-[#c0392b] shrink-0" />
                  <span className="text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Kolkata, West Bengal, India
                  </span>
                </div>
              </div>

              <div>
                <p
                  className="text-[#c0392b] text-xs uppercase tracking-wider mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Find me on
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {SOCIAL_LINKS.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      whileHover={{ x: 4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${item.bg} ${item.border} ${item.hover} transition-colors duration-200 group`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ color: item.color }}
                      >
                        <SocialIcon type={item.type} />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-[#8888a8] text-xs"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-white text-xs truncate group-hover:text-[#e74c3c] transition-colors duration-200"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.handle}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080810] border border-white/5">
                <p
                  className="text-[#8888a8] text-xs"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span className="text-[#c0392b]">$</span>{" "}
                  echo "I respond faster than O(log n). Drop a message!"
                  <br />
                  <span className="text-[#2ecc71] ml-4">→ Response guaranteed ✓</span>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── Right: Form ───────────────────────────────────────────────── */}
          <FadeIn delay={0.2} direction="right">
            <div className="p-6 rounded-2xl border border-white/5 bg-[#080810] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c0392b]/3 to-transparent pointer-events-none rounded-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4 text-[#c0392b]" />
                  <h3
                    className="text-white text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Send a Message
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  {/* ── Success ── */}
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#2ecc71]/10 border border-[#2ecc71]/20 flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-6 h-6 text-[#2ecc71]" />
                      </div>
                      <p className="text-white text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
                        Message Delivered!
                      </p>
                      <p
                        className="text-[#8888a8] text-xs mt-1"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        The ritual was completed. I'll get back to you soon.
                      </p>
                      {cooldownSec > 0 && (
                        <p
                          className="text-[#555570] text-xs mt-3"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          Next message available in{" "}
                          <span className="text-[#c0392b]">{cooldownSec}s</span>
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    /* ── Form ── */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-3.5"
                      noValidate
                    >
                      {/* Honeypot — invisible to humans */}
                      <input
                        type="text"
                        name="_honeypot"
                        value={honeypot}
                        onChange={e => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        aria-hidden="true"
                        autoComplete="off"
                        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                      />

                      {/* Error banner */}
                      <AnimatePresence>
                        {status === "error" && errorMsg && (
                          <motion.div
                            key="err"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="flex items-start gap-2.5 p-3 rounded-lg bg-[#c0392b]/10 border border-[#c0392b]/30"
                          >
                            <AlertCircle className="w-4 h-4 text-[#e74c3c] shrink-0 mt-0.5" />
                            <p
                              className="text-[#e74c3c] text-xs"
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              {errorMsg}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Name */}
                      <div>
                        <label
                          className="text-[#8888a8] text-xs uppercase tracking-wider block mb-1.5"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Enter your name"
                          maxLength={100}
                          disabled={isDisabled}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a14] border border-white/10 text-white placeholder-[#555570] focus:outline-none focus:border-[#c0392b]/50 transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          className="text-[#8888a8] text-xs uppercase tracking-wider block mb-1.5"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          disabled={isDisabled}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a14] border border-white/10 text-white placeholder-[#555570] focus:outline-none focus:border-[#c0392b]/50 transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label
                            className="text-[#8888a8] text-xs uppercase tracking-wider"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            Message
                          </label>
                          <span
                            className={`text-xs tabular-nums transition-colors duration-200 ${charColor}`}
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {message.length}/{CHAR_LIMIT}
                          </span>
                        </div>
                        <textarea
                          required
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="Your message, collab idea, or just a hello..."
                          rows={4}
                          maxLength={CHAR_LIMIT}
                          disabled={isDisabled}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a14] border border-white/10 text-white placeholder-[#555570] focus:outline-none focus:border-[#c0392b]/50 transition-colors duration-200 resize-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isDisabled}
                        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#c0392b] to-[#922b21] text-white hover:from-[#e74c3c] hover:to-[#c0392b] transition-all duration-300 shadow-lg shadow-[#c0392b]/20 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Casting the spell...
                          </>
                        ) : cooldownSec > 0 ? (
                          <>
                            <span className="text-xs opacity-80">Cooldown</span>
                            <span
                              className="tabular-nums"
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                              {cooldownSec}s
                            </span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-[#555570] text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2025 Debarpan Roy · Built with React & dark magic
          </p>
          <p
            className="text-[#555570] text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="text-[#c0392b]">DRoy-007</span> · <a href="https://www.nit.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#c0392b] transition-colors duration-200 underline underline-offset-2">Narula Institute of Technology</a>
          </p>
        </div>
      </div>
    </section>
  );
}
