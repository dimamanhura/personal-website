import { cache } from 'react';
import type { Prisma } from '@prisma/client';
import { DEFAULT_LIMIT } from '@/constants';
import { db } from '@/db';
import { PaginatedData, Sort } from '@/types';

export type ProjectWithTech = Prisma.ProjectGetPayload<{
  include: { integrations: true; stacks: true; tools: true };
}>;

export const fetchFeaturedSignificantProjects = cache((): Promise<ProjectWithTech[]> => {
  return db.project.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      startAt: 'desc',
    },
    include: {
      integrations: true,
      stacks: true,
      tools: true,
    },
  });
});

export const fetchSignificantProjectBySlug = cache(
  (slug: string): Promise<ProjectWithTech | null> => {
    return db.project.findFirst({
      where: {
        slug,
      },
      include: {
        integrations: true,
        stacks: true,
        tools: true,
      },
    });
  },
);

export const fetchSignificantProjects = cache((): Promise<ProjectWithTech[]> => {
  return db.project.findMany({
    orderBy: {
      startAt: 'desc',
    },
    include: {
      integrations: true,
      stacks: true,
      tools: true,
    },
  });
});

export const fetchProjectsById = cache((id: string): Promise<ProjectWithTech | null> => {
  return db.project.findFirst({
    where: {
      id,
    },
    include: {
      integrations: true,
      stacks: true,
      tools: true,
    },
  });
});

export const fetchProjects = cache(
  async (params?: { orderBy?: Sort; page?: number }): Promise<PaginatedData<ProjectWithTech>> => {
    const { orderBy = { column: 'startAt', direction: 'descending' }, page = 1 } = params || {};

    const items = await db.project.findMany({
      orderBy: {
        [orderBy.column]: orderBy.direction === 'descending' ? 'desc' : 'asc',
      },
      take: DEFAULT_LIMIT,
      skip: (page - 1) * DEFAULT_LIMIT,
      include: {
        integrations: true,
        stacks: true,
        tools: true,
      },
    });

    const count = await db.project.count();

    return { items, count };
  },
);
