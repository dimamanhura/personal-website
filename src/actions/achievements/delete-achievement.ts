'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export const deleteAchievement = async (id: string) => {
  await db.achievement.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.achievementsDetailsByIdAdmin(id));
  revalidatePath(paths.achievementsAdmin());
  revalidatePath(paths.achievements());
  revalidatePath(paths.home());
  redirect(paths.achievementsAdmin());
};
