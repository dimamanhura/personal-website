'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteFeedbackSection = async (id: string) => {
  await db.feedbackSection.delete({
    where: {
      id,
    },
  });

  revalidate.feedbackSections(id);

  redirect(paths.feedbackSectionsAdmin());
};
