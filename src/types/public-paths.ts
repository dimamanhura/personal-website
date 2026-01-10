export type PublicPaths = {
  home: () => string;
  projects: () => string;
  projectBySlug: (projectSlug: string) => string;
  achievements: () => string;
  feedback: () => string;
  signIn: () => string;
  signUp: () => string;
};
