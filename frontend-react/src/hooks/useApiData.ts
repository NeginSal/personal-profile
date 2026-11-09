import { useEffect, useState } from "react";

export type Source = "loading" | "api" | "fallback";

export function useApiData<T>(fetcher: () => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [source, setSource] = useState<Source>("loading");

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setSource("api");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSource("fallback");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, fallback]);

  return { data, source };
}
