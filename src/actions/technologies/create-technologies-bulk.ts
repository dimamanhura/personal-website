'use server';

import { z } from 'zod';
import { db } from '@/db';
import { technologyInputSchema, TechnologyInput, TechnologyOutput } from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkTechnologiesSchema = z.array(technologyInputSchema);

export async function createTechnologiesBulk(values: TechnologyInput[]) {
  try {
    const validatedData: TechnologyOutput[] = bulkTechnologiesSchema.parse(values);

    const stacks = await db.techStack.findMany({
      select: { id: true, type: true },
    });

    const stackMap = new Map(stacks.map((s) => [s.type, s.id]));

    await db.technology.createMany({
      data: validatedData.map((item) => ({
        title: item.title,
        stackId: item.stack ? stackMap.get(item.stack) || null : null,
        featured: item.featured,
      })),
    });

    revalidate.technologies();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
