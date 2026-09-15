import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Atom, Braces, Server, Coffee, Database, Github } from "lucide-react";
import { profile } from "../config/profile";
const rings = [
  {
    name: "Frontend",
    items: [
      [Atom, "React.js"],
      [Braces, "JavaScript"],
    ],
    speed: 65,
  },
  {
    name: "Backend",
    items: [
      [Server, "Node.js"],
      [Coffee, "Java"],
    ],
    speed: 85,
  },
  {
    name: "Database & Tools",
    items: [
      [Database, "MongoDB"],
      [Github, "GitHub"],
    ],
    speed: 110,
  },
];
export default function OrbitingSkills() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={`skills-orbit-panel ${visible && !paused ? "orbit-running" : ""}`}
      ref={ref}
    >
      <div className="orbit-copy">
        <p className="eyebrow">CONNECTED BY CODE</p>
        <h3>
          One stack.
          <br />
          Endless possibilities.
        </h3>
        <p>Frontend experiences, backend logic, and data — working together.</p>
        <button
          className="details-link"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
        >
          {paused ? "Resume orbital motion" : "Pause orbital motion"}
        </button>
      </div>
      <div className="orbit-scene" aria-label="Full-stack technology orbits">
        <div className="orbit-center">
          <strong>{profile.name.toUpperCase()}</strong>
          <span>
            FULL-STACK
            <br />
            DEVELOPER
          </span>
        </div>
        {rings.map((ring, i) => (
          <div
            key={ring.name}
            className={`orbit-ring orbit-ring-${i}`}
            style={{
              "--orbit-speed": `${ring.speed}s`,
              "--direction": i === 1 ? "reverse" : "normal",
              "--counter-direction": i === 1 ? "normal" : "reverse",
            }}
            role="group"
            aria-label={ring.name}
          >
            {ring.items.map(([Icon, name], j) => (
              <div className={`orbit-position orbit-position-${j}`} key={name}>
                <div className="orbit-counter">
                  <span
                    className="orbit-tech"
                    tabIndex={0}
                    aria-label={`${name} — ${ring.name}`}
                  >
                    <Icon size={21} />
                    <span>{name}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="orbit-legend">
        Frontend <span>·</span> Backend <span>·</span> Database & Tools
      </p>
    </div>
  );
}
