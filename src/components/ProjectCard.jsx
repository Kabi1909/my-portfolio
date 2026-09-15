import TiltCard from "./TiltCard";
import { ArrowUpRight, Play } from "lucide-react";
import { ProjectLinks } from "./Shared";
export default function ProjectCard({ project, index, onSelect }) {
  return (
    <TiltCard
      as="article"
      className="project-card"
      style={{ "--project-color": project.color }}
    >
      <button
        className="project-art"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.title} details`}
      >
        <img
          src={project.artwork}
          alt={`${project.title} conceptual project artwork`}
          loading="lazy"
        />
        <span className="original-mark">
          K <span>ORIGINAL</span>
        </span>
        <span className="card-number">0{index + 1}</span>
        <div className="art-title">
          <span>{project.category}</span>
          <h3>{project.title}</h3>
        </div>
        <span className="play-circle">
          <Play size={19} fill="currentColor" />
        </span>
      </button>
      <div className="card-summary">
        <div>
          <span className="project-kind">FULL-STACK APPLICATION</span>
          <button
            aria-label={`Details for ${project.title}`}
            onClick={() => onSelect(project)}
            className="text-button"
          >
            <ArrowUpRight size={17} />
          </button>
        </div>
        <div className="tags">
          {project.technologies.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className="card-details">
        <p>{project.description}</p>
        <button className="details-link" onClick={() => onSelect(project)}>
          View project details <ArrowUpRight size={14} />
        </button>
        <ProjectLinks project={project} />
      </div>
    </TiltCard>
  );
}
