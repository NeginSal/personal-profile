import {
  SEASONS,
  SEASON_ICONS,
  SEASON_NAMES,
  type Season,
} from "../season";

interface SeasonSwitcherProps {
  season: Season;
  onChange: (season: Season) => void;
  particlesOn: boolean;
  onToggleParticles: () => void;
}

export function SeasonSwitcher({
  season,
  onChange,
  particlesOn,
  onToggleParticles,
}: SeasonSwitcherProps) {
  const particlesLabel = particlesOn ? "Stop animation" : "Start animation";

  return (
    <div className="season-switcher" role="group" aria-label="Theme controls">
      {SEASONS.map((s) => (
        <button
          key={s}
          type="button"
          aria-pressed={s === season}
          aria-label={SEASON_NAMES[s]}
          title={SEASON_NAMES[s]}
          onClick={() => onChange(s)}
        >
          {SEASON_ICONS[s]}
        </button>
      ))}
      <span className="switcher-divider" aria-hidden="true" />
      <button
        type="button"
        aria-label={particlesLabel}
        title={particlesLabel}
        onClick={onToggleParticles}
      >
        {particlesOn ? "⏸" : "▶"}
      </button>
    </div>
  );
}