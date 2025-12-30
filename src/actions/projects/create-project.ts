'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import paths from '@/paths';
import { projectInputSchema, ProjectInput, ProjectOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, normalizeToMidnight } from '@/utils';

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
      integrations: values.integrations,
      stack: values.stack,
      technologies: values.technologies,
      achievements: values.achievements,
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
        integrations: result.integrations,
        stack: result.stack,
        technologies: {
          deployment: result.technologies?.deployment || [],
          frontEnd: result.technologies?.frontEnd || [],
          backEnd: result.technologies?.backEnd || [],
          testing: result.technologies?.testing || [],
        },
        achievements: result.achievements?.map((achievement) => ({
          title: achievement.title,
          description: achievement.description || '',
        })),
      },
    });

    revalidatePath(paths.projectsAdmin());

    return { success: true, id: project.id };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
