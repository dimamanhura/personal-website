import { type PublicPaths, type AdminPaths, AdminEntity } from '@/types';

const publicPaths: PublicPaths = {
  home: () => '/',
  projects: () => '/projects',
  projectBySlug: (projectSlug: string) => `/projects/${projectSlug}`,
  achievements: () => '/achievements',
  feedback: () => '/feedback',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
};

const generateAdminPaths = (entity: AdminEntity): AdminPaths => {
  const path = entity.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  const paths: Partial<AdminPaths> = {};

  paths[`${entity}Admin`] = () => `/admin/${path}`;
  paths[`${entity}NewAdmin`] = () => `/admin/${path}/new`;
  paths[`${entity}DetailsByIdAdmin`] = (id: string) => `/admin/${path}/${id}`;
  paths[`${entity}EditByIdAdmin`] = (id: string) => `/admin/${path}/${id}/edit`;

  return paths as AdminPaths;
};

const paths: PublicPaths & AdminPaths = {
  ...publicPaths,
  ...generateAdminPaths(AdminEntity.profile),
  ...generateAdminPaths(AdminEntity.achievements),
  ...generateAdminPaths(AdminEntity.companies),
  ...generateAdminPaths(AdminEntity.contactRequests),
  ...generateAdminPaths(AdminEntity.education),
  ...generateAdminPaths(AdminEntity.feedback),
  ...generateAdminPaths(AdminEntity.feedbackSections),
  ...generateAdminPaths(AdminEntity.projects),
  ...generateAdminPaths(AdminEntity.technologies),
  ...generateAdminPaths(AdminEntity.technologySections),
};

export default paths;
