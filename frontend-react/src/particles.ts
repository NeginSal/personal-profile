import type { Season } from "./season";

export interface ParticleConfig {
  kind: "fall" | "float";
  glyphs: string[];
  count: number;
  minSize: number;
  maxSize: number;
  minSpeed: number;
  maxSpeed: number;
  sway: number;
  rotate: boolean;
}

export const PARTICLE_CONFIG: Record<Season, ParticleConfig> = {
  autumn: {
    kind: "fall",
    glyphs: ["🍂", "🍁"],
    count: 28,
    minSize: 16,
    maxSize: 28,
    minSpeed: 40,
    maxSpeed: 90,
    sway: 30,
    rotate: true,
  },
  winter: {
    kind: "fall",
    glyphs: ["❄️"],
    count: 45,
    minSize: 10,
    maxSize: 20,
    minSpeed: 30,
    maxSpeed: 70,
    sway: 20,
    rotate: false,
  },
  spring: {
    kind: "fall",
    glyphs: ["🌸"],
    count: 25,
    minSize: 14,
    maxSize: 22,
    minSpeed: 30,
    maxSpeed: 60,
    sway: 40,
    rotate: true,
  },
  summer: {
    kind: "float",
    glyphs: [],
    count: 30,
    minSize: 2,
    maxSize: 4,
    minSpeed: 10,
    maxSpeed: 25,
    sway: 25,
    rotate: false,
  },
};
