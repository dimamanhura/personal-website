'use server';

import { z } from 'zod';
import { db } from '@/db';
import { achievementInputSchema, AchievementInput, AchievementOutput } from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkAchievementSchema = z.array(achievementInputSchema);

export async function createAchievementsBulk(values: AchievementInput[]) {
  try {
    const validatedData: AchievementOutput[] = bulkAchievementSchema.parse(values);

    await db.$transaction(async (tx) => {
      const createdItems = await Promise.all(
        validatedData.map((item) =>
          tx.achievement.create({
            data: {
              title: item.title,
              description: item.description,
              featured: item.featured,
              solution: item.solution,
              result: item.result,
              notes: item.notes,
            },
          }),
        ),
      );
      return createdItems;
    });

    revalidate.achievements();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
