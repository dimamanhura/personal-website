'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export const deleteProfile = async (id: string) => {
  const count = await db.meta.count();

  if (count === 1) {
    throw new Error('Profile can not be deleted');
  }

  await db.meta.delete({
    where: {
      id,
    },
  });

  revalidatePath(paths.profileDetailsByIdAdmin(id));
  revalidatePath(paths.profileAdmin());
  revalidatePath(paths.home());
  redirect(paths.profileAdmin());
};
