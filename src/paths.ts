const paths = {
  home() {
    return '/';
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
