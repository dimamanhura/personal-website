'use server';

import { z } from 'zod';
import { db } from '@/db';
import {
  technologySectionInputSchema,
  TechnologySectionInput,
  TechnologySectionOutput,
} from '@/schemas';
import { revalidate } from '@/utils';

const bulkTechnologySectionSchema = z.array(technologySectionInputSchema);

export async function createTechnologySectionsBulk(values: TechnologySectionInput[]) {
  const validatedData: TechnologySectionOutput[] = bulkTechnologySectionSchema.parse(values);

  await db.$transaction(async (tx) => {
    const createdItems = await Promise.all(
      validatedData.map((item) =>
        tx.technologySection.create({
          data: {
            title: item.title,
            logo: item.logo,
          },
        }),
      ),
    );
    return createdItems;
  });

  revalidate.technologySections();
}
