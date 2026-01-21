'use server';

import { db } from '@/db';
import { technologyInputSchema, TechnologyInput, TechnologyOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function createTechnology(values: TechnologyInput): Promise<ManageItemFormState> {
  try {
    const result: TechnologyOutput = technologyInputSchema.parse({
      title: values.title,
      stackId: values.stackId,
      featured: values.featured,
    });

    const technology = await db.technology.create({
      data: {
        title: result.title,
        stackId: result.stackId || null,
        featured: result.featured,
      },
    });

    revalidate.technologies();

    return { success: true, id: technology.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
