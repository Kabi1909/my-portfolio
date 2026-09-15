import { useState, useCallback } from "react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectCoverFlow from "./components/ProjectCoverFlow";

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
import PageIntro, { introSeen } from "./components/PageIntro";
import ScrollProgress from "./components/ScrollProgress";
export default function App() {
  const resource = useGitHubRepos();
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState(() => !introSeen());
  const finishIntro = useCallback(() => setIntro(false), []);
  const showIntro = intro && !reduced;
  const [selected, setSelected] = useState(null);
  const featuredProjects = projects.map((p) => {
    const repo = resource.data?.find(
      (r) => r.name.toLowerCase() === p.repoName?.toLowerCase(),
    );
    return {
      ...p,
      github: repo
        ? safeUrl(repo.html_url)
        : p.repoName
          ? `${profile.github}/${p.repoName}`
          : null,
      live: repo ? safeUrl(repo.homepage) : null,
    };
  });
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {showIntro && <PageIntro key="intro" onComplete={finishIntro} />}
      </AnimatePresence>
      <ScrollProgress />
      <div inert={showIntro ? true : undefined}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero ready={!showIntro} />
          <ProjectCoverFlow
            projects={featuredProjects}
            onSelect={setSelected}
          />
          <About />
          <GitHubProjects resource={resource} onSelect={setSelected} />
          <Skills />
          <Education />
          <GitHubStats />
          <Contact />
        </main>
        <Footer />
      </div>
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
