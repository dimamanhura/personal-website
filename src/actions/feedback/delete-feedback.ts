'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { redirect } from 'next/navigation';

export const deleteFeedback = async (id: string) => {
  await db.feedback.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.feedbackDetails(id));
  revalidatePath(paths.feedbackAdmin());
  redirect(paths.feedbackAdmin());
};
