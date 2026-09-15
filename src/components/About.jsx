import { Code2, Layers3, GitBranch, ArrowUpRight } from "lucide-react";
import { profile } from "../config/profile";
import { SectionHeading } from "./Shared";
export default function About() {
  return (
    <section id="about" className="section about">
      <SectionHeading
        eyebrow="BEHIND THE SCENES"
        title="A little about the developer."
      />
      <div className="about-grid">
        <div>
          <p className="about-lead">
            Curiosity drives me.
            <br />
            <span>Building is how I learn.</span>
          </p>
          <p className="body-copy">{profile.introduction}</p>
          <a href="#contact" className="details-link">
            Get to know me <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="about-points">
          {[
            [
              Code2,
              "End-to-end development",
              "MERN applications, REST APIs, and responsive interfaces.",
            ],
            [
              Layers3,
              "Built on strong foundations",
              "Database design, clean code, and scalable software architecture.",
            ],
            [
              GitBranch,
              "Better together",
              "Git/GitHub workflows and a collaborative approach to building software.",
            ],
          ].map(([Icon, title, text]) => (
            <div key={title}>
              <span className="feature-icon">
                <Icon size={22} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
