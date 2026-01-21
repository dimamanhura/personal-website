'use server';

import { z } from 'zod';
import { db } from '@/db';
import { techStackInputSchema, TechStackInput, TechStackOutput } from '@/schemas';
import { formatErrors, revalidate } from '@/utils';

const bulkTechStackSchema = z.array(techStackInputSchema);

export async function createTechStacksBulk(values: TechStackInput[]) {
  try {
    const validatedData: TechStackOutput[] = bulkTechStackSchema.parse(values);

    const categories = await db.techCategory.findMany({
      select: { id: true, type: true },
    });

    const categoriesMap = new Map(categories.map((s) => [s.type, s.id]));

    await db.techStack.createMany({
      data: validatedData.map((item) => ({
        categoryId: item.category ? categoriesMap.get(item.category) || null : null,
        title: item.title,
        type: item.type,
        logo: item.logo,
      })),
    });

    revalidate.techStacks();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
