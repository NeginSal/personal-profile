import type { Link } from "../types";

interface HeroProps {
  name: string;
  title: string;
  links: Link[];
}

export function Hero({ name, title, links }: HeroProps) {
  return (
    <header className="hero">
      <h1>{name}</h1>
      <p className="hero-title">{title}</p>
      <nav className="hero-links">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
