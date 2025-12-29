import { z } from 'zod';

export const achievementInputSchema = z.object({
  featured: z.boolean(),
  title: z.string().min(2).max(255),
  description: z.string().min(2).max(1000),
  solution: z.array(z.string().min(2).max(255)).min(1).max(100),
  result: z.array(z.string().min(2).max(255)).min(1).max(100),
  notes: z.array(z.string().min(2).max(255)).min(1).max(100),
});
