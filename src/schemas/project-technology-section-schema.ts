import { z } from 'zod';

export const projectTechnologySectionSchema = z
  .object({
    frontEnd: z.array(z.string().min(2).max(255)).max(100).optional(),
    backEnd: z.array(z.string().min(2).max(255)).max(100).optional(),
    testing: z.array(z.string().min(2).max(255)).max(100).optional(),
    deployment: z.array(z.string().min(2).max(255)).max(100).optional(),
  })
  .optional();
