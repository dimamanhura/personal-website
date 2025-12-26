'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export const deleteProject = async (id: string) => {
  await db.project.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.profileDetailsByIdAdmin(id));
  revalidatePath(paths.projectsAdmin());
  redirect(paths.projectsAdmin());
};
