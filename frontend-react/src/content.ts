import type { IconType } from "react-icons";
import { FaDev, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDuolingo, SiLichess } from "react-icons/si";

export interface SocialLink {
  label: string;
  url: string;
  icon: IconType;
}

export const intro = {
  greeting: "Hi, my name is Negin,",
  role: "I'm a DevOps engineer & professional chess player",
};

export const skills: string[] = [
  "Linux",
  "Kubernetes",
  "Docker",
  "Go",
  "GitHub Actions",
  "Git",
  "React",
  "Vue",
  "JavaScript",
  "Tailwind",
  "Bootstrap",
];

export const linksTitle = "Your move, find me here ♟";

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/negin-saljooghi-06835b174/",
    icon: FaLinkedin,
  },
  { label: "GitHub", url: "https://github.com/NeginSal", icon: FaGithub },
  { label: "DEV", url: "https://dev.to/negin", icon: FaDev },
  {
    label: "Lichess",
    url: "https://lichess.org/@/Negin007",
    icon: SiLichess,
  },
  {
    label: "Duolingo",
    url: "https://www.duolingo.com/profile/Negin007",
    icon: SiDuolingo,
  },
];

export const imageCredit = {
  text: "Image via Magnific",
  url: "https://www.magnific.com/free-photos-vectors/anime-girl-playing-chess",
};