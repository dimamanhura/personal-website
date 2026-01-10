'use server';

import { z } from 'zod';
import { db } from '@/db';
import { technologyInputSchema, TechnologyInput, TechnologyOutput } from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkTechnologiesSchema = z.array(technologyInputSchema);

export async function createTechnologiesBulk(values: TechnologyInput[]) {
  try {
    const validatedData: TechnologyOutput[] = bulkTechnologiesSchema.parse(values);

    await db.$transaction(async (tx) => {
      const sections = await tx.technologySection.findMany({
        select: { id: true, type: true },
      });

      const sectionMap = new Map(sections.map((s) => [s.type, s.id]));

      const createdItems = await Promise.all(
        validatedData.map((item) => {
          const sectionId = item.section ? sectionMap.get(item.section) : null;

          return tx.technology.create({
            data: {
              title: item.title,
              sectionId: sectionId || null,
              featured: item.featured,
            },
          });
        }),
      );
      return createdItems;
    });

    revalidate.technologies();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
