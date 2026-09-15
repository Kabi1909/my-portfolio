import { useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectRow from "./components/ProjectRow";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import GitHubProjects from "./components/GitHubProjects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import GitHubStats from "./components/GitHubStats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { projects } from "./data/projects";
import { useGitHubRepos } from "./hooks/useGitHubRepos";
import { safeUrl } from "./services/github";
import { profile } from "./config/profile";
export default function App() {
  const resource = useGitHubRepos();
  const [selected, setSelected] = useState(null);
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ProjectRow
          id="projects"
          title="Featured Projects"
          eyebrow="BUILT WITH PURPOSE · CRAFTED WITH CODE"
          className="featured"
        >
          {projects.map((p, index) => {
            const repo = resource.data?.find(
              (r) => r.name.toLowerCase() === p.repoName?.toLowerCase(),
            );
            return (
              <ProjectCard
                key={p.id}
                project={{
                  ...p,
                  github: repo
                    ? safeUrl(repo.html_url)
                    : p.repoName
                      ? `${profile.github}/${p.repoName}`
                      : null,
                  live: repo ? safeUrl(repo.homepage) : null,
                }}
                index={index}
                onSelect={setSelected}
              />
            );
          })}
        </ProjectRow>
        <About />
        <GitHubProjects resource={resource} onSelect={setSelected} />
        <Skills />
        <Education />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.title}
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
