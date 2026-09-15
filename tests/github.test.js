import test from "node:test";
import assert from "node:assert/strict";
import {
  sortRepos,
  safeUrl,
  cached,
  getRepos,
} from "../src/services/github.js";
const repo = (name, extra = {}) => ({
  name,
  updated_at: "2026-01-01T00:00:00Z",
  fork: false,
  description: null,
  stargazers_count: 0,
  ...extra,
});
test("repository selection excludes profile and forks and prioritizes featured, recency, description, stars", () => {
  const result = sortRepos([
    repo("Kabi1909"),
    repo("fork", { fork: true }),
    repo("plain"),
    repo("star", { stargazers_count: 3 }),
    repo("described", { description: "A project" }),
    repo("recent", { updated_at: "2026-06-01T00:00:00Z" }),
    repo("InternTrack"),
  ]);
  assert.deepEqual(
    result.map((r) => r.name),
    ["InternTrack", "recent", "described", "star", "plain"],
  );
});
test("deployment URL sanitizer rejects unsafe and malformed URLs", () => {
  assert.equal(safeUrl("javascript:alert(1)"), null);
  assert.equal(safeUrl("data:text/html,hi"), null);
  assert.equal(safeUrl(null), null);
  assert.equal(safeUrl("https://example.com"), "https://example.com/");
});
test("cache deduplicates requests and preserves stale data during outage", async () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (k) => values.get(k),
    setItem: (k, v) => values.set(k, v),
  };
  let calls = 0;
  const loader = async () => {
    calls++;
    return ["project"];
  };
  const [a, b] = await Promise.all([
    cached("test-key", loader),
    cached("test-key", loader),
  ]);
  assert.equal(calls, 1);
  assert.deepEqual(a, b);
  await cached("test-key", loader);
  assert.equal(calls, 1);
  const stale = await cached(
    "test-key",
    async () => {
      throw new Error("offline");
    },
    true,
  );
  assert.equal(stale.stale, true);
  assert.deepEqual(stale.data, ["project"]);
  await assert.rejects(
    cached("uncached", async () => {
      throw new Error("offline");
    }),
    /offline/,
  );
});
test("repository fetching paginates and excludes profile without authentication", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(options.headers.Authorization, undefined);
    return {
      ok: true,
      json: async () =>
        calls === 1
          ? Array.from({ length: 100 }, (_, i) => repo(`repo-${i}`))
          : [repo("Kabi1909"), repo("last-page")],
    };
  };
  try {
    const result = await getRepos(true);
    assert.equal(calls, 2);
    assert.equal(result.data.length, 101);
  } finally {
    globalThis.fetch = original;
  }
});
