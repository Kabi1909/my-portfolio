import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import TiltCard from "./TiltCard";
import { journey } from "../data/journey";
export default function DeveloperTimeline() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start .75", "end .6"],
  });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) =>
    setActive(Math.min(3, Math.floor(value * 4))),
  );
  return (
    <div className="developer-journey" ref={ref}>
      <p className="eyebrow">LEARNING. BUILDING. PROGRESSING.</p>
      <h3>Developer Journey</h3>
      <div className="journey-track">
        <div className="journey-path" aria-hidden="true">
          <motion.div style={{ scaleY: reduced ? 1 : scrollYProgress }} />
        </div>
        <ol>
          {journey.map((item, i) => (
            <motion.li
              key={item.year}
              className={`journey-step ${i === active ? "is-current" : ""} ${i < active ? "is-complete" : ""}`}
              aria-current={i === active ? "step" : undefined}
              initial={
                reduced ? false : { opacity: 0, z: -30, scale: 0.94, y: 18 }
              }
              whileInView={{ opacity: 1, z: 0, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduced ? 0 : 0.6 }}
            >
              <span className="journey-node" aria-hidden="true" />
              <TiltCard className="journey-card" strength={3}>
                <time className="journey-year">{item.year}</time>
                <h4>{item.title}</h4>
                {item.subtitle && (
                  <span className="journey-subtitle">{item.subtitle}</span>
                )}
                <p>{item.description}</p>
              </TiltCard>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
