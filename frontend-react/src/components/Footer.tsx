import type { Source } from "../hooks/useApiData";

interface FooterProps {
  source: Source;
}

export function Footer({ source }: FooterProps) {
  return (
    <footer>
      <p>Built with Go, Docker, GitHub Actions and React.</p>
      <p className="data-source">Data source: {source}</p>
    </footer>
  );
}
