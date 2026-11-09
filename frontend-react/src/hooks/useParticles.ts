import { useState } from "react";

const STORAGE_KEY = "particles";

function readInitial(): boolean {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      return stored === "on";
    }
  } catch {
    // storage unavailable, fall through to default
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useParticles() {
  const [running, setRunning] = useState<boolean>(readInitial);

  const toggle = () => {
    const next = !running;
    setRunning(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // storage unavailable, the choice just won't persist
    }
  };

  return { running, toggle };
}
