import { z } from 'zod';

export const projectAchievementSchema = z.object({
  title: z.string().min(2).max(255),
  points: z.array(z.string().min(2).max(255)).min(1).max(10),
});
