'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { technologyInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function editTechnology(
  id: string,
  values: z.infer<typeof technologyInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = technologyInputSchema.parse({
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
    revalidatePath(paths.technologiesAdmin());
    revalidatePath(paths.technologiesDetailsByIdAdmin(id));
    return { success: true, id: technology.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
