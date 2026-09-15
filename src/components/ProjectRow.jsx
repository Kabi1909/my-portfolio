import { useRef, Children, Fragment, isValidElement } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./Shared";
import AnimatedSection from "./AnimatedSection";
function flattenRows(children) {
  return Children.toArray(children).flatMap((child) =>
    isValidElement(child) && child.type === Fragment
      ? flattenRows(child.props.children)
      : [child],
  );
}
export default function ProjectRow({
  id,
  title,
  eyebrow,
  children,
  className = "",
}) {
  const ref = useRef(null);
  const scroll = (direction) =>
    ref.current.scrollBy({
      left: direction * ref.current.clientWidth * 0.8,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <section id={id} className={`project-section ${className}`}>
      <SectionHeading title={title} eyebrow={eyebrow}>
        <div className="row-controls">
          <span>EXPLORE THE COLLECTION</span>
          <button
            className="icon-button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scroll(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="icon-button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scroll(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </SectionHeading>
      <div
        className="project-row"
        ref={ref}
        tabIndex={0}
        aria-label={`${title} scrollable collection`}
      >
        {flattenRows(children).map((child, index) => (
          <AnimatedSection
            key={child.key ?? index}
            className="row-item"
            delay={Math.min(index, 4) * 0.075}
            variant="depth"
          >
            {child}
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
