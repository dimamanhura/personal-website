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
  revalidatePath(paths.achievementsDetails(id));
  revalidatePath(paths.achievementsAdmin());
  redirect(paths.achievementsAdmin());
};
