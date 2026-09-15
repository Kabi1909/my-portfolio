import { useEffect, useState, useCallback } from "react";
import { getRepos, getUser } from "../services/github";
function useResource(loader) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
    stale: false,
  });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    loader(attempt > 0)
      .then((result) => {
        if (active) setState({ ...result, loading: false, error: null });
      })
      .catch((error) => {
        if (active)
          setState({
            data: null,
            loading: false,
            error: error.message,
            stale: false,
          });
      });
    return () => {
      active = false;
    };
  }, [loader, attempt]);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}
export const useGitHubRepos = () => useResource(getRepos);
export const useGitHubUser = () => useResource(getUser);
