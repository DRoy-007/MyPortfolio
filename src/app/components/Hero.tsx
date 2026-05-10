import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Code2, GitBranch } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { HERO } from "../data/portfolioData";

// ─── Typewriter ───────────────────────────────────────────────────────────────
function TypewriterText({ texts }: { texts: readonly string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];

    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayed(currentText.substring(0, displayed.length - 1));

        if (displayed.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(currentText.substring(0, displayed.length + 1));

        if (displayed === currentText) {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentIndex, texts]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-[#c0392b]">|</span>
    </span>
  );
}

// ─── Floating particles (memoised positions) ─────────────────────────────────
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
  size: Math.random() > 0.5 ? "w-1 h-1" : "w-0.5 h-0.5",
}));

function Particle({ x, y, delay, size }: { x: number; y: number; delay: number; size: string }) {
  return (
    <motion.div
      className={`absolute rounded-full bg-[#c0392b]/40 ${size}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ y: [0, -28, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
      transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function Hero() {
  const scrollToAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080810] pt-16"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(192,57,43,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(192,57,43,0.3) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(192,57,43,0.12),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(108,52,131,0.1),transparent)] pointer-events-none" />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} size={p.size} />
      ))}

      {/* Corner decorations */}
      <div className="absolute top-20 left-8 w-12 h-12 border-t-2 border-l-2 border-[#c0392b]/25 pointer-events-none" />
      <div className="absolute top-20 right-8 w-12 h-12 border-t-2 border-r-2 border-[#c0392b]/25 pointer-events-none" />
      <div className="absolute bottom-16 left-8 w-12 h-12 border-b-2 border-l-2 border-[#c0392b]/25 pointer-events-none" />
      <div className="absolute bottom-16 right-8 w-12 h-12 border-b-2 border-r-2 border-[#c0392b]/25 pointer-events-none" />

      {/* ── Main Content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-5">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c0392b]/30 bg-[#c0392b]/10"
        >
          <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse" />
          <span
            className="text-[#8888a8] text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col items-center leading-none"
        >
          <h1
            className="text-white"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.8rem, 9vw, 6.5rem)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textShadow: "0 0 40px rgba(192,57,43,0.3)",
              lineHeight: 1,
            }}
          >
            {HERO.firstName}
          </h1>
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.8rem, 9vw, 6.5rem)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              lineHeight: 1,
              background: "linear-gradient(135deg, #e74c3c, #9b59b6, #c0392b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {HERO.lastName}
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="text-[#8888a8]"
        >
          <span className="text-[#c0392b]">$ </span>
          <span className="text-[#a8a8c8]">whoami</span>
          <span className="text-[#8888a8]"> → </span>
          <span className="text-white">
            <TypewriterText texts={HERO.roles} />
          </span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-[#8888a8] max-w-xl leading-relaxed text-sm"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          A passionate first-year CSE student at{" "}
          <span className="text-[#e74c3c]">Narula Institute of Technology</span>,
          building terminal-based dark fantasy games, exploring DSA, and crafting
          experiences where{" "}
          <span className="text-[#9b59b6]">code meets creativity</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded bg-gradient-to-r from-[#c0392b] to-[#922b21] text-white hover:from-[#e74c3c] hover:to-[#c0392b] transition-all duration-300 shadow-lg shadow-[#c0392b]/20 text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Code2 className="w-4 h-4" />
            View Projects
          </button>

          <a
            href={HERO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded border border-[#8888a8]/30 text-[#8888a8] hover:border-white/50 hover:text-white transition-all duration-300 text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="flex items-center justify-center gap-6 flex-wrap mt-2"
        >
          {[
            { icon: <GitBranch className="w-3.5 h-3.5" />, label: "Public Repos", value: "10+" },
            { icon: <Code2 className="w-3.5 h-3.5" />, label: "GitHub", value: "DRoy-007" },
            { icon: <Code2 className="w-3.5 h-3.5" />, label: "Major", value: "CSE" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-0.5 px-5 py-2.5 rounded-lg border border-white/5 bg-white/3"
            >
              <div className="flex items-center gap-1.5 text-[#c0392b]">
                {stat.icon}
                <span
                  className="text-white"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem" }}
                >
                  {stat.value}
                </span>
              </div>
              <span
                className="text-[#8888a8] text-xs uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{ delay: 1.4, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#8888a8] hover:text-[#e74c3c] transition-colors cursor-pointer z-10"
        aria-label="Scroll to About"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
}
