import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Code2, Github, Atom, Database, Coffee, Braces } from "lucide-react";
import usePointerMotion from "../hooks/usePointerMotion";
const icons = [Atom, Braces, Code2, Database, Coffee, Github];
export default function HeroDepth() {
  const enabled = usePointerMotion();
  const ref = useRef(null);
  const visible = useInView(ref);
  const px = useMotionValue(0),
    py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 70, damping: 24 }),
    y = useSpring(py, { stiffness: 70, damping: 24 });
  const glowX = useTransform(x, (v) => v * 0.25);
  const gridX = useTransform(x, (v) => v * 0.5);
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 900], [0, 65]);
  useEffect(() => {
    if (!enabled || !visible) {
      px.set(0);
      py.set(0);
      return;
    }
    const hero = ref.current.closest(".hero");
    let frame = 0;
    const move = (e) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      const cx = e.clientX,
        cy = e.clientY;
      frame = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        px.set((cx / r.width - 0.5) * 14);
        py.set(((cy - r.top) / r.height - 0.5) * 10);
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      px.set(0);
      py.set(0);
    };
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
    };
  }, [enabled, visible, px, py]);
  return (
    <motion.div
      ref={ref}
      className={`hero-depth ${visible ? "scene-visible" : ""}`}
      aria-hidden="true"
      style={{ y: enabled ? drift : 0 }}
    >
      <motion.div className="scene-glow" style={{ x: enabled ? glowX : 0 }} />
      <motion.div className="scene-grid" style={{ x: enabled ? gridX : 0 }} />
      <motion.div
        className="depth-objects"
        style={{ x: enabled ? x : 0, y: enabled ? y : 0 }}
      >
        {icons.map((Icon, i) => (
          <span
            className={`depth-object depth-object-${i}`}
            key={i}
            style={{ "--float-duration": `${4 + i * 0.7}s` }}
          >
            <Icon strokeWidth={1} size={i % 2 ? 26 : 38} />
          </span>
        ))}
      </motion.div>
      <div className="depth-orbit" />
    </motion.div>
  );
}
