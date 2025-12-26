import { isRealDate } from '@/utils';
import { z } from 'zod';
import { projectAchievementSchema, projectTechnologySectionSchema } from '@/schemas';

export const projectInputSchema = z.object({
  name: z.string().min(2).max(255),
  slug: z.string().min(2).max(255),
  shortDescription: z.string().min(2).max(255),
  longDescription: z.string().min(2).max(1000),
  features: z.array(z.string().min(2).max(255)).min(1).max(10),
  startAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
  endAt: z.string().refine(isRealDate, { message: 'Invalid date' }).optional(),
  logo: z.url().min(2).max(255),
  position: z.string().min(2).max(255),
  team: z.array(z.string().min(2).max(255)).min(1).max(10),
  featured: z.boolean().default(false),
  responsibilities: z.array(z.string().min(2).max(255)).min(1).max(10),
  integrations: z.array(z.string().min(2).max(255)).min(1).max(10),
  stack: z.array(z.string().min(2).max(255)).min(1).max(10),
  technologies: projectTechnologySectionSchema,
  achievements: z.array(projectAchievementSchema).max(10).optional(),
});
