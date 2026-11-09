export interface Link {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  about: string;
  skills: string[];
  links: Link[];
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  url: string;
}
