'use server';

import { db } from '@/db';
import { projectInputSchema, ProjectInput, ProjectOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

export async function createProject(values: ProjectInput): Promise<ManageItemFormState> {
  try {
    const result: ProjectOutput = projectInputSchema.parse({
      name: values.name,
      slug: values.slug,
      shortDescription: values.shortDescription,
      longDescription: values.longDescription,
      features: values.features,
      startAt: values.startAt,
      endAt: values.endAt,
      logo: values.logo,
      position: values.position,
      team: values.team,
      featured: values.featured,
      responsibilities: values.responsibilities,
      tradeOffs: values.tradeOffs,
      integrations: values.integrations,
      achievements: values.achievements,
      stacks: values.stacks,
      tools: values.tools,
    });

    const project = await db.project.create({
      data: {
        name: result.name,
        slug: result.slug,
        shortDescription: result.shortDescription,
        longDescription: result.longDescription,
        features: result.features,
        startAt: normalizeToMidnight(result.startAt),
        endAt: result.endAt ? normalizeToMidnight(result.endAt) : null,
        logo: result.logo,
        position: result.position,
        team: result.team,
        featured: result.featured,
        responsibilities: result.responsibilities,
        tradeOffs: result.tradeOffs?.map((tradeOff) => ({
          chosen: tradeOff.chosen,
          alternative: tradeOff.alternative,
          reason: tradeOff.reason || '',
        })),
        achievements: result.achievements?.map((achievement) => ({
          title: achievement.title,
          description: achievement.description || '',
        })),
        ...(result.stacks
          ? { stacks: { connect: result.stacks.map((id) => ({ id })) } }
          : { stacks: { connect: [] } }),
        ...(result.integrations
          ? { integrations: { connect: result.integrations.map((id) => ({ id })) } }
          : { integrations: { connect: [] } }),
        ...(result.tools
          ? { tools: { connect: result.tools.map((id) => ({ id })) } }
          : { tools: { connect: [] } }),
      },
    });

    revalidate.projects();

    return { success: true, id: project.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
