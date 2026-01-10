import { z } from 'zod';

export const createContactRequestSchema = z.object({
  message: z.string().min(3).max(1000),
  email: z.email().min(10).max(255),
  name: z.string().min(3).max(255),
});

export type ContactRequestCreateInput = z.input<typeof createContactRequestSchema>;

export type ContactRequestCreateOutput = z.output<typeof createContactRequestSchema>;
