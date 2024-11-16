import { cache } from "react";
import type { Feedback } from "@prisma/client";
import { db } from "@/db";

export const fetchFeaturedReviews = cache((): Promise<Feedback[]> => {
  return db.feedback.findMany({
    where: {
      featured: true,
    },
  });
});

