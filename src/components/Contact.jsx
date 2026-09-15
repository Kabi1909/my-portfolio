import { Mail, ArrowUpRight } from "lucide-react";
import { profile } from "../config/profile";
import { SocialLinks } from "./Shared";
export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <p className="eyebrow">GREAT THINGS START WITH A CONVERSATION</p>
      <h2>
        Let's build
        <br />
        something <span>great.</span>
      </h2>
      <p>
        I'm open to software development opportunities, collaborations,
        <br className="desktop-break" /> internships, and interesting full-stack
        projects.
      </p>
      <div className="contact-links">
        <SocialLinks labels />
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
      </div>
      <div className="availability">
        <i />
        AVAILABLE FOR SOFTWARE DEVELOPMENT OPPORTUNITIES
      </div>
    </section>
  );
}
