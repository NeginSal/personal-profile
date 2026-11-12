import type { Profile } from "./types";

const API_BASE =
  import.meta.env.VITE_API_BASE ??
  "https://personal-profile-backend-bsmo.onrender.com";

async function getJSON<T>(path: string, timeoutMs = 10000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export const fetchProfile = () => getJSON<Profile>("/api/profile");