import { motion } from "framer-motion";
import { Play, ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "../config/profile";
import { SocialLinks } from "./Shared";
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-portrait">
        <img
          src={profile.photo}
          alt="Kabijake wearing a black suit and red tie"
          fetchPriority="high"
        />
        <div className="portrait-shade" />
      </div>
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="series-label">
            <span className="monogram">K</span> A DEVELOPER ORIGINAL
          </p>
          <div className="hero-title">
            <h1>{profile.name.toUpperCase()}</h1>
            <p>{profile.title.toUpperCase()}</p>
          </div>
          <div className="hero-meta">
            <span className="green">Available for opportunities</span>
            <span className="meta-divider">|</span>
            <span>
              <MapPin size={13} />
              {profile.location}
            </span>
            <span className="hd-badge">MERN</span>
          </div>
          <p className="hero-education">
            BSc (Hons) Information Technology Undergraduate
            <br />
            <span>{profile.university}</span>
          </p>
          <p className="hero-description">
            Building thoughtful digital experiences.
            <br className="desktop-break" /> From the first idea to the final
            line of code.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button button-white">
              <Play size={18} fill="currentColor" /> View Projects
            </a>
            <a href="#contact" className="button button-glass">
              Contact Me <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-social">
            <SocialLinks labels />
          </div>
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
