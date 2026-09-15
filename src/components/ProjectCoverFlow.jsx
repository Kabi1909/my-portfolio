import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectLaptop3D from "./ProjectLaptop3D";
import { SectionHeading, ProjectLinks } from "./Shared";
export default function ProjectCoverFlow({ projects, onSelect }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const start = useRef(null);
  const gesture = useRef(false);
  const project = projects[active];
  const go = (delta) =>
    setActive((i) => (i + delta + projects.length) % projects.length);
  return (
    <section
      id="projects"
      className="project-section featured coverflow-section"
      aria-roledescription="carousel"
      aria-label="Featured Projects"
    >
      <SectionHeading
        title="Featured Projects"
        eyebrow="BUILT WITH PURPOSE · CRAFTED WITH CODE"
      >
        <div className="row-controls">
          <span>EXPLORE THE COLLECTION</span>
          <button
            className="icon-button"
            aria-label="Previous featured project"
            onClick={() => go(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="icon-button"
            aria-label="Next featured project"
            onClick={() => go(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </SectionHeading>
      <div
        className="coverflow-stage"
        tabIndex={0}
        aria-label="Project carousel. Use left and right arrow keys."
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            go(e.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "touch") {
            gesture.current = false;
            start.current = { x: e.clientX, y: e.clientY };
          }
        }}
        onPointerUp={(e) => {
          if (!start.current) return;
          const dx = e.clientX - start.current.x,
            dy = e.clientY - start.current.y;
          start.current = null;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
            gesture.current = true;
            go(dx < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={() => {
          start.current = null;
        }}
        onClickCapture={(e) => {
          if (gesture.current) {
            e.preventDefault();
            e.stopPropagation();
            gesture.current = false;
          }
        }}
      >
        {projects.map((item, index) => {
          let distance = (index - active + projects.length) % projects.length;
          if (distance > projects.length / 2) distance -= projects.length;
          const selected = distance === 0;
          return (
            <motion.div
              key={item.id}
              className={`coverflow-position ${selected ? "is-active" : ""}`}
              style={{
                "--slot": distance,
                zIndex: projects.length - Math.abs(distance),
              }}
              animate={{
                rotateY: reduced
                  ? 0
                  : distance === 0
                    ? 0
                    : distance < 0
                      ? 22
                      : -22,
                z: reduced ? 0 : selected ? 35 : -45,
                scale: selected ? 1 : 0.86,
                opacity: Math.abs(distance) > 1 ? 0 : selected ? 1 : 0.66,
              }}
              transition={{
                duration: reduced ? 0 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-hidden={Math.abs(distance) > 1 ? true : undefined}
              inert={Math.abs(distance) > 1 ? true : undefined}
            >
              <div
                className="coverflow-card-content"
                inert={!selected ? true : undefined}
              >
                <ProjectCard project={item} index={index} onSelect={onSelect} />
              </div>
              {!selected && (
                <button
                  className="coverflow-select"
                  aria-label={`Select ${item.title}`}
                  onClick={() => setActive(index)}
                />
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="coverflow-pagination">
        <p aria-live="polite">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}{" "}
          <span>{project.title}</span>
        </p>
        <div>
          {projects.map((p, i) => (
            <button
              key={p.id}
              aria-label={`Show ${p.title}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => setActive(i)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
      <div className="project-studio">
        <ProjectLaptop3D project={project} />
        <div className="studio-information">
          <p className="eyebrow">IN THE PROJECT STUDIO</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tags">
            {project.technologies.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <ProjectLinks project={project} />
          <button className="details-link" onClick={() => onSelect(project)}>
            View Details <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
