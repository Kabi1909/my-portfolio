import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Mail, ArrowUpRight, Download } from "lucide-react";
import { profile } from "../config/profile";
import { SocialLinks } from "./Shared";
export default function Contact() {
  const reduced = useReducedMotion();
  const reveal = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: reduced ? 0 : 0.65, delay: reduced ? 0 : delay },
  });
  return (
    <AnimatedSection
      as="section"
      variant="rise"
      id="contact"
      className="section contact"
    >
      <p className="eyebrow">GREAT THINGS START WITH A CONVERSATION</p>
      <motion.h2 {...reveal(0)}>
        Let's build
        <br />
        something <span>great.</span>
      </motion.h2>
      <motion.p {...reveal(0.15)}>
        I'm open to software development opportunities, collaborations,
        <br className="desktop-break" /> internships, and interesting full-stack
        projects.
      </motion.p>
      <motion.div className="contact-links" {...reveal(0.3)}>
        <SocialLinks labels />
        <a href={profile.cv} download="P-Kabijake-CV.pdf" aria-label="Download CV (PDF)">
          <Download size={18} aria-hidden="true" />
          Download CV
        </a>
        {profile.email ? (
          <a href={`mailto:${profile.email}`}>
            <Mail size={18} />
            Email <ArrowUpRight size={15} />
          </a>
        ) : (
          <span className="email-unavailable">
            <Mail size={18} />
            Email <small>Coming soon</small>
          </span>
        )}
      </motion.div>
      <div className="availability">
        <i />
        AVAILABLE FOR SOFTWARE DEVELOPMENT OPPORTUNITIES
      </div>
    </AnimatedSection>
  );
}
