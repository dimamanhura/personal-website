import paths from "./paths";
import { Page } from "./types/Page";

const pages: Page[] = [
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

export default pages;