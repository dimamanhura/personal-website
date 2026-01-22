'use server';

import { z } from 'zod';
import { db } from '@/db';
import { projectInputSchema, ProjectInput, ProjectOutput } from '@/schemas';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

const bulkProjectSchema = z.array(projectInputSchema);

export async function createProjectsBulk(values: ProjectInput[]) {
  try {
    const validatedData: ProjectOutput[] = bulkProjectSchema.parse(values);

    await db.project.createMany({
      data: validatedData.map((item) => ({
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
        achievements:
          item.achievements?.map((achievement) => ({
            title: achievement.title,
            description: achievement.description || '',
          })) || [],
        ...(item.stacks
          ? { stacks: { connect: item.stacks.map((id) => ({ id })) } }
          : { stacks: { connect: [] } }),
        ...(item.integrations
          ? { integrations: { connect: item.integrations.map((id) => ({ id })) } }
          : { integrations: { connect: [] } }),
        ...(item.tools
          ? { tools: { connect: item.tools.map((id) => ({ id })) } }
          : { tools: { connect: [] } }),
      })),
    });

    revalidate.projects();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
