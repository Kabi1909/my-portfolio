import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
    />
  );
}
