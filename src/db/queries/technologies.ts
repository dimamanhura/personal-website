import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { db } from "@/db";
import { PaginatedData, Sort } from "@/types";
import { DEFAULT_LIMIT } from "@/constants";

export type TechnologySectionWithTechnologies = Prisma.TechnologySectionGetPayload<{ include: { technologies: true } }>

export const fetchTechnologiesSections = cache((): Promise<TechnologySectionWithTechnologies[]> => {
  return db.technologySection.findMany({
    include: {
      technologies: {
        where: {
          featured: true,
        },
      }
    }
  });
});

export type TechnologyWithSection = Prisma.TechnologyGetPayload<{ include: { technologySection: true } }>

export const fetchTechnologies = cache(async (params?: {
  orderBy?: Sort,
  page?: number;
  all?: boolean 
}): Promise<PaginatedData<TechnologyWithSection>> => {
  const { orderBy = { column: 'id', direction: 'descending' }, page = 1, all = false } = params || {};

  const items = await db.technology.findMany({
    include: {
      technologySection: true,
    },
    orderBy: {
      [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
    },
    take: all ? undefined : DEFAULT_LIMIT,
    skip: all ? 0 : (page - 1) * DEFAULT_LIMIT,
  });

  const count = await db.technology.count();

  return { items, count };
});