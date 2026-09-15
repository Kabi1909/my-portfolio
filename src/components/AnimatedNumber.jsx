import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
export default function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!visible || reduced) return;
    const animation = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => animation.stop();
  }, [visible, value, reduced]);
  return (
    <strong ref={ref} aria-label={String(value)}>
      <span className="stat-value" aria-hidden="true">
        {reduced ? value : display}
      </span>
    </strong>
  );
}
