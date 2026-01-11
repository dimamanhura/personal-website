import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import { DEFAULT_LIMIT } from '@/constants';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';

export type FeedbackSectionWithReviews = Prisma.FeedbackSectionGetPayload<{
  include: { reviews: true };
}>;

export const fetchFeedbackSections = cache(
  async (params?: {
    orderBy?: Sort;
    page?: number;
  }): Promise<PaginatedData<FeedbackSectionWithReviews>> => {
    const { orderBy = { column: 'id', direction: 'descending' }, page = 1 } = params || {};

    const items = await db.feedbackSection.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: DEFAULT_LIMIT,
      skip: (page - 1) * DEFAULT_LIMIT,
      include: {
        reviews: true,
      },
    });

    const count = await db.feedbackSection.count();

    return { items, count };
  },
);

export const fetchFeedbackSectionById = cache(
  async (id: string): Promise<FeedbackSectionWithReviews | null> => {
    return await db.feedbackSection.findFirst({
      where: { id },
      include: {
        reviews: true,
      },
    });
  },
);
