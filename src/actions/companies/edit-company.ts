'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { companyInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function editCompany(
  id: string,
  company: z.infer<typeof companyInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = companyInputSchema.parse({
      name: company.name,
      location: company.location,
      startAt: company.startAt,
      endAt: company.endAt,
      logo: company.logo,
      position: company.position,
      positions: company.positions,
      reasonsOfLeaving: company.reasonsOfLeaving,
    });

    await db.company.update({
      where: {
        id,
      },
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

    revalidatePath(paths.companiesEditByIdAdmin(id));
    revalidatePath(paths.companiesAdmin());

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
