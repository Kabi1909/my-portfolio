import { motion, useReducedMotion } from "framer-motion";
import TiltCard from "./TiltCard";
export default function ProjectLaptop3D({ project }) {
  const reduced = useReducedMotion();
  return (
    <figure className="laptop-showcase">
      <motion.div
        key={project.id}
        className="laptop-entrance"
        initial={
          reduced
            ? false
            : { rotateX: 12, rotateY: -12, scale: 0.94, opacity: 0 }
        }
        whileInView={{ rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <TiltCard className="laptop-body" strength={4}>
          <div className="laptop-screen">
            <div className="browser-chrome" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{project.title}</span>
            </div>
            <div className="laptop-display">
              <img
                src={project.screenshot || project.artwork}
                onError={(e) => {
                  if (e.currentTarget.getAttribute("src") !== project.artwork)
                    e.currentTarget.src = project.artwork;
                }}
                alt={
                  project.screenshot
                    ? `${project.title} application screenshot`
                    : `${project.title} existing conceptual project artwork`
                }
                loading="lazy"
              />
            </div>
            <div className="screen-brand" aria-hidden="true">
              KABIJΛKE · PROJECT STUDIO
            </div>
          </div>
          <div className="laptop-base" aria-hidden="true">
            <span />
          </div>
        </TiltCard>
      </motion.div>
      <figcaption>
        {project.title}
        <span>
          {project.screenshot
            ? "Application preview"
            : "Project artwork · screenshot coming later"}
        </span>
      </figcaption>
    </figure>
  );
}
