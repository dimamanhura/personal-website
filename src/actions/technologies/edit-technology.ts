'use server';

import { z } from 'zod';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { formatErrors } from '@/utils';
import { ManageItemFormState } from '@/types';
import paths from '@/paths';
import { technologyInputSchema } from '@/schemas';

export async function editTechnology(
  id: string,
  values: z.infer<typeof technologyInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = technologyInputSchema.parse({
      title: values.title,
      featured: values.featured,
      section: values.section,
    });

    const technology = await db.technology.update({
      where: {
        id,
      },
      data: {
        title: result.title,
        section: result.section,
        featured: result.featured,
      },
    });
    revalidatePath(paths.technologiesAdmin());
    revalidatePath(paths.technologyDetails(id));
    return { success: true, id: technology.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
