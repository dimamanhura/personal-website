'use server';

import { db } from '@/db';
import { technologyInputSchema, TechnologyInput, TechnologyOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function editTechnology(
  id: string,
  values: TechnologyInput,
): Promise<ManageItemFormState> {
  try {
    const result: TechnologyOutput = technologyInputSchema.parse({
      title: values.title,
      featured: values.featured,
      sectionId: values.sectionId,
    });

    const technology = await db.technology.update({
      where: {
        id,
      },
      data: {
        title: result.title,
        sectionId: result.sectionId || null,
        featured: result.featured,
      },
    });

    revalidate.technologies(id);

    return { success: true, id: technology.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
