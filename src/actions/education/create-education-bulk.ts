'use server';

import { z } from 'zod';
import { db } from '@/db';
import { educationInputSchema, EducationInput, EducationOutput } from '@/schemas';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

const bulkEducationSchema = z.array(educationInputSchema);

export async function createEducationBulk(values: EducationInput[]) {
  try {
    const validatedData: EducationOutput[] = bulkEducationSchema.parse(values);

    await db.education.createMany({
      data: validatedData.map((item) => ({
        location: item.location,
        name: item.name,
        title: item.title,
        degree: item.degree,
        logo: item.logo,
        startAt: normalizeToMidnight(item.startAt),
        endAt: item.endAt ? normalizeToMidnight(item.endAt) : null,
      })),
    });

    revalidate.education();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
