import { ContactRequestClassification } from '@prisma/client';
import { z } from 'zod';

export const contactRequestInputSchema = z.object({
  humanOverrideReason: z.string().max(1000),
  classification: z.enum([
    ContactRequestClassification.unclassified,
    ContactRequestClassification.spam,
    ContactRequestClassification.no_reply_needed,
    ContactRequestClassification.solicitation,
    ContactRequestClassification.general,
    ContactRequestClassification.critical,
  ]),
  resolution: z.string().max(1000),
  resolved: z.boolean(),
  message: z.string().min(2).max(1000),
  email: z.email().min(10).max(255),
  name: z.string().min(2).max(255),
});

export type ContactRequestInput = z.input<typeof contactRequestInputSchema>;

export type ContactRequestOutput = z.output<typeof contactRequestInputSchema>;
