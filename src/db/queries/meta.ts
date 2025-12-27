import { cache } from 'react';
import type { Meta } from '@prisma/client';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';
import { DEFAULT_LIMIT } from '@/constants';

export const fetchProfiles = cache(
  async (params?: {
    orderBy?: Sort;
    page?: number;
    all?: boolean;
  }): Promise<PaginatedData<Meta>> => {
    const {
      orderBy = { column: 'firstName', direction: 'descending' },
      page = 1,
      all = false,
    } = params || {};
    const items = await db.meta.findMany({
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

export const fetchProfileById = cache(async (id: string): Promise<Meta | null> => {
  return await db.meta.findFirst({
    where: {
      id,
    },
  });
});

export const fetchMeta = cache((): Promise<Meta | null> => {
  return db.meta.findFirst();
});
