'use server';

import { db } from '@/db';
import { projectInputSchema, ProjectInput, ProjectOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight, revalidate } from '@/utils';

export async function editProject(id: string, project: ProjectInput): Promise<ManageItemFormState> {
  try {
    const result: ProjectOutput = projectInputSchema.parse({
      name: project.name,
      slug: project.slug,
      shortDescription: project.shortDescription,
      longDescription: project.longDescription,
      features: project.features,
      startAt: project.startAt,
      endAt: project.endAt,
      logo: project.logo,
      position: project.position,
      team: project.team,
      featured: project.featured,
      responsibilities: project.responsibilities,
      tradeOffs: project.tradeOffs,
      integrations: project.integrations,
      achievements: project.achievements,
      stacks: project.stacks,
      tools: project.tools,
    });

    await db.project.update({
      where: {
        id,
      },
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
        achievements: result.achievements?.map((achievement) => ({
          title: achievement.title,
          description: achievement.description || '',
        })),
        tradeOffs: result.tradeOffs?.map((tradeOff) => ({
          chosen: tradeOff.chosen,
          alternative: tradeOff.alternative,
          reason: tradeOff.reason || '',
        })),
        ...(result.stacks
          ? { stacks: { set: result.stacks.map((id) => ({ id })) } }
          : { stacks: { set: [] } }),
        ...(result.integrations
          ? { integrations: { set: result.integrations.map((id) => ({ id })) } }
          : { integrations: { set: [] } }),
        ...(result.tools
          ? { tools: { set: result.tools.map((id) => ({ id })) } }
          : { tools: { set: [] } }),
      },
    });

    revalidate.projects(id);

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
