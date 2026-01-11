'use server';

import { z } from 'zod';
import { db } from '@/db';
import {
  technologySectionInputSchema,
  TechnologySectionInput,
  TechnologySectionOutput,
} from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkTechnologySectionSchema = z.array(technologySectionInputSchema);

export async function createTechnologySectionsBulk(values: TechnologySectionInput[]) {
  try {
    const validatedData: TechnologySectionOutput[] = bulkTechnologySectionSchema.parse(values);

    await db.technologySection.createMany({
      data: validatedData.map((item) => ({
        title: item.title,
        type: item.type,
        logo: item.logo,
      })),
    });

    revalidate.technologySections();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
