import type { IconType } from "react-icons";
import { FaDev, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDuolingo, SiLichess } from "react-icons/si";

export const ICONS: Record<string, IconType> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  dev: FaDev,
  lichess: SiLichess,
  duolingo: SiDuolingo,
};