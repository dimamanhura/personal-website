'use server';

import { z } from 'zod';
import { db } from '@/db';
import { projectInputSchema, ProjectInput, ProjectOutput } from '@/schemas';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

const bulkProjectSchema = z.array(projectInputSchema);

export async function createProjectsBulk(values: ProjectInput[]) {
  try {
    const validatedData: ProjectOutput[] = bulkProjectSchema.parse(values);

    const stacks = await db.techStack.findMany({
      select: { id: true, type: true },
    });

    const stacksMap = new Map(stacks.map((s) => [s.type, s.id]));

    const tools = await db.techTool.findMany({
      select: { id: true, type: true },
    });

    const toolsMap = new Map(tools.map((s) => [s.type, s.id]));

    await db.$transaction(
      validatedData.map((item) => {
        return db.project.create({
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
            achievements:
              item.achievements?.map((achievement) => ({
                title: achievement.title,
                description: achievement.description || '',
              })) || [],
            ...(item.stacks
              ? {
                  stacks: {
                    connect: item.stacks.map((type) => ({ id: stacksMap.get(type) })),
                  },
                }
              : { stacks: { connect: [] } }),
            ...(item.integrations
              ? {
                  integrations: {
                    connect: item.integrations.map((type) => ({ id: toolsMap.get(type) })),
                  },
                }
              : { integrations: { connect: [] } }),
            ...(item.tools
              ? {
                  tools: {
                    connect: item.tools.map((type) => ({ id: toolsMap.get(type) })),
                  },
                }
              : { tools: { connect: [] } }),
          },
        });
      }),
    );

    revalidate.projects();
  } catch (err: unknown) {
    throw new Error(formatErrors(err));
  }
}
