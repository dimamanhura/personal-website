'use server';

import { z } from 'zod';
import { db } from '@/db';
import { technologyInputSchema, TechnologyInput, TechnologyOutput } from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkTechnologiesSchema = z.array(technologyInputSchema);

export async function createTechnologiesBulk(values: TechnologyInput[]) {
  try {
    const validatedData: TechnologyOutput[] = bulkTechnologiesSchema.parse(values);

    const sections = await db.technologySection.findMany({
      select: { id: true, type: true },
    });

    const sectionMap = new Map(sections.map((s) => [s.type, s.id]));

    await db.technology.createMany({
      data: validatedData.map((item) => ({
        title: item.title,
        sectionId: item.section ? sectionMap.get(item.section) || null : null,
        featured: item.featured,
      })),
    });

    revalidate.technologies();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
