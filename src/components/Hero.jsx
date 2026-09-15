import { motion, useReducedMotion } from "framer-motion";
import { Play, ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "../config/profile";
import { SocialLinks } from "./Shared";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";
import HeroDepth from "./HeroDepth";
export default function Hero({ ready = true }) {
  const reduced = useReducedMotion();
  const enter = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: {
      delay: reduced ? 0 : delay,
      duration: reduced ? 0 : 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  });
  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <HeroDepth />
      <TiltCard className="hero-portrait" strength={5}>
        <img
          src={profile.photo}
          alt="Kabijake wearing a black suit and red tie"
          fetchPriority="high"
        />
        <div className="portrait-shade" />
      </TiltCard>
      <div className="hero-content">
        <motion.div className="hero-sequence">
          <p className="series-label">
            <span className="monogram">K</span> A DEVELOPER ORIGINAL
          </p>
          <div className="hero-title">
            <h1 aria-label={profile.name.toUpperCase()}>
              {[...profile.name.toUpperCase()].map((letter, i) => (
                <motion.span
                  aria-hidden="true"
                  className="title-letter"
                  key={i}
                  {...enter(0.15 + i * 0.045)}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
            <motion.p {...enter(0.4)}>{profile.title.toUpperCase()}</motion.p>
          </div>
          <motion.div className="hero-meta" {...enter(0)}>
            <span className="green">Available for opportunities</span>
            <span className="meta-divider">|</span>
            <span>
              <MapPin size={13} />
              {profile.location}
            </span>
            <span className="hd-badge">MERN</span>
          </motion.div>
          <motion.p className="hero-education" {...enter(0.55)}>
            BSc (Hons) Information Technology Undergraduate
            <br />
            <span>{profile.university}</span>
          </motion.p>
          <motion.p className="hero-description" {...enter(0.7)}>
            Building thoughtful digital experiences.
            <br className="desktop-break" /> From the first idea to the final
            line of code.
          </motion.p>
          <motion.div className="hero-actions" {...enter(0.85)}>
            <MagneticButton href="#projects" className="button button-white">
              <Play size={18} fill="currentColor" /> View Projects
            </MagneticButton>
            <MagneticButton href="#contact" className="button button-glass">
              Contact Me <ArrowUpRight size={18} />
            </MagneticButton>
          </motion.div>
          <motion.div className="hero-social" {...enter(1)}>
            <SocialLinks labels />
          </motion.div>
        </motion.div>
      </div>
      <div className="hero-bottom">
        <a href="#projects">
          <span className="scroll-line" /> SCROLL TO EXPLORE{" "}
          <ArrowDown size={13} />
        </a>
        <span>CODE. CREATE. MAKE AN IMPACT.</span>
      </div>
      <div className="portrait-caption">
        <span className="red-line" /> THE DEVELOPER BEHIND THE CODE
      </div>
    </section>
  );
}
