'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { redirect } from 'next/navigation';

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
