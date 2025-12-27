import { cache } from 'react';
import type { Company } from '@prisma/client';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';
import { DEFAULT_LIMIT } from '@/constants';

export const fetchCompanies = cache(
  async (params?: { orderBy?: Sort; page?: number }): Promise<PaginatedData<Company>> => {
    const { orderBy = { column: 'startAt', direction: 'descending' }, page = 1 } = params || {};

    const items = await db.company.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: DEFAULT_LIMIT,
      skip: (page - 1) * DEFAULT_LIMIT,
    });

    const count = await db.company.count();

    return { items, count };
  },
);

export const fetchCompanyById = cache(async (id: string): Promise<Company | null> => {
  return await db.company.findFirst({
    where: {
      id,
    },
  });
});
