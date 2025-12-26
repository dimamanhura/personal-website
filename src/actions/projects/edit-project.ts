'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import { projectInputSchema } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function editProject(
  id: string,
  project: z.infer<typeof projectInputSchema>,
): Promise<ManageItemFormState> {
  try {
    const result = projectInputSchema.parse({
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
      integrations: project.integrations,
      stack: project.stack,
      technologies: project.technologies,
      achievements: project.achievements,
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
        startAt: result.startAt,
        endAt: result.endAt,
        logo: result.logo,
        position: result.position,
        team: result.team,
        featured: result.featured,
        responsibilities: result.responsibilities,
        integrations: result.integrations,
        stack: result.stack,
        technologies: result.technologies,
        achievements: result.achievements,
      },
    });

    revalidatePath(paths.projectsEditByIdAdmin(id));
    revalidatePath(paths.projectsAdmin());

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
