import { cache } from "react";
import type { Achievement } from "@prisma/client";
import { db } from "@/db";
import { Sort } from "@/types/Sort";
import { DEFAULT_LIMIT } from "@/constants";
import { PaginatedData } from "@/types/PaginatedData";

export const fetchFeaturedAchievements = cache((): Promise<Achievement[]> => {
  return db.achievement.findMany({
    where: {
      featured: true,
    },
  });
});

export const fetchAchievements = cache(async (params?: {
  orderBy?: Sort,
  page?: number;
  all?: boolean 
}): Promise<PaginatedData<Achievement>> => {
  const { orderBy = { column: 'id', direction: 'descending' }, page = 1, all = false } = params || {};

  const items = await db.achievement.findMany({
    orderBy: {
      [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
    },
    take: all ? undefined : DEFAULT_LIMIT,
    skip: all ? 0 : (page - 1) * DEFAULT_LIMIT,
  });

  const count = await db.achievement.count();

  return { items, count };
});

export const fetchAchievementById = cache(async (id: string): Promise<Achievement | null> => {
  return await db.achievement.findFirst({
    where: { id },
  });
});