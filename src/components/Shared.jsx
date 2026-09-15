import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { profile } from "../config/profile";
export function ExternalLink({ href, children, className = "", ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
export function SocialLinks({ labels = false }) {
  return (
    <>
      <ExternalLink href={profile.github} aria-label="GitHub profile">
        <Github size={19} />
        {labels && "GitHub"}
      </ExternalLink>
      <ExternalLink href={profile.linkedin} aria-label="LinkedIn profile">
        <Linkedin size={19} />
        {labels && "LinkedIn"}
      </ExternalLink>
    </>
  );
}
export function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      {project.github ? (
        <ExternalLink href={project.github} className="button button-dark">
          <Github size={16} /> Repository
        </ExternalLink>
      ) : (
        <span className="muted small">Public repository not available</span>
      )}
      {project.live && (
        <ExternalLink href={project.live} className="button button-white">
          Live Demo <ArrowUpRight size={16} />
        </ExternalLink>
      )}
    </div>
  );
}
