import { cache } from 'react';
import type { Education } from '@prisma/client';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';
import { DEFAULT_LIMIT } from '@/constants';

export const fetchUniversities = cache(
  async (params?: {
    orderBy?: Sort;
    page?: number;
    all?: boolean;
  }): Promise<PaginatedData<Education>> => {
    const {
      orderBy = { column: 'startAt', direction: 'descending' },
      page = 1,
      all = false,
    } = params || {};
    const items = await db.education.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: all ? undefined : DEFAULT_LIMIT,
      skip: all ? 0 : (page - 1) * DEFAULT_LIMIT,
    });

    const count = await db.education.count();

    return { items, count };
  },
);

export const fetchUniversityById = cache(async (id: string): Promise<Education | null> => {
  return await db.education.findFirst({
    where: {
      id: id,
    },
  });
});
