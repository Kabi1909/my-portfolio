import { Github, ArrowUpRight } from "lucide-react";
import { useGitHubUser } from "../hooks/useGitHubRepos";
import { profile } from "../config/profile";
import { ExternalLink } from "./Shared";
export default function GitHubStats() {
  const resource = useGitHubUser();
  return (
    <section id="github" className="section">
      <div className="github-panel">
        <div>
          <p className="eyebrow">BUILDING IN THE OPEN</p>
          <h2>
            <Github size={32} /> My GitHub
          </h2>
          <p className="muted">Small commits. Continuous progress.</p>
          <ExternalLink className="details-link" href={profile.github}>
            @{profile.username} · View GitHub Profile <ArrowUpRight size={15} />
          </ExternalLink>
        </div>
        <div className="github-stats">
          {resource.error ? (
            <div role="status">
              <p>{resource.error}</p>
              <button className="details-link" onClick={resource.retry}>
                Retry
              </button>
            </div>
          ) : resource.loading ? (
            <span className="muted" role="status">
              Loading GitHub profile…
            </span>
          ) : (
            <>
              {[
                ["public_repos", "Public repositories"],
                ["followers", "Followers"],
                ["following", "Following"],
              ].map(([key, label]) => (
                <div key={key}>
                  <strong>{resource.data[key]}</strong>
                  <span>{label}</span>
                </div>
              ))}
              {resource.stale && <small>Cached GitHub statistics</small>}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
