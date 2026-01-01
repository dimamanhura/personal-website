'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export const deleteFeedback = async (id: string) => {
  await db.feedback.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.feedbackDetailsByIdAdmin(id));
  revalidatePath(paths.feedbackAdmin());
  revalidatePath(paths.feedback());
  revalidatePath(paths.home());
  redirect(paths.feedbackAdmin());
};
