'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export const deleteTechnology = async (id: string) => {
  await db.technology.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.technologyDetails(id));
  revalidatePath(paths.technologiesAdmin());
  redirect(paths.technologiesAdmin());
};
