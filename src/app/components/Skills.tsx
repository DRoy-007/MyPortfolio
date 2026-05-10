import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeIn } from "./shared/FadeIn";
import { SectionHeader } from "./shared/SectionHeader";
import { TECH_SKILLS, TOOLS_AND_TECH, DEV_SETUP, CATEGORY_COLORS } from "../data/portfolioData";

// ─── Animated skill bar ────────────────────────────────────────────────────────
function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span
          className="text-white text-sm"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {name}
        </span>
        <span
          className="text-[#8888a8] text-xs"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Skills Section ────────────────────────────────────────────────────────────
export function Skills() {
  return (
    <section
      id="skills"
      className="relative h-screen flex flex-col overflow-hidden bg-[#080810] pt-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_50%,rgba(192,57,43,0.06),transparent)] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 py-6">
        {/* Header */}
        <FadeIn>
          <SectionHeader number="02" title="Skills & Tools" />
        </FadeIn>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-10 flex-1 items-center">
          {/* Left: Skill bars */}
          <FadeIn delay={0.1} direction="left">
            <div>
              <h3
                className="text-white mb-5"
                style={{ fontFamily: "'Cinzel', serif", fontSize: "1.2rem" }}
              >
                Technical Proficiency
              </h3>

              {TECH_SKILLS.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                  delay={i * 0.08}
                />
              ))}

              {/* Learning note */}
              <div className="mt-4 p-3 rounded-lg border border-[#c0392b]/20 bg-[#c0392b]/5">
                <p
                  className="text-[#8888a8] text-xs"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span className="text-[#e74c3c]">// </span>
                  Leveling up DSA via{" "}
                  <span className="text-white">TUF Platform & GfG POTD</span>. The grind never stops.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right: Tech tags + Dev setup */}
          <FadeIn delay={0.2} direction="right">
            <div>
              <h3
                className="text-white mb-4"
                style={{ fontFamily: "'Cinzel', serif", fontSize: "1.2rem" }}
              >
                Technologies & Tools
              </h3>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {TOOLS_AND_TECH.map((tool, i) => {
                  const colors = CATEGORY_COLORS[tool.category];
                  return (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-3 py-1.5 rounded-lg border ${colors.bg} ${colors.text} ${colors.border} cursor-default text-xs`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {tool.name}
                      <span className="ml-1.5 opacity-40 text-xs">{tool.category}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Dev setup */}
              <div className="p-4 rounded-lg bg-[#0a0a14] border border-white/5">
                <p
                  className="text-[#c0392b] text-xs uppercase tracking-wider mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Dev Setup
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {DEV_SETUP.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center gap-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span className="text-[#6c3483] text-xs whitespace-nowrap">{item.key}</span>
                      <span className="text-[#8888a8] text-xs">→</span>
                      <span className="text-[#a8a8c8] text-xs">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
