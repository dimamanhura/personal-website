import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import { DEFAULT_LIMIT } from '@/constants';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';

export type TechStackWithTechnologies = Prisma.TechStackGetPayload<{
  include: { technologies: true };
}>;

export const fetchTechStacks = cache(
  async (params?: {
    onlyFeatured?: boolean;
    orderBy?: Sort;
    page?: number;
    all?: boolean;
  }): Promise<PaginatedData<TechStackWithTechnologies>> => {
    const {
      onlyFeatured = true,
      orderBy = { column: 'id', direction: 'descending' },
      page = 1,
      all = false,
    } = params || {};

    const items = await db.techStack.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: all ? undefined : DEFAULT_LIMIT,
      skip: all ? 0 : (page - 1) * DEFAULT_LIMIT,
      include: {
        technologies: {
          where: onlyFeatured
            ? {
                featured: onlyFeatured || undefined,
              }
            : undefined,
        },
      },
    });

    const count = await db.techStack.count();

    return { items, count };
  },
);

export const fetchTechStackById = cache(
  async (id: string): Promise<TechStackWithTechnologies | null> => {
    return await db.techStack.findFirst({
      where: { id },
      include: {
        technologies: true,
      },
    });
  },
);
