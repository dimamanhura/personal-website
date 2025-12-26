import { z } from 'zod';

export const projectAchievementSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().min(2).max(1000).optional(),
});
