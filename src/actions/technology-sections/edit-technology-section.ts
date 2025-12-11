'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { technologySectionInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function editTechnologySection(
  id: string,
  values: z.infer<typeof technologySectionInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = technologySectionInputSchema.parse({
      title: values.title,
      logo: values.logo,
    });

    const technologySection = await db.technologySection.update({
      where: {
        id,
      },
      data: {
        title: result.title,
        logo: result.logo,
      },
    });
    revalidatePath(paths.technologySectionsAdmin());
    revalidatePath(paths.technologySectionsDetailsByIdAdmin(id));
    return { success: true, id: technologySection.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
