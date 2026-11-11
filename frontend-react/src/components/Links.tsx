import type { SocialLink } from "../content";

interface LinksProps {
  title: string;
  links: SocialLink[];
}

export function Links({ title, links }: LinksProps) {
  return (
    <section className="links">
      <h2>{title}</h2>
      <ul className="links-list">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <Icon aria-hidden="true" />
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
