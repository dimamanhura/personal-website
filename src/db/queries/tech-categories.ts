import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import { DEFAULT_LIMIT } from '@/constants';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';

export type TechCategoryWithStacks = Prisma.TechCategoryGetPayload<{
  include: { stacks: true };
}>;

export const fetchTechCategories = cache(
  async (params?: {
    orderBy?: Sort;
    page?: number;
    all?: boolean;
  }): Promise<PaginatedData<TechCategoryWithStacks>> => {
    const {
      orderBy = { column: 'id', direction: 'descending' },
      page = 1,
      all = false,
    } = params || {};

    const items = await db.techCategory.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: all ? undefined : DEFAULT_LIMIT,
      skip: all ? 0 : (page - 1) * DEFAULT_LIMIT,
      include: {
        stacks: true,
      },
    });

    const count = await db.techCategory.count();

    return { items, count };
  },
);

export const fetchTechCategoryById = cache(
  async (id: string): Promise<TechCategoryWithStacks | null> => {
    return await db.techCategory.findFirst({
      where: { id },
      include: {
        stacks: true,
      },
    });
  },
);
