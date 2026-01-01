'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

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

  revalidate.profile(id);

  redirect(paths.profileAdmin());
};
