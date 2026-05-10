import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
  className?: string;
}

/**
 * Reusable FadeIn animation wrapper.
 * Triggers once when the element enters the viewport.
 */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.55,
  className,
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const initialY = direction === "up" ? 24 : 0;
  const initialX =
    direction === "left" ? -24 : direction === "right" ? 24 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialY, x: initialX }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
