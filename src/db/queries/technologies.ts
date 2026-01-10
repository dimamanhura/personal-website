import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import { DEFAULT_LIMIT } from '@/constants';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';

export type TechnologyWithSection = Prisma.TechnologyGetPayload<{
  include: { section: true };
}>;

export const fetchTechnologies = cache(
  async (params?: {
    orderBy?: Sort;
    page?: number;
    all?: boolean;
  }): Promise<PaginatedData<TechnologyWithSection>> => {
    const {
      orderBy = { column: 'id', direction: 'descending' },
      page = 1,
      all = false,
    } = params || {};

    const items = await db.technology.findMany({
      include: {
        section: true,
      },
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: all ? undefined : DEFAULT_LIMIT,
      skip: all ? 0 : (page - 1) * DEFAULT_LIMIT,
    });

    const count = await db.technology.count();

    return { items, count };
  },
);

export const fetchTechnologyById = cache(
  async (id: string): Promise<TechnologyWithSection | null> => {
    return await db.technology.findFirst({
      where: { id },
      include: {
        section: true,
      },
    });
  },
);
