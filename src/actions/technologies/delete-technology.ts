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
  revalidatePath(paths.technologiesDetailsByIdAdmin(id));
  revalidatePath(paths.technologiesAdmin());
  revalidatePath(paths.home());
  redirect(paths.technologiesAdmin());
};
