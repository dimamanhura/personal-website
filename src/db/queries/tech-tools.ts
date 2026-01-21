import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import { DEFAULT_LIMIT } from '@/constants';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';

export type TechToolWithStack = Prisma.TechToolGetPayload<{
  include: { stack: true };
}>;

export const fetchTechTools = cache(
  async (params?: {
    orderBy?: Sort;
    page?: number;
    all?: boolean;
  }): Promise<PaginatedData<TechToolWithStack>> => {
    const {
      orderBy = { column: 'id', direction: 'descending' },
      page = 1,
      all = false,
    } = params || {};

    const items = await db.techTool.findMany({
      include: {
        stack: true,
      },
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: all ? undefined : DEFAULT_LIMIT,
      skip: all ? 0 : (page - 1) * DEFAULT_LIMIT,
    });

    const count = await db.techTool.count();

    return { items, count };
  },
);

export const fetchTechToolById = cache(async (id: string): Promise<TechToolWithStack | null> => {
  return await db.techTool.findFirst({
    where: { id },
    include: {
      stack: true,
    },
  });
});
