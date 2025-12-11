import { z } from 'zod';

export const technologyInputSchema = z.object({
  sectionId: z.string().min(2).max(255).optional(),
  featured: z.boolean(),
  title: z.string().min(2).max(255),
});
