import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import { DEFAULT_LIMIT } from '@/constants';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';

export type TechnologySectionWithTechnologies = Prisma.TechnologySectionGetPayload<{
  include: { technologies: true };
}>;

export const fetchTechnologySections = cache(
  async (params?: {
    onlyFeatured?: boolean;
    orderBy?: Sort;
    page?: number;
    all?: boolean;
  }): Promise<PaginatedData<TechnologySectionWithTechnologies>> => {
    const {
      onlyFeatured = true,
      orderBy = { column: 'id', direction: 'descending' },
      page = 1,
      all = false,
    } = params || {};

    const items = await db.technologySection.findMany({
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

    const count = await db.technologySection.count();

    return { items, count };
  },
);

export const fetchTechnologySectionById = cache(
  async (id: string): Promise<TechnologySectionWithTechnologies | null> => {
    return await db.technologySection.findFirst({
      where: { id },
      include: {
        technologies: true,
      },
    });
  },
);
