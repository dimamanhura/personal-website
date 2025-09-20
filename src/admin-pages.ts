import adminPaths from "./admin-paths";
import { Page } from "./types/Page";

const adminPages: Page[] = [
  {
    title: 'Profile',
    path: adminPaths.profile(),
  },
  {
    title: 'Projects',
    path: adminPaths.projects(),
  },
  {
    title: 'Achievements',
    path: adminPaths.achievements(),
  },
  {
    title: 'Feedback',
    path: adminPaths.feedback(),
  },
  {
    title: 'Companies',
    path: adminPaths.companies(),
  },
  {
    title: 'Education',
    path: adminPaths.education(),
  },
  {
    title: 'Technologies',
    path: adminPaths.technologies(),
  },
  {
    title: 'Technology Sections',
    path: adminPaths.technologySections(),
  },
  {
    title: 'Contact Requests',
    path: adminPaths.contactRequests(),
  },
];

export default adminPages;
