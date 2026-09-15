import { profile } from "../config/profile.js";
const memory = new Map();
const TTL = 15 * 60 * 1000;
export function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export function sortRepos(repos) {
  const featured = [
    "interntrack",
    "tripwise",
    "farm2home",
    "farm2home-lk",
    "boardlk",
  ];
  return repos
    .filter(
      (r) => !r.fork && r.name.toLowerCase() !== profile.username.toLowerCase(),
    )
    .sort(
      (a, b) =>
        Number(featured.includes(b.name.toLowerCase())) -
          Number(featured.includes(a.name.toLowerCase())) ||
        new Date(b.updated_at) - new Date(a.updated_at) ||
        Number(Boolean(b.description)) - Number(Boolean(a.description)) ||
        b.stargazers_count - a.stargazers_count,
    );
}
async function request(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new Error(
      response.status === 403 || response.status === 429
        ? "GitHub’s public API limit has been reached. Please try again later."
        : "GitHub is temporarily unavailable. Please try again.",
    );
  return response.json();
}
export async function cached(key, loader, force = false) {
  if (!force && memory.has(key)) return memory.get(key);
  let previous;
  try {
    previous = JSON.parse(localStorage.getItem(key));
  } catch {
    /* Storage may be disabled. */
  }
  if (!force && previous && Date.now() - previous.time < TTL)
    return { data: previous.data, stale: false };
  const pending = loader()
    .then((data) => {
      try {
        localStorage.setItem(key, JSON.stringify({ time: Date.now(), data }));
      } catch {
        /* optional cache */
      }
      return { data, stale: false };
    })
    .catch((error) => {
      if (previous) return { data: previous.data, stale: true };
      throw error;
    })
    .finally(() => memory.delete(key));
  memory.set(key, pending);
  return pending;
}
export const getRepos = (force = false) =>
  cached(
    `portfolio-repos-${profile.username}`,
    async () => {
      const all = [];
      for (let page = 1; ; page++) {
        const batch = await request(
          `/users/${profile.username}/repos?per_page=100&sort=updated&page=${page}`,
        );
        all.push(...batch);
        if (batch.length < 100) break;
      }
      return sortRepos(all);
    },
    force,
  );
export const getUser = (force = false) =>
  cached(
    `portfolio-user-${profile.username}`,
    () => request(`/users/${profile.username}`),
    force,
  );
