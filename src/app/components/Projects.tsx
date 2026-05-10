import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Skull, Swords, Flame, Star, BookOpen, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FadeIn } from "./shared/FadeIn";
import { SectionHeader } from "./shared/SectionHeader";
import { FEATURED_PROJECT, OTHER_PROJECTS } from "../data/portfolioData";

// ─── Animated entrance for project cards ─────────────────────────────────────
function CardFadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const FEATURE_ICONS = [
  <Terminal className="w-3.5 h-3.5" />,
  <Skull className="w-3.5 h-3.5" />,
  <Swords className="w-3.5 h-3.5" />,
  <Flame className="w-3.5 h-3.5" />,
  <Star className="w-3.5 h-3.5" />,
  <BookOpen className="w-3.5 h-3.5" />,
];

const RITUAL_MENUS = [
  { text: "Begin the Ritual", color: "text-[#e74c3c]" },
  { text: "Reignite the Curse", color: "text-[#9b59b6]" },
  { text: "Escape the Fate", color: "text-[#8888a8]" },
];

const STATUS_STYLES = {
  Live: "bg-[#2ecc71]/10 text-[#2ecc71] border border-[#2ecc71]/20",
  Active: "bg-[#f39c12]/10 text-[#f39c12] border border-[#f39c12]/20",
  Public: "bg-[#8888a8]/10 text-[#8888a8] border border-[#8888a8]/20",
};

// ─── Projects Section ─────────────────────────────────────────────────────────
export function Projects() {
  return (
    <section id="projects" className="bg-[#0a0a14]">
      {/* ── SCREEN 1: Section header + featured project (fits in viewport) ── */}
      <div className="relative h-screen flex flex-col overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(192,57,43,0.05),transparent)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#c0392b]/5 pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-5 overflow-hidden">
          {/* Header */}
          <FadeIn>
            <SectionHeader number="03" title="Projects" />
          </FadeIn>

          {/* Featured project card — fills remaining height */}
          <FadeIn delay={0.1} className="flex-1 min-h-0">
            <div className="relative h-full rounded-2xl overflow-hidden border border-[#c0392b]/20 bg-[#080810] shadow-2xl shadow-[#c0392b]/5">
              {/* Gradient border glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-[#c0392b]/15 via-transparent to-[#6c3483]/15 rounded-2xl pointer-events-none" />

              <div className="relative grid lg:grid-cols-2 gap-0 h-full">
                {/* ── Left: Terminal mockup ── */}
                <div className="p-5 lg:p-7 flex flex-col gap-4 overflow-hidden">
                  {/* Terminal window */}
                  <div className="rounded-lg bg-[#0a0a14] border border-white/10 overflow-hidden flex-shrink-0">
                    {/* Title bar */}
                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#111120] border-b border-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#e74c3c]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f39c12]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2ecc71]" />
                      <span
                        className="ml-2 text-[#8888a8] text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        hangman_ritual.c — DRoy-007
                      </span>
                    </div>

                    {/* Terminal content */}
                    <div className="p-4 space-y-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <p className="text-[#8888a8] text-xs">
                        <span className="text-[#c0392b]">$</span>{" "}
                        <span className="text-white">./hangman</span>
                      </p>
                      <pre className="text-[#c0392b] text-xs leading-tight opacity-90">{`  ████████
 ██      ██
 ██  ██  ██
 ██      ██
  ████████
      |
   ═══════`}</pre>
                      <p className="text-[#6c3483] text-xs">═══ THE CURSED RITUAL ═══</p>
                      {RITUAL_MENUS.map((item, i) => (
                        <p key={i} className={`text-xs ${item.color}`}>
                          [{i + 1}] {item.text}
                        </p>
                      ))}
                      <p className="text-[#8888a8] text-xs">
                        <span className="text-[#2ecc71]">→</span> Choose your fate:{" "}
                        <span className="animate-pulse text-[#c0392b]">_</span>
                      </p>
                    </div>
                  </div>

                  {/* Code snippet */}
                  <div className="rounded-lg bg-[#0f0f1a] border border-white/5 p-3.5 flex-shrink-0">
                    <p className="text-xs mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <span className="text-[#6c3483]">// </span>
                      <span className="text-[#5dade2]">C</span>{" · "}
                      <span className="text-[#5dade2]">Cross-platform</span>{" · "}
                      <span className="text-[#5dade2]">Terminal</span>
                    </p>
                    <p className="text-[#2ecc71] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {`void animate_blood_drop(int wrong) {`}
                    </p>
                    <p className="text-[#8888a8] text-xs ml-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {`for(int i=0; i<wrong; i++)`}
                    </p>
                    <p className="text-[#8888a8] text-xs ml-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {`printf("\\033[31m▓\\033[0m");`}
                    </p>
                    <p className="text-[#2ecc71] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {`}`}
                    </p>
                  </div>
                </div>

                {/* ── Right: Project details ── */}
                <div className="p-5 lg:p-7 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col justify-center">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c0392b]/30 bg-[#c0392b]/10 mb-4 w-fit">
                    <Skull className="w-3 h-3 text-[#c0392b]" />
                    <span
                      className="text-[#c0392b] text-xs uppercase tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Featured Project
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white" style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem" }}>
                    {FEATURED_PROJECT.title.split(" ")[0]} {FEATURED_PROJECT.title.split(" ")[1]}
                  </h3>
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1.5rem",
                      background: "linear-gradient(135deg, #e74c3c, #9b59b6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {FEATURED_PROJECT.subtitle}
                  </h3>

                  <p
                    className="text-[#8888a8] text-sm leading-relaxed mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {FEATURED_PROJECT.description}
                  </p>

                  {/* Features grid */}
                  <div className="grid grid-cols-1 gap-1.5 mb-5">
                    {FEATURED_PROJECT.features.map((feature, i) => (
                      <div key={feature} className="flex items-center gap-2.5 text-[#8888a8]">
                        <div className="text-[#c0392b] shrink-0">{FEATURE_ICONS[i]}</div>
                        <span
                          className="text-xs"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tags + CTA */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {FEATURED_PROJECT.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded bg-white/5 text-[#a8a8c8]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={FEATURED_PROJECT.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-gradient-to-r from-[#c0392b] to-[#922b21] text-white hover:from-[#e74c3c] hover:to-[#c0392b] transition-all duration-300 shadow-lg shadow-[#c0392b]/20 w-fit text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <FaGithub className="w-4 h-4" />
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── SCREEN 2+: Other projects (scroll to see) ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Sub-header */}
        <CardFadeIn>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span
              className="text-[#8888a8] text-xs uppercase tracking-[0.3em]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              More Projects
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>
        </CardFadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {OTHER_PROJECTS.map((project, i) => (
            <CardFadeIn key={project.title} delay={0.05 + i * 0.07}>
              <motion.a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col p-5 rounded-xl border border-white/5 hover:border-[#c0392b]/35 bg-[#080810] h-full transition-colors duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4
                    className="text-white group-hover:text-[#e74c3c] transition-colors duration-200 text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[project.status]}`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {project.status}
                    </span>
                    {project.status === "Live" ? (
                      <ExternalLink className="w-3.5 h-3.5 text-[#8888a8] group-hover:text-[#2ecc71] transition-colors" />
                    ) : (
                      <FaGithub className="w-3.5 h-3.5 text-[#8888a8] group-hover:text-white transition-colors" />
                    )}
                  </div>
                </div>

                <p
                  className="text-[#8888a8] text-xs leading-relaxed flex-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-white/5 text-[#a8a8c8]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            </CardFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
