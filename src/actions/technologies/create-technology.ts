'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { technologyInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function createTechnology(
  values: z.infer<typeof technologyInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = technologyInputSchema.parse({
      title: values.title,
      sectionId: values.sectionId,
      featured: values.featured,
    });

    const technology = await db.technology.create({
      data: {
        title: result.title,
        sectionId: result.sectionId || null,
        featured: result.featured,
      },
    });

    revalidatePath(paths.technologiesAdmin());

    return { success: true, id: technology.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
