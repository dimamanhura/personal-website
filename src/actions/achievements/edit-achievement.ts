'use server';

import { z } from 'zod';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { formatErrors } from '@/utils';
import { ManageItemFormState } from '@/types';
import paths from '@/paths';
import { achievementInputSchema } from '@/schemas';

export async function editAchievement(
  id: string,
  values: z.infer<typeof achievementInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = achievementInputSchema.parse({
      title: values.title,
      featured: values.featured,
      description: values.description,
      solution: values.solution,
      result: values.result,
      notes: values.notes,
    });

    const achievement = await db.achievement.update({
      where: {
        id,
      },
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
    revalidatePath(paths.achievementsDetails(id));
    return { success: true, id: achievement.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
