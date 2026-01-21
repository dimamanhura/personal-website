'use server';

import { db } from '@/db';
import { techToolInputSchema, TechToolInput, TechToolOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function editTechTool(
  id: string,
  values: TechToolInput,
): Promise<ManageItemFormState> {
  try {
    const result: TechToolOutput = techToolInputSchema.parse({
      title: values.title,
      featured: values.featured,
      stackId: values.stackId,
    });

    const techTool = await db.techTool.update({
      where: {
        id,
      },
      data: {
        title: result.title,
        stackId: result.stackId || null,
        featured: result.featured,
      },
    });

    revalidate.techTools(id);

    return { success: true, id: techTool.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
