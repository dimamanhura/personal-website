'use server';

import { db } from '@/db';
import { techCategoryInputSchema, TechCategoryInput, TechCategoryOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function createTechCategory(values: TechCategoryInput): Promise<ManageItemFormState> {
  try {
    const result: TechCategoryOutput = techCategoryInputSchema.parse({
      title: values.title,
      type: values.type,
    });

    const techCategory = await db.techCategory.create({
      data: {
        title: result.title,
        type: result.type,
      },
    });

    revalidate.techCategories();

    return { success: true, id: techCategory.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
