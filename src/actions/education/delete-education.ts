'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export const deleteEducation = async (id: string) => {
  await db.education.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.educationDetailsByIdAdmin(id));
  revalidatePath(paths.educationAdmin());
  revalidatePath(paths.home());
  redirect(paths.educationAdmin());
};
