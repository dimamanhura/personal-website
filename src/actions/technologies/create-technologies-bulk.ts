'use server';

import { z } from 'zod';
import { db } from '@/db';
import { technologyInputSchema, TechnologyInput, TechnologyOutput } from '@/schemas';
import { revalidate } from '@/utils';

const bulkTechnologiesSchema = z.array(technologyInputSchema);

export async function createTechnologiesBulk(values: TechnologyInput[]) {
  const validatedData: TechnologyOutput[] = bulkTechnologiesSchema.parse(values);

  await db.$transaction(async (tx) => {
    const createdItems = await Promise.all(
      validatedData.map((item) =>
        tx.technology.create({
          data: {
            title: item.title,
            sectionId: item.sectionId || null,
            featured: item.featured,
          },
        }),
      ),
    );
    return createdItems;
  });

  revalidate.technologies();
}
