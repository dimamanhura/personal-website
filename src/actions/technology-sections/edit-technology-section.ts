'use server';

import { db } from '@/db';
import {
  technologySectionInputSchema,
  TechnologySectionInput,
  TechnologySectionOutput,
} from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function editTechnologySection(
  id: string,
  values: TechnologySectionInput,
): Promise<ManageItemFormState> {
  try {
    const result: TechnologySectionOutput = technologySectionInputSchema.parse({
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

    revalidate.technologySections(id);

    return { success: true, id: technologySection.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
