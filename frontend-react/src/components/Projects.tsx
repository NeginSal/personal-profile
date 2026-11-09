import type { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section>
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <article key={project.url} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p className="project-tags">{project.tags.join(" · ")}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
