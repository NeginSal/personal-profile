import type { Profile, Project } from "./types";

export const fallbackProfile: Profile = {
  name: "Negin Saljooghi",
  title: "DevOps Engineer",
  about: "I build and automate things. This site is my DevOps playground.",
  skills: ["Linux", "Kubernetes", "Docker", "Go", "GitHub Actions", "Git"],
  links: [{ label: "GitHub", url: "https://github.com/NeginSal" }],
};

export const fallbackProjects: Project[] = [
  {
    name: "Personal Profile",
    description: "This website: Go backend, CI/CD pipeline, containerized.",
    tags: ["Go", "Docker", "GitHub Actions"],
    url: "https://github.com/NeginSal/personal-profile",
  },
];
