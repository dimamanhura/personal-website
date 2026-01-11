import { revalidatePath } from 'next/cache';
import paths from '@/paths';

export const revalidate = {
  achievements: (id?: string) => {
    revalidatePath(paths.achievementsAdmin());
    revalidatePath(paths.achievements());
    revalidatePath(paths.home());

    if (id) {
      revalidatePath(paths.achievementsDetailsByIdAdmin(id));
    }
  },

  projects: (id?: string) => {
    revalidatePath(paths.projectsAdmin());
    revalidatePath(paths.projects());
    revalidatePath(paths.projects(), 'layout');
    revalidatePath(paths.home());

    if (id) {
      revalidatePath(paths.projectsDetailsByIdAdmin(id));
    }
  },

  technologies: (id?: string) => {
    revalidatePath(paths.technologiesAdmin());
    revalidatePath(paths.home());

    if (id) {
      revalidatePath(paths.technologiesDetailsByIdAdmin(id));
    }
  },

  technologySections: (id?: string) => {
    revalidatePath(paths.technologySectionsAdmin());
    revalidatePath(paths.technologiesNewAdmin());
    revalidatePath(paths.home());

    if (id) {
      revalidatePath(paths.technologySectionsDetailsByIdAdmin(id));
    }
  },

  profile: (id?: string) => {
    revalidatePath(paths.profileAdmin());
    revalidatePath(paths.home());

    if (id) {
      revalidatePath(paths.profileDetailsByIdAdmin(id));
    }
  },

  education: (id?: string) => {
    revalidatePath(paths.educationAdmin());
    revalidatePath(paths.home());

    if (id) {
      revalidatePath(paths.educationDetailsByIdAdmin(id));
    }
  },

  companies: (id?: string) => {
    revalidatePath(paths.home());
    revalidatePath(paths.companiesAdmin());

    if (id) {
      revalidatePath(paths.companiesEditByIdAdmin(id));
    }
  },

  feedback: (id?: string) => {
    revalidatePath(paths.feedbackAdmin());
    revalidatePath(paths.feedback());
    revalidatePath(paths.home());

    if (id) {
      revalidatePath(paths.feedbackDetailsByIdAdmin(id));
    }
  },

  feedbackSections: (id?: string) => {
    revalidatePath(paths.feedbackSectionsAdmin());
    revalidatePath(paths.feedback());
    revalidatePath(paths.home());

    if (id) {
      revalidatePath(paths.feedbackSectionsDetailsByIdAdmin(id));
    }
  },

  contactRequests: (id?: string) => {
    revalidatePath(paths.contactRequestsAdmin());

    if (id) {
      revalidatePath(paths.contactRequestsDetailsByIdAdmin(id));
    }
  },
};
