import { cache } from 'react';
import type { Project } from '@prisma/client';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';
import { DEFAULT_LIMIT } from '@/constants';

export const fetchFeaturedSignificantProjects = cache((): Promise<Project[]> => {
  return db.project.findMany({
    where: {
      featured: true,
    },
  });
});

export const fetchSignificantProjectBySlug = cache((slug: string): Promise<Project | null> => {
  return db.project.findFirst({
    where: {
      slug,
    },
  });
});

export const fetchSignificantProjects = cache((): Promise<Project[]> => {
  return db.project.findMany();
});

export const fetchProjectsById = cache((id: string): Promise<Project | null> => {
  return db.project.findFirst({
    where: {
      id,
    },
  });
});

export const fetchProjects = cache(
  async (params?: { orderBy?: Sort; page?: number }): Promise<PaginatedData<Project>> => {
    const { orderBy = { column: 'startAt', direction: 'descending' }, page = 1 } = params || {};

    const items = await db.project.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: DEFAULT_LIMIT,
      skip: (page - 1) * DEFAULT_LIMIT,
    });

    const count = await db.project.count();

    return { items, count };
  },
);
