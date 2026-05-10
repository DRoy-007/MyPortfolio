import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { NAV_LINKS } from "../data/portfolioData";

// ─── Navbar ────────────────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Highlight active section based on scroll position
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 80) {
          setActive(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Desktop / main navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-[#080810]/90 backdrop-blur-md border-b border-[#c0392b]/20 shadow-lg shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2 group"
            aria-label="Go to top"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#c0392b] to-[#6c3483] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span
              style={{ fontFamily: "'Cinzel', serif" }}
              className="text-white group-hover:text-[#e74c3c] transition-colors duration-200"
            >
              DR<span className="text-[#c0392b]">.</span>007
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative text-sm transition-colors duration-200 ${
                    active === id ? "text-[#e74c3c]" : "text-[#8888a8] hover:text-white"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {link.label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#c0392b] to-[#6c3483] rounded"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Hire Me CTA */}
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:block px-4 py-1.5 rounded border border-[#c0392b]/50 text-[#e74c3c] text-sm hover:bg-[#c0392b]/10 transition-all duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Hire Me
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#080810]/95 backdrop-blur-lg border-b border-[#c0392b]/20 px-6 py-4 flex flex-col gap-1 md:hidden"
          >
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left py-2.5 border-b border-white/5 text-sm transition-colors ${
                    active === id ? "text-[#e74c3c]" : "text-[#8888a8] hover:text-[#e74c3c]"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-2 px-4 py-2 rounded border border-[#c0392b]/50 text-[#e74c3c] text-sm hover:bg-[#c0392b]/10 transition-all duration-200 w-fit"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
