import { fetchProfile, fetchProjects } from "./api";
import { fallbackProfile, fallbackProjects } from "./fallback";
import { useApiData } from "./hooks/useApiData";
import { useSeason } from "./hooks/useSeason";
import { useParticles } from "./hooks/useParticles";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { SeasonSwitcher } from "./components/SeasonSwitcher";
import { Particles } from "./components/Particles";

function App() {
  const { data: profile, source } = useApiData(fetchProfile, fallbackProfile);
  const { data: projects } = useApiData(fetchProjects, fallbackProjects);
  const { season, setSeason } = useSeason();
  const { running, toggle } = useParticles();

  return (
    <>
      <Particles season={season} running={running} />
      <SeasonSwitcher
        season={season}
        onChange={setSeason}
        particlesOn={running}
        onToggleParticles={toggle}
      />
      <Hero name={profile.name} title={profile.title} links={profile.links} />
      <main>
        <About text={profile.about} />
        <Skills skills={profile.skills} />
        <Projects projects={projects} />
      </main>
      <Footer source={source} />
    </>
  );
}

export default App;