import { cache } from "react";
import type { Achievement } from "@prisma/client";
import { db } from "@/db";

export const fetchFeaturedAchievements = cache((): Promise<Achievement[]> => {
  return db.achievement.findMany({
    where: {
      featured: true,
    },
  });
});

export const fetchAchievements = cache((): Promise<Achievement[]> => {
  return db.achievement.findMany();
});
