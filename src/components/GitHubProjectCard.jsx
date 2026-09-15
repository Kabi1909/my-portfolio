import { Star, GitFork, Code2, ArrowUpRight } from "lucide-react";
import { ExternalLink } from "./Shared";
import { safeUrl } from "../services/github";
export default function GitHubProjectCard({ repo, onSelect }) {
  const project = {
    title: repo.name,
    description:
      repo.description ||
      "Explore the source code, implementation, and latest updates in this public repository.",
    technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
    github: safeUrl(repo.html_url),
    live: safeUrl(repo.homepage),
    features: [],
    category: "OPEN SOURCE",
    color: "#e50914",
  };
  return (
    <article className="repo-card">
      <div className="repo-top">
        <Code2 size={24} />
        <span>PUBLIC REPOSITORY</span>
        <ExternalLink
          href={project.github}
          aria-label={`Open ${repo.name} on GitHub`}
        >
          <ArrowUpRight size={19} />
        </ExternalLink>
      </div>
      <button className="repo-title" onClick={() => onSelect(project)}>
        {repo.name}
      </button>
      <p>{project.description}</p>
      <div className="tags">
        {(repo.topics || []).map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="repo-stats">
        <span>
          <i />
          {repo.language || "Not specified"}
        </span>
        <span>
          <Star size={13} />
          {repo.stargazers_count}
        </span>
        <span>
          <GitFork size={13} />
          {repo.forks_count}
        </span>
      </div>
      <div className="repo-bottom">
        <time dateTime={repo.updated_at}>
          Updated{" "}
          {new Date(repo.updated_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
        <button className="text-button" onClick={() => onSelect(project)}>
          Details <ArrowUpRight size={13} />
        </button>
      </div>
      {project.live && (
        <ExternalLink href={project.live} className="details-link">
          Live Demo <ArrowUpRight size={14} />
        </ExternalLink>
      )}
    </article>
  );
}
