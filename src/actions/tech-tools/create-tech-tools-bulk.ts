'use server';

import { z } from 'zod';
import { db } from '@/db';
import { techToolInputSchema, TechToolInput, TechToolOutput } from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkTechToolSchema = z.array(techToolInputSchema);

export async function createTechToolsBulk(values: TechToolInput[]) {
  try {
    const validatedData: TechToolOutput[] = bulkTechToolSchema.parse(values);

    const stacks = await db.techStack.findMany({
      select: { id: true, type: true },
    });

    const stackMap = new Map(stacks.map((s) => [s.type, s.id]));

    await db.techTool.createMany({
      data: validatedData.map((item) => ({
        title: item.title,
        stackId: item.stack ? stackMap.get(item.stack) || null : null,
        featured: item.featured,
        type: item.type,
      })),
    });

    revalidate.techTools();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
