import { useEffect } from "react";
import { motion } from "framer-motion";
import { profile } from "../config/profile";
export const introSeen = () => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || location.hash)
    return true;
  try {
    return sessionStorage.getItem("kabijake-intro-seen") === "1";
  } catch {
    return false;
  }
};
export default function PageIntro({ onComplete }) {
  useEffect(() => {
    try {
      sessionStorage.setItem("kabijake-intro-seen", "1");
    } catch {
      /* session storage is optional */
    }
    const timer = setTimeout(onComplete, 1750);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return (
    <motion.div
      className="page-intro"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.35 }}
    >
      <div className="intro-word">
        {[...profile.name.toUpperCase()].map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.12 + i * 0.08, duration: 0.55 }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="intro-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.45, ease: [0.65, 0, 0.35, 1] }}
      />
      <span className="intro-caption">A DEVELOPER ORIGINAL</span>
    </motion.div>
  );
}
