import { z } from 'zod';

export const contactRequestInputSchema = z.object({
  resolution: z.string().max(1000),
  resolved: z.boolean(),
  message: z.string().min(2).max(1000),
  email: z.email().min(10).max(255),
  name: z.string().min(2).max(255),
});
