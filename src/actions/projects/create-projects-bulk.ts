'use server';

import { z } from 'zod';
import { db } from '@/db';
import { projectInputSchema, ProjectInput, ProjectOutput } from '@/schemas';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

const bulkProjectSchema = z.array(projectInputSchema);

export async function createProjectsBulk(values: ProjectInput[]) {
  try {
    const validatedData: ProjectOutput[] = bulkProjectSchema.parse(values);

    await db.$transaction(async (tx) => {
      const createdItems = await Promise.all(
        validatedData.map((item) =>
          tx.project.create({
            data: {
              name: item.name,
              slug: item.slug,
              shortDescription: item.shortDescription,
              longDescription: item.longDescription,
              features: item.features,
              startAt: normalizeToMidnight(item.startAt),
              endAt: item.endAt ? normalizeToMidnight(item.endAt) : null,
              logo: item.logo,
              position: item.position,
              team: item.team,
              featured: item.featured,
              responsibilities: item.responsibilities,
              integrations: item.integrations,
              stack: item.stack,
              technologies: {
                deployment: item.technologies?.deployment || [],
                frontEnd: item.technologies?.frontEnd || [],
                backEnd: item.technologies?.backEnd || [],
                testing: item.technologies?.testing || [],
              },
              achievements: item.achievements?.map((achievement) => ({
                title: achievement.title,
                description: achievement.description || '',
              })),
            },
          }),
        ),
      );
      return createdItems;
    });

    revalidate.projects();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
