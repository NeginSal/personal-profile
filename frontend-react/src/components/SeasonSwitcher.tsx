import { SEASONS, SEASON_LABELS, type Season } from "../season";

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
  return (
    <div className="season-switcher" role="group" aria-label="Theme controls">
      {SEASONS.map((s) => (
        <button
          key={s}
          type="button"
          aria-pressed={s === season}
          onClick={() => onChange(s)}
        >
          {SEASON_LABELS[s]}
        </button>
      ))}
      <button type="button" onClick={onToggleParticles}>
        {particlesOn ? "⏸ Stop" : "▶ Start"}
      </button>
    </div>
  );
}