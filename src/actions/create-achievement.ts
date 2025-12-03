'use server';

import { z } from 'zod';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { formatErrors } from '@/utils/format-errors';
import { CreateItemFormState } from '@/types/CreateItemFormState';
import paths from '@/paths';
import { achievementInputSchema } from '@/types/AchievementInputSchema';

export async function createAchievement(values: z.infer<typeof achievementInputSchema>): Promise<CreateItemFormState> {
  try {
    const result = achievementInputSchema.parse({
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
    return { success: true, id: achievement.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
};
