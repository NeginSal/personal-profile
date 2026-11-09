import { useEffect, useRef } from "react";
import type { Season } from "../season";
import { PARTICLE_CONFIG, type ParticleConfig } from "../particles";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  size: number;
  speed: number;
  phase: number;
  swaySpeed: number;
  rotation: number;
  rotationSpeed: number;
  glyph: string;
}

interface ParticlesProps {
  season: Season;
  running: boolean;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function createParticle(
  cfg: ParticleConfig,
  width: number,
  height: number,
  anywhere: boolean,
): Particle {
  const baseX = rand(0, width);
  return {
    x: baseX,
    baseX,
    y: anywhere ? rand(0, height) : -cfg.maxSize,
    size: rand(cfg.minSize, cfg.maxSize),
    speed: rand(cfg.minSpeed, cfg.maxSpeed),
    phase: rand(0, Math.PI * 2),
    swaySpeed: rand(0.5, 1.5),
    rotation: rand(0, Math.PI * 2),
    rotationSpeed: rand(-1, 1),
    glyph: cfg.glyphs.length
      ? cfg.glyphs[Math.floor(Math.random() * cfg.glyphs.length)]
      : "",
  };
}

export function Particles({ season, running }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !running) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const cfg = PARTICLE_CONFIG[season];
    let width = 0;
    let height = 0;
    let color = "";
    let rafId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };
    resize();
    window.addEventListener("resize", resize);

    const scale = Math.min(1, width / 900);
    const total = Math.max(12, Math.round(cfg.count * scale));
    const particles = Array.from({ length: total }, () =>
      createParticle(cfg, width, height, true),
    );

    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!color) {
        color = getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim();
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.phase += p.swaySpeed * dt;
        p.rotation += p.rotationSpeed * dt;

        if (cfg.kind === "fall") {
          p.y += p.speed * dt;
          if (p.y > height + p.size) {
            Object.assign(p, createParticle(cfg, width, height, false));
          }
        } else {
          p.y -= p.speed * dt * 0.5;
          if (p.y < -10) {
            p.y = height + 10;
          }
        }
        p.x = p.baseX + Math.sin(p.phase) * cfg.sway;

        if (cfg.kind === "fall") {
          ctx.globalAlpha = 0.85;
          ctx.save();
          ctx.translate(p.x, p.y);
          if (cfg.rotate) {
            ctx.rotate(p.rotation);
          }
          ctx.font = `${p.size}px serif`;
          ctx.fillText(p.glyph, 0, 0);
          ctx.restore();
        } else {
          ctx.globalAlpha = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(p.phase * 2));
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [season, running]);

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}
