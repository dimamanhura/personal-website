import { z } from 'zod';

export const projectTradeOffSchema = z.object({
  chosen: z.string().min(2).max(50),
  alternative: z.string().min(2).max(50),
  reason: z.string().min(10).max(1000).optional(),
});
