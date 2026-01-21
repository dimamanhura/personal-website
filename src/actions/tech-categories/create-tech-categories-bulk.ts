'use server';

import { z } from 'zod';
import { db } from '@/db';
import { techCategoryInputSchema, TechCategoryInput, TechCategoryOutput } from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkTechCategorySchema = z.array(techCategoryInputSchema);

export async function createTechCategoriesBulk(values: TechCategoryInput[]) {
  try {
    const validatedData: TechCategoryOutput[] = bulkTechCategorySchema.parse(values);

    await db.techCategory.createMany({
      data: validatedData.map((item) => ({
        title: item.title,
        type: item.type,
      })),
    });

    revalidate.techCategories();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
