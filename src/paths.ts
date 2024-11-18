const paths = {
  home() {
    return '/';
  },
  technologies() {
    return '/technologies';
  },
  projects() {
    return '/projects';
  },
  projectBySlug(projectSlug: string) {
    return `/projects/${projectSlug}`;
  },
  achievements() {
    return '/achievements';
  },
  feedback() {
    return '/feedback';
  },
  
};

export default paths;
