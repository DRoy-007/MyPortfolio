/**
 * App.tsx — Portfolio Root
 * Single-page application for Debarpan Roy's portfolio.
 *
 * Structure:
 *   ├── Navbar      (fixed, h-16)
 *   ├── Hero        (h-screen, viewport-fit)
 *   ├── About       (h-screen, viewport-fit)
 *   ├── Skills      (h-screen, viewport-fit)
 *   ├── Projects    (h-screen for featured + scrollable extras)
 *   ├── Education   (h-screen, viewport-fit)
 *   └── Contact     (h-screen, viewport-fit)
 *
 * Data: /src/app/data/portfolioData.ts
 * Assets: /src/assets/icons/SocialIcons.tsx
 * Shared: /src/app/components/shared/
 */

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="bg-[#080810] text-white" style={{ overflowX: "hidden" }}>
      {/* Fixed navigation bar — h-16 (64px) */}
      <Navbar />

      {/* Main sections — each designed to fill one viewport */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
