'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidate } from '@/utils';

export const deleteAchievement = async (id: string) => {
  await db.achievement.delete({
    where: {
      id,
    },
  });

  revalidate.achievements(id);

  redirect(paths.achievementsAdmin());
};
