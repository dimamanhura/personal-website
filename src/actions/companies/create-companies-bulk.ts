'use server';

import { z } from 'zod';
import { db } from '@/db';
import { companyInputSchema, CompanyInput, CompanyOutput } from '@/schemas';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

const bulkCompanySchema = z.array(companyInputSchema);

export async function createCompaniesBulk(values: CompanyInput[]) {
  try {
    const validatedData: CompanyOutput[] = bulkCompanySchema.parse(values);

    await db.$transaction(async (tx) => {
      const createdItems = await Promise.all(
        validatedData.map((item) =>
          tx.company.create({
            data: {
              name: item.name,
              location: item.location,
              startAt: normalizeToMidnight(item.startAt),
              endAt: item.endAt ? normalizeToMidnight(item.endAt) : null,
              logo: item.logo,
              position: item.position,
              positions: item.positions.map((position) => ({
                ...position,
                startAt: normalizeToMidnight(position.startAt),
                endAt: position.endAt ? normalizeToMidnight(position.endAt) : null,
              })),
              reasonsOfLeaving: item.reasonsOfLeaving,
            },
          }),
        ),
      );
      return createdItems;
    });

    revalidate.companies();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
