import paths from '@/paths';
import { Page } from '@/types';

export const pages: Page[] = [
  {
    title: 'Significant Projects',
    path: paths.projects(),
  },
  {
    title: 'Challenges & Achievements',
    path: paths.achievements(),
  },
  {
    title: 'Feedback',
    path: paths.feedback(),
  },
];

export const adminPages: Page[] = [
  {
    title: 'Profile',
    path: paths.profileAdmin(),
  },
  {
    title: 'Projects',
    path: paths.projectsAdmin(),
  },
  {
    title: 'Achievements',
    path: paths.achievementsAdmin(),
  },
  {
    title: 'Feedback',
    path: paths.feedbackAdmin(),
  },
  {
    title: 'Feedback Sections',
    path: paths.feedbackSectionsAdmin(),
  },
  {
    title: 'Companies',
    path: paths.companiesAdmin(),
  },
  {
    title: 'Education',
    path: paths.educationAdmin(),
  },
  {
    title: 'Tech Categories',
    path: paths.techCategoriesAdmin(),
  },
  {
    title: 'Tech Stacks',
    path: paths.techStacksAdmin(),
  },
  {
    title: 'Tech Tools',
    path: paths.techToolsAdmin(),
  },
  {
    title: 'Contact Requests',
    path: paths.contactRequestsAdmin(),
  },
];
