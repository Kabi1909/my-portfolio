import ProjectRow from "./ProjectRow";
import GitHubProjectCard from "./GitHubProjectCard";
import { ExternalLink } from "./Shared";
import { profile } from "../config/profile";
export default function GitHubProjects({ resource, onSelect }) {
  return (
    <ProjectRow
      title="More from My GitHub"
      eyebrow="THE OPEN-SOURCE COLLECTION"
    >
      {resource.loading ? (
        Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="repo-card skeleton"
            aria-label="Loading repository"
          />
        ))
      ) : resource.error ? (
        <div className="api-message" role="status">
          <p>{resource.error}</p>
          <button className="button button-dark" onClick={resource.retry}>
            Try again
          </button>
          <ExternalLink href={profile.github}>
            Browse GitHub directly ↗
          </ExternalLink>
        </div>
      ) : (
        <>
          {resource.stale && (
            <p className="api-message">
              Showing cached repositories while GitHub is unavailable.
            </p>
          )}
          {resource.data?.length ? (
            resource.data.map((repo) => (
              <GitHubProjectCard
                key={repo.id}
                repo={repo}
                onSelect={onSelect}
              />
            ))
          ) : (
            <p className="api-message">No public projects to display yet.</p>
          )}
        </>
      )}
    </ProjectRow>
  );
}
