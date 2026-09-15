import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Check, Code2 } from "lucide-react";
import { ProjectLinks } from "./Shared";
export default function ProjectModal({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const el = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="project-modal"
      aria-labelledby="modal-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        className="modal-inner"
      >
        <button
          autoFocus
          onClick={onClose}
          className="modal-close icon-button"
          aria-label="Close project details"
        >
          <X />
        </button>
        <div className="modal-banner">
          {project.artwork ? (
            <img
              src={project.artwork}
              alt={`${project.title} conceptual artwork`}
            />
          ) : (
            <Code2 size={90} />
          )}
          <div>
            <p className="eyebrow">
              {project.category || "FULL-STACK PROJECT"}
            </p>
            <h2 id="modal-title">{project.title}</h2>
          </div>
        </div>
        <div className="modal-body">
          <ProjectLinks project={project} />
          <p>{project.description}</p>
          <h3>Built with</h3>
          <div className="tags">
            {project.technologies.length ? (
              project.technologies.map((t) => <span key={t}>{t}</span>)
            ) : (
              <span>Explore the repository for technical details</span>
            )}
          </div>
          {project.features?.length > 0 && (
            <>
              <h3>Main features</h3>
              <ul>
                {project.features.map((f) => (
                  <li key={f}>
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </motion.div>
    </dialog>
  );
}
