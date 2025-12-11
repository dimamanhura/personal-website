'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { technologySectionInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function createTechnologySection(
  values: z.infer<typeof technologySectionInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = technologySectionInputSchema.parse({
      title: values.title,
      logo: values.logo,
    });

    const technologySection = await db.technologySection.create({
      data: {
        title: result.title,
        logo: result.logo,
      },
    });

    revalidatePath(paths.technologySectionsAdmin());

    return { success: true, id: technologySection.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
