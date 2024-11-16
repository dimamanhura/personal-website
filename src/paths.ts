const paths = {
  home() {
    return '/';
  },
  search(term: string) {
    return `/search/?term=${term}`;
  },
  achievements() {
    return '/achievements';
  },
  feedback() {
    return '/feedback';
  },
  projects() {
    return '/projects';
  },
  projectBySlug(projectSlug: string) {
    return `/projects/${projectSlug}`;
  },
  technologies() {
    return '/technologies';
  },
};

export default paths;
