import { fetchProfile } from "./api";
import { fallbackProfile } from "./fallback";
import { useApiData } from "./hooks/useApiData";
import { useSeason } from "./hooks/useSeason";
import { useParticles } from "./hooks/useParticles";
import { Skills } from "./components/Skills";
import { Links } from "./components/Links";
import { SeasonSwitcher } from "./components/SeasonSwitcher";
import { Particles } from "./components/Particles";
import chessImage from "./assets/chess.jpeg";

function App() {
  const { data: profile, source } = useApiData(fetchProfile, fallbackProfile);
  const { season, setSeason } = useSeason();
  const { running, toggle } = useParticles();

  return (
    <>
      <Particles season={season} running={running} />
      <div className="page" data-source={source}>
        <main className="content">
          <div>
            <h1>{profile.greeting}</h1>
            <p className="subtitle">{profile.role}</p>
          </div>
          <Skills skills={profile.skills} />
          <Links title={profile.linksTitle} links={profile.links} />
          <SeasonSwitcher
            season={season}
            onChange={setSeason}
            particlesOn={running}
            onToggleParticles={toggle}
          />
        </main>
        <aside className="visual">
          <figure className="frame">
            <img src={chessImage} alt="Chess illustration" />
            <figcaption>
              <a
                href={profile.imageCredit.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.imageCredit.text}
              </a>
            </figcaption>
          </figure>
        </aside>
      </div>
    </>
  );
}

export default App;