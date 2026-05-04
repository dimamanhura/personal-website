import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import { DEFAULT_LIMIT } from '@/constants';
import { db } from '@/db';
import { Sort, PaginatedData } from '@/types';

export type FeedbackSectionWithReviews = Prisma.FeedbackSectionGetPayload<{
  include: { reviews: true };
}>;

export type ReviewWithFeedbackSection = Prisma.FeedbackGetPayload<{
  include: { feedbackSection: true };
}>;

export const fetchFeaturedReviews = cache((): Promise<ReviewWithFeedbackSection[]> => {
  return db.feedback.findMany({
    where: {
      featured: true,
    },
    include: {
      feedbackSection: true,
    },
  });
});

export const fetchReviews = cache(
  async (params?: {
    orderBy?: Sort;
    where?: { id?: string; feedbackSection?: { type: string } };
    page?: number;
  }): Promise<PaginatedData<ReviewWithFeedbackSection>> => {
    const {
      where = {},
      orderBy = { column: 'receivedAt', direction: 'descending' },
      page = 1,
    } = params || {};

    const items = await db.feedback.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      include: {
        feedbackSection: true,
      },
      where,
      take: DEFAULT_LIMIT,
      skip: (page - 1) * DEFAULT_LIMIT,
    });

    const count = await db.feedback.count({ where });

    return { items, count };
  },
);

export const fetchFeedbackById = cache(
  async (id: string): Promise<ReviewWithFeedbackSection | null> => {
    return await db.feedback.findFirst({
      where: {
        id: id,
      },
      include: {
        feedbackSection: true,
      },
    });
  },
);
