import { motion, useReducedMotion } from "framer-motion";
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
export function SectionHeading({ eyebrow, title, children, reveal }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="section-heading"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={
        reveal === undefined
          ? undefined
          : {
              opacity: reduced || reveal ? 1 : 0,
              y: reduced || reveal ? 0 : 16,
            }
      }
      whileInView={reveal === undefined ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={reveal === undefined ? { duration: 0.6 } : { duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <motion.span
          className="heading-accent"
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={
            reveal === undefined
              ? undefined
              : { scaleX: reduced || reveal ? 1 : 0 }
          }
          whileInView={reveal === undefined ? { scaleX: 1 } : undefined}
          viewport={{ once: true }}
          transition={{
            delay: reduced ? 0 : 0.2,
            duration: reduced ? 0 : 0.65,
          }}
        />
      </div>
      {children}
    </motion.div>
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
