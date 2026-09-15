import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import usePointerMotion from "../hooks/usePointerMotion";
export default function MagneticButton({ children, ...props }) {
  const enabled = usePointerMotion();
  const frame = useRef(0);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 22 }),
    springY = useSpring(y, { stiffness: 240, damping: 22 });
  useEffect(() => {
    if (!enabled) {
      x.set(0);
      y.set(0);
    }
    return () => cancelAnimationFrame(frame.current);
  }, [enabled, x, y]);
  return (
    <motion.a
      {...props}
      style={{ x: enabled ? springX : 0, y: enabled ? springY : 0 }}
      onPointerMove={(event) => {
        if (!enabled || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const dx = event.clientX - bounds.left - bounds.width / 2,
          dy = event.clientY - bounds.top - bounds.height / 2;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          x.set(Math.max(-4, Math.min(4, dx * 0.07)));
          y.set(Math.max(-3, Math.min(3, dy * 0.1)));
        });
      }}
      onPointerLeave={() => {
        cancelAnimationFrame(frame.current);
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}
