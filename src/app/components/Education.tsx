import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, BookOpen, TrendingUp } from "lucide-react";
import { FadeIn } from "./shared/FadeIn";
import { SectionHeader } from "./shared/SectionHeader";
import { EDUCATION_TIMELINE, ENTRANCE_EXAMS, CURRENTLY_LEARNING } from "../data/portfolioData";

const TIMELINE_ICONS = [
  <GraduationCap className="w-4 h-4" />,
  <BookOpen className="w-4 h-4" />,
  <Award className="w-4 h-4" />,
];

function TimelineItem({
  item,
  icon,
  delay,
}: {
  item: (typeof EDUCATION_TIMELINE)[number];
  icon: React.ReactNode;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="relative pl-14"
    >
      {/* Icon dot */}
      <div
        className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center border"
        style={{
          backgroundColor: `${item.color}15`,
          borderColor: `${item.color}40`,
          color: item.color,
        }}
      >
        {icon}
      </div>

      {/* Card */}
      <div className="p-4 rounded-xl bg-[#080810] border border-white/5 hover:border-[#c0392b]/20 transition-colors duration-300">
        <div className="flex flex-wrap items-start justify-between gap-1.5 mb-1">
          <div>
            <span
              className="text-[#8888a8] text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {item.year}
            </span>
            <h3
              className="text-white text-sm mt-0.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {item.title}
            </h3>
            <p
              className="text-xs mt-0.5"
              style={{ color: item.color, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {item.institution} · {item.location}
            </p>
          </div>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full border ${item.badgeColor} shrink-0`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {item.badge}
          </span>
        </div>
        <p
          className="text-[#8888a8] text-xs leading-relaxed mt-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────
export function Education() {
  return (
    <section
      id="education"
      className="relative h-screen flex flex-col overflow-hidden bg-[#080810] pt-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(108,52,131,0.07),transparent)] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 py-6">
        {/* Header */}
        <FadeIn>
          <SectionHeader number="04" title="Education" />
        </FadeIn>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Timeline — takes 2/3 */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#c0392b]/40 via-[#6c3483]/30 to-transparent" />

              <div className="space-y-5">
                {EDUCATION_TIMELINE.map((item, i) => (
                  <TimelineItem
                    key={item.title}
                    item={item}
                    icon={TIMELINE_ICONS[i]}
                    delay={i * 0.12}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Entrance exams */}
            <FadeIn delay={0.1} direction="right">
              <p
                className="text-[#8888a8] text-xs uppercase tracking-wider mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Entrance Exams
              </p>
              <div className="space-y-3">
                {ENTRANCE_EXAMS.map((exam) => (
                  <motion.div
                    key={exam.name}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-xl bg-[#0a0a14] border border-white/5 hover:border-[#c0392b]/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-3.5 h-3.5" style={{ color: exam.color }} />
                      <span
                        className="text-[#8888a8] text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {exam.name}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1.15rem",
                        color: exam.color,
                      }}
                    >
                      {exam.score}
                    </p>
                    <p
                      className="text-[#8888a8] text-xs mt-0.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {exam.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            {/* Currently learning */}
            <FadeIn delay={0.25} direction="right">
              <div className="p-4 rounded-xl bg-[#0a0a14] border border-white/5">
                <p
                  className="text-[#c0392b] text-xs uppercase tracking-wider mb-2.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Currently Learning
                </p>
                <div className="space-y-1.5">
                  {CURRENTLY_LEARNING.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-[#8888a8] text-xs"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c0392b] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Motivational quote */}
            <FadeIn delay={0.35} direction="right">
              <div className="p-4 rounded-xl border border-[#c0392b]/20 bg-[#c0392b]/5 relative overflow-hidden">
                <div className="absolute top-1 left-2 text-3xl text-[#c0392b]/20 font-serif leading-none">"</div>
                <p
                  className="text-[#8888a8] text-xs leading-relaxed pt-3 italic"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  The real grind happens in the terminal — where code either runs or it doesn't.
                </p>
                <p
                  className="text-[#c0392b] text-xs mt-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  — Debarpan Roy
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
