const paths = {
  // public
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
  // admin
  achievementsAdmin() {
    return '/admin/achievements';
  },
  addAchievement() {
    return '/admin/achievements/new';
  },
  achievementsDetails(id: string) {
    return `/admin/achievements/${id}`;
  },
  editAchievement(id: string) {
    return `/admin/achievements/${id}/edit`;
  },
  companiesAdmin() {
    return '/admin/companies';
  },
  contactRequestsAdmin() {
    return '/admin/contact-requests';
  },
  contactRequestDetails(id: string) {
    return `/admin/contact-requests/${id}`;
  },
  editContactRequest(id: string) {
    return `/admin/contact-requests/${id}/edit`;
  },
  educationAdmin() {
    return '/admin/education';
  },
  feedbackAdmin() {
    return '/admin/feedback';
  },
  addFeedback() {
    return '/admin/feedback/new';
  },
  feedbackDetails(id: string) {
    return `/admin/feedback/${id}`;
  },
  editFeedback(id: string) {
    return `/admin/feedback/${id}/edit`;
  },
  profileAdmin() {
    return '/admin/profile';
  },
  projectsAdmin() {
    return '/admin/projects';
  },
  technologiesAdmin() {
    return '/admin/technologies';
  },
  addTechnology() {
    return '/admin/technologies/new';
  },
  technologyDetails(id: string) {
    return `/admin/technologies/${id}`;
  },
  editTechnology(id: string) {
    return `/admin/technologies/${id}/edit`;
  },
  technologySectionsAdmin() {
    return '/admin/technology-sections';
  },
  // auth
  signIn() {
    return '/sign-in';
  },
  signUp() {
    return '/sign-up';
  },
};

export default paths;
