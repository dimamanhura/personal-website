'use server';

import { db } from '@/db';
import { techStackInputSchema, TechStackInput, TechStackOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function createTechStack(values: TechStackInput): Promise<ManageItemFormState> {
  try {
    const result: TechStackOutput = techStackInputSchema.parse({
      displayOrder: values.displayOrder,
      categoryId: values.categoryId,
      title: values.title,
      type: values.type,
      logo: values.logo,
    });

    const techStack = await db.techStack.create({
      data: {
        displayOrder: result.displayOrder,
        categoryId: result.categoryId,
        title: result.title,
        type: result.type,
        logo: result.logo,
      },
    });

    revalidate.techStacks();

    return { success: true, id: techStack.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
