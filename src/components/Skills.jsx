import OrbitingSkills from "./OrbitingSkills";
import TiltCard from "./TiltCard";
import AnimatedSection from "./AnimatedSection";
import { Code2, Server, Database, Terminal, Workflow } from "lucide-react";
import { skills } from "../data/skills";
import { SectionHeading } from "./Shared";
const icons = {
  code: Code2,
  server: Server,
  database: Database,
  terminal: Terminal,
  workflow: Workflow,
};
export default function Skills() {
  return (
    <AnimatedSection
      as="section"
      variant="rise"
      id="skills"
      className="section skills"
    >
      <SectionHeading
        eyebrow="MY DEVELOPER TOOLKIT"
        title="The stack behind the stories."
      />
      <OrbitingSkills />
      <div className="skill-categories">
        {skills.map((category, i) => {
          const Icon = icons[category.icon];
          return (
            <div className="skill-category" key={category.name}>
              <div className="skill-label">
                <Icon size={19} />
                <h3>{category.name}</h3>
                <span>0{i + 1}</span>
              </div>
              <div className="skill-row">
                {category.items.map((item, index) => (
                  <TiltCard className="skill-card" strength={4} key={item}>
                    <span className={`tech-symbol tech-${i}`}>
                      {item === "React.js"
                        ? "⚛"
                        : item === "JavaScript ES6+"
                          ? "JS"
                          : item === "HTML5"
                            ? "5"
                            : item === "CSS3"
                              ? "#"
                              : item === "Git"
                                ? "⑂"
                                : item.slice(0, 2)}
                    </span>
                    <span>{item}</span>
                  </TiltCard>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
