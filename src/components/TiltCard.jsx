import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import usePointerMotion from "../hooks/usePointerMotion";

export default function TiltCard({
  as = "div",
  className = "",
  children,
  strength = 5,
  style,
  ...props
}) {
  const enabled = usePointerMotion();
  const ref = useRef(null);
  const frame = useRef(0);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 170, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 170, damping: 24 });
  const reset = () => {
    cancelAnimationFrame(frame.current);
    x.set(0);
    y.set(0);
  };
  useEffect(() => {
    if (!enabled) {
      x.set(0);
      y.set(0);
    }
    return () => cancelAnimationFrame(frame.current);
  }, [enabled, x, y]);
  const move = (event) => {
    if (!enabled || event.pointerType !== "mouse") return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const bounds = ref.current?.getBoundingClientRect();
      if (!bounds) return;
      const px = Math.max(
        0,
        Math.min(1, (clientX - bounds.left) / bounds.width),
      );
      const py = Math.max(
        0,
        Math.min(1, (clientY - bounds.top) / bounds.height),
      );
      x.set((0.5 - py) * strength * 2);
      y.set((px - 0.5) * strength * 2);
      ref.current.style.setProperty("--light-x", `${px * 100}%`);
      ref.current.style.setProperty("--light-y", `${py * 100}%`);
    });
  };
  const Component = as === "article" ? motion.article : motion.div;
  return (
    <Component
      ref={ref}
      className={`tilt-card ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{
        ...style,
        rotateX: enabled ? rotateX : 0,
        rotateY: enabled ? rotateY : 0,
        transformPerspective: 1100,
      }}
      {...props}
    >
      {children}
      <span className="tilt-reflection" aria-hidden="true" />
    </Component>
  );
}
