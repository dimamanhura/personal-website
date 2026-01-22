import { z } from 'zod';
import { projectAchievementSchema } from '@/schemas';
import { isRealDate } from '@/utils';

export const projectInputSchema = z.object({
  name: z.string().min(2).max(255),
  slug: z.string().min(2).max(255),
  shortDescription: z.string().min(2).max(255),
  longDescription: z.string().min(2).max(1000),
  startAt: z.string().refine(isRealDate, { message: 'Invalid date' }),
  endAt: z.string().refine(isRealDate, { message: 'Invalid date' }).optional(),
  features: z.array(z.string().min(2).max(255)).max(100).optional(),
  logo: z.url().min(2).max(255).optional(),
  position: z.string().min(2).max(255),
  team: z.array(z.string().min(2).max(255)).max(100).optional(),
  responsibilities: z.array(z.string().min(2).max(255)).min(1).max(100),
  achievements: z.array(projectAchievementSchema).max(100).optional(),
  stackIds: z.array(z.string().min(2).max(255)).min(1).max(100).optional(),
  stacks: z.array(z.string().min(2).max(255)).min(1).max(100).optional(),
  integrationIds: z.array(z.string().min(2).max(255)).max(100).optional(),
  integrations: z.array(z.string().min(2).max(255)).max(100).optional(),
  toolIds: z.array(z.string().min(2).max(255)).min(1).max(100).optional(),
  tools: z.array(z.string().min(2).max(255)).min(1).max(100).optional(),
  featured: z.boolean(),
});

export type ProjectInput = z.input<typeof projectInputSchema>;

export type ProjectOutput = z.output<typeof projectInputSchema>;
