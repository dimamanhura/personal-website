'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import paths from '@/paths';
import { companyInputSchema, CompanyInput, CompanyOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight } from '@/utils';

export async function createCompany(values: CompanyInput): Promise<ManageItemFormState> {
  try {
    const result: CompanyOutput = companyInputSchema.parse({
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
        startAt: normalizeToMidnight(result.startAt),
        endAt: result.endAt ? normalizeToMidnight(result.endAt) : null,
        logo: result.logo,
        position: result.position,
        positions: result.positions.map((position) => ({
          ...position,
          startAt: normalizeToMidnight(position.startAt),
          endAt: position.endAt ? normalizeToMidnight(position.endAt) : null,
        })),
        reasonsOfLeaving: result.reasonsOfLeaving,
      },
    });

    revalidatePath(paths.companiesAdmin());
    revalidatePath(paths.home());

    return { success: true, id: company.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
