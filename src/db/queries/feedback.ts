import { cache } from 'react';
import type { FeedbackSection, Prisma } from '@prisma/client';
import { db } from '@/db';
import { Sort, PaginatedData } from '@/types';
import { DEFAULT_LIMIT } from '@/constants';

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

export const fetchReviewSections = cache((): Promise<FeedbackSection[]> => {
  return db.feedbackSection.findMany();
});

export const fetchReviewsBySection = cache((): Promise<FeedbackSectionWithReviews[]> => {
  return db.feedbackSection.findMany({
    include: {
      reviews: true,
    },
  });
});

export const fetchReviews = cache(
  async (params?: {
    orderBy?: Sort;
    page?: number;
  }): Promise<PaginatedData<ReviewWithFeedbackSection>> => {
    const { orderBy = { column: 'createdAt', direction: 'descending' }, page = 1 } = params || {};

    const items = await db.feedback.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      include: {
        feedbackSection: true,
      },
      take: DEFAULT_LIMIT,
      skip: (page - 1) * DEFAULT_LIMIT,
    });

    const count = await db.feedback.count();

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
