'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteFeedback = async (id: string) => {
  await db.feedback.delete({
    where: {
      id,
    },
  });

  revalidate.feedback(id);

  redirect(paths.feedbackAdmin());
};
