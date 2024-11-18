import { cache } from "react";
import type { Feedback, Prisma } from "@prisma/client";
import { db } from "@/db";

export type FeedbackSectionWithReviews = Prisma.FeedbackSectionGetPayload<{ include: { reviews: true } }>

export const fetchFeaturedReviews = cache((): Promise<Feedback[]> => {
  return db.feedback.findMany({
    where: {
      featured: true,
    },
  });
});

export const fetchReviewsBySection = cache((): Promise<FeedbackSectionWithReviews[]> => {
  return db.feedbackSection.findMany({
    include: {
      reviews: true,
    },
  });
});
