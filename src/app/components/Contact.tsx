import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { FadeIn } from "./shared/FadeIn";
import { SectionHeader } from "./shared/SectionHeader";
import { SOCIAL_LINKS } from "../data/portfolioData";
import { GithubIcon, LinkedInIcon, InstagramIcon, XIcon } from "../../assets/icons/SocialIcons";

// Map type → icon component
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

// ─── Contact Section ──────────────────────────────────────────────────────────
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative h-screen flex flex-col overflow-hidden bg-[#0a0a14] pt-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(192,57,43,0.08),transparent)] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 py-6">
        {/* Header */}
        <FadeIn>
          <SectionHeader number="05" title="Contact" />
        </FadeIn>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Info + Socials */}
          <FadeIn delay={0.1} direction="left">
            <div className="space-y-5">
              {/* Heading */}
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

              {/* Social links — 2-column grid */}
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

              {/* Quick response note */}
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

          {/* Right: Contact form */}
          <FadeIn delay={0.2} direction="right">
            <div className="p-6 rounded-2xl border border-white/5 bg-[#080810] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c0392b]/3 to-transparent pointer-events-none rounded-2xl" />
              <div className="relative">
                {/* Form header */}
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4 text-[#c0392b]" />
                  <h3
                    className="text-white text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Send a Message
                  </h3>
                </div>

                {/* Success state */}
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#2ecc71]/10 border border-[#2ecc71]/20 flex items-center justify-center mb-3">
                      <Send className="w-5 h-5 text-[#2ecc71]" />
                    </div>
                    <p className="text-white text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
                      Message Sent!
                    </p>
                    <p
                      className="text-[#8888a8] text-xs mt-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      The ritual was completed successfully.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
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
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a14] border border-white/10 text-white placeholder-[#555570] focus:outline-none focus:border-[#c0392b]/50 transition-colors duration-200 text-sm"
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
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a14] border border-white/10 text-white placeholder-[#555570] focus:outline-none focus:border-[#c0392b]/50 transition-colors duration-200 text-sm"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className="text-[#8888a8] text-xs uppercase tracking-wider block mb-1.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        Message
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Your message, collab idea, or just a hello..."
                        rows={4}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a14] border border-white/10 text-white placeholder-[#555570] focus:outline-none focus:border-[#c0392b]/50 transition-colors duration-200 resize-none text-sm"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#c0392b] to-[#922b21] text-white hover:from-[#e74c3c] hover:to-[#c0392b] transition-all duration-300 shadow-lg shadow-[#c0392b]/20 text-sm"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Footer strip */}
      <div className="relative z-10 border-t border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-[#555570] text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2026 Debarpan Roy · Built with React, Typescript & Tailwind CSS.
          </p>
          <p
            className="text-[#555570] text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="text-[#c0392b]">DRoy-007</span> · Narula Institute of Technology
          </p>
        </div>
      </div>
    </section>
  );
}
