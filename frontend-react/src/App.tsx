import { useSeason } from "./hooks/useSeason";
import { useParticles } from "./hooks/useParticles";
import { Skills } from "./components/Skills";
import { Links } from "./components/Links";
import { SeasonSwitcher } from "./components/SeasonSwitcher";
import { Particles } from "./components/Particles";
import {
  intro,
  skills,
  linksTitle,
  socialLinks,
  imageCredit,
} from "./content";
import chessImage from "./assets/chess.jpeg";

function App() {
  const { season, setSeason } = useSeason();
  const { running, toggle } = useParticles();

  return (
    <>
      <Particles season={season} running={running} />
      <div className="page">
        <main className="content">
          <div>
            <h1>{intro.greeting}</h1>
            <p className="subtitle">{intro.role}</p>
          </div>
          <Skills skills={skills} />
          <Links title={linksTitle} links={socialLinks} />
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
              <a href={imageCredit.url} target="_blank" rel="noopener noreferrer">
                {imageCredit.text}
              </a>
            </figcaption>
          </figure>
        </aside>
      </div>
    </>
  );
}

export default App;