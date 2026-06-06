import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import myImage from "../../assets/images/my-image.png";
import { FadeIn } from "./shared/FadeIn";
import { SectionHeader } from "./shared/SectionHeader";
import { ABOUT } from "../data/portfolioData";

export function About() {
  return (
    <section
      id="about"
      className="relative h-screen flex flex-col overflow-hidden bg-[#0a0a14] pt-16"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_50%,rgba(108,52,131,0.07),transparent)] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 py-6">
        {/* Header */}
        <FadeIn>
          <SectionHeader number="01" title="About Me" />
        </FadeIn>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10 items-center flex-1">
          {/* Left: Profile image */}
          <FadeIn delay={0.1} direction="left">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-xs">
                {/* Glow halo */}
                <div className="absolute -inset-2 bg-gradient-to-br from-[#c0392b]/25 to-[#6c3483]/25 rounded-xl blur-xl opacity-70 pointer-events-none" />

                {/* Image */}
                <div className="relative rounded-xl overflow-hidden border border-[#c0392b]/20">
                  <ImageWithFallback
                    src={myImage}
                    alt="Developer workspace"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
                      Debarpan Roy
                    </p>
                    <p
                      className="text-[#8888a8] text-xs flex items-center gap-1 mt-0.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <MapPin className="w-3 h-3 text-[#c0392b]" />
                      Kolkata, West Bengal
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-4 -right-4 bg-[#0f0f1a] border border-[#c0392b]/30 rounded-lg px-3 py-2.5 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#c0392b]" />
                    <div>
                      <p
                        className="text-white text-xs"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        1st Year B.Tech
                      </p>
                      <p
                        className="text-[#8888a8] text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        CSE @ NiT
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Text + facts + interests */}
          <FadeIn delay={0.2} direction="right">
            <div className="space-y-5">
              {/* Heading */}
              <h2
                className="text-white"
                style={{ fontFamily: "'Cinzel', serif", fontSize: "1.75rem" }}
              >
                Forged from{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #e74c3c, #9b59b6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  curiosity
                </span>
                , driven by{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #9b59b6, #e74c3c)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  code
                </span>
              </h2>

              {/* Paragraphs */}
              <div
                className="text-[#8888a8] space-y-2.5 leading-relaxed text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {ABOUT.intro.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-2">
                {ABOUT.quickFacts.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col px-3 py-2.5 rounded-lg bg-[#0f0f1a] border border-white/5"
                  >
                    <span
                      className="text-[#c0392b] text-xs uppercase tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-white text-sm mt-0.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interests */}
              <div>
                <p
                  className="text-[#8888a8] text-xs mb-2 uppercase tracking-wider"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {ABOUT.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full border border-[#6c3483]/30 bg-[#6c3483]/10 text-[#9b59b6] text-xs"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {interest}
                    </span>
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
