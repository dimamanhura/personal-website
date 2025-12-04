'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { redirect } from 'next/navigation';

export const deleteAchievement = async (id: string) => {
  await db.achievement.delete({
    where: {
      id,
    },
  });
  revalidatePath(paths.achievementsDetails(id));
  revalidatePath(paths.achievementsAdmin());
  redirect(paths.achievementsAdmin());
};
