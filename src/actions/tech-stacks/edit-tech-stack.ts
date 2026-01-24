'use server';

import { db } from '@/db';
import { techStackInputSchema, TechStackInput, TechStackOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function editTechStack(
  id: string,
  values: TechStackInput,
): Promise<ManageItemFormState> {
  try {
    const result: TechStackOutput = techStackInputSchema.parse({
      displayOrder: values.displayOrder,
      categoryId: values.categoryId,
      featured: values.featured,
      title: values.title,
      type: values.type,
      logo: values.logo,
    });

    const tachStack = await db.techStack.update({
      where: {
        id,
      },
      data: {
        displayOrder: result.displayOrder,
        categoryId: result.categoryId,
        featured: result.featured,
        title: result.title,
        type: result.type,
        logo: result.logo,
      },
    });

    revalidate.techStacks(id);

    return { success: true, id: tachStack.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
