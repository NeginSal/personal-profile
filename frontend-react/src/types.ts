export interface Link {
  label: string;
  url: string;
  icon: string;
}

export interface ImageCredit {
  text: string;
  url: string;
}

export interface Profile {
  greeting: string;
  role: string;
  skills: string[];
  linksTitle: string;
  links: Link[];
  imageCredit: ImageCredit;
}