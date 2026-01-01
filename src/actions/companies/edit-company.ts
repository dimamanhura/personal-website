'use server';

import { db } from '@/db';
import { companyInputSchema, CompanyInput, CompanyOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

export async function editCompany(id: string, company: CompanyInput): Promise<ManageItemFormState> {
  try {
    const result: CompanyOutput = companyInputSchema.parse({
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

    revalidate.companies(id);

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
