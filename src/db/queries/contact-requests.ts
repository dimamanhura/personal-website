import { cache } from 'react';
import type { ContactRequest } from '@prisma/client';
import { DEFAULT_LIMIT } from '@/constants';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';

export const fetchContactRequests = cache(
  async (params?: { orderBy?: Sort; page?: number }): Promise<PaginatedData<ContactRequest>> => {
    const { orderBy = { column: 'createdAt', direction: 'descending' }, page = 1 } = params || {};

    const items = await db.contactRequest.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: DEFAULT_LIMIT,
      skip: (page - 1) * DEFAULT_LIMIT,
    });

    const count = await db.contactRequest.count();

    return { items, count };
  },
);

export const fetchContactRequestById = cache(async (id: string): Promise<ContactRequest | null> => {
  return await db.contactRequest.findFirst({
    where: {
      id: id,
    },
  });
});
