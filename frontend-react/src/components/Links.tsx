import type { IconType } from "react-icons";
import type { Link } from "../types";
import { ICONS } from "../icons";

interface LinksProps {
  title: string;
  links: Link[];
}

export function Links({ title, links }: LinksProps) {
  return (
    <section className="links">
      <h2>{title}</h2>
      <ul className="links-list">
        {links.map((link) => {
          const Icon: IconType | undefined = ICONS[link.icon];
          return (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {Icon && <Icon aria-hidden="true" />}
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}