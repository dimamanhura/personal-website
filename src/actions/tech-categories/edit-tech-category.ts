'use server';

import { db } from '@/db';
import { techCategoryInputSchema, TechCategoryInput, TechCategoryOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function editTechCategory(
  id: string,
  values: TechCategoryInput,
): Promise<ManageItemFormState> {
  try {
    const result: TechCategoryOutput = techCategoryInputSchema.parse({
      title: values.title,
      type: values.type,
    });

    const techCategory = await db.techCategory.update({
      where: {
        id,
      },
      data: {
        title: result.title,
        type: result.type,
      },
    });

    revalidate.techCategories(id);

    return { success: true, id: techCategory.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
