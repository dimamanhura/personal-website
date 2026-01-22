'use server';

import { db } from '@/db';
import { techToolInputSchema, TechToolInput, TechToolOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function createTechTool(values: TechToolInput): Promise<ManageItemFormState> {
  try {
    const result: TechToolOutput = techToolInputSchema.parse({
      title: values.title,
      stackId: values.stackId,
      featured: values.featured,
      type: values.type,
    });

    const techTool = await db.techTool.create({
      data: {
        title: result.title,
        stackId: result.stackId || null,
        featured: result.featured,
        type: result.type,
      },
    });

    revalidate.techTools();

    return { success: true, id: techTool.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
