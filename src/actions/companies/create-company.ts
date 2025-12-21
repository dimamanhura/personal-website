'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { companyInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function createCompany(
  values: z.infer<typeof companyInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = companyInputSchema.parse({
      name: values.name,
      location: values.location,
      startAt: values.startAt,
      endAt: values.endAt,
      logo: values.logo,
      position: values.position,
      positions: values.positions,
      reasonsOfLeaving: values.reasonsOfLeaving,
    });

    const company = await db.company.create({
      data: {
        name: result.name,
        location: result.location,
        startAt: result.startAt,
        endAt: result.endAt,
        logo: result.logo,
        position: result.position,
        positions: result.positions,
        reasonsOfLeaving: result.reasonsOfLeaving,
      },
    });

    revalidatePath(paths.companiesAdmin());

    return { success: true, id: company.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
