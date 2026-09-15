import { motion, useReducedMotion } from "framer-motion";
const easing = [0.22, 1, 0.36, 1];
export default function AnimatedSection({
  children,
  className = "",
  variant = "rise",
  delay = 0,
  as = "div",
  ...props
}) {
  const reduced = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;
  const offset =
    variant === "slide"
      ? { x: -24 }
      : variant === "depth"
        ? { scale: 0.97, rotateX: 5 }
        : { y: 26 };
  return (
    <Component
      className={className}
      initial={reduced ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay: reduced ? 0 : delay,
        ease: easing,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
