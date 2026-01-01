'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import paths from '@/paths';
import { achievementInputSchema, AchievementInput, AchievementOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function createAchievement(values: AchievementInput): Promise<ManageItemFormState> {
  try {
    const result: AchievementOutput = achievementInputSchema.parse({
      title: values.title,
      featured: values.featured,
      description: values.description,
      solution: values.solution,
      result: values.result,
      notes: values.notes,
    });

    const achievement = await db.achievement.create({
      data: {
        title: result.title,
        description: result.description,
        featured: result.featured,
        solution: result.solution,
        result: result.result,
        notes: result.notes,
      },
    });

    revalidatePath(paths.achievementsAdmin());
    revalidatePath(paths.achievements());
    revalidatePath(paths.home());

    return { success: true, id: achievement.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
