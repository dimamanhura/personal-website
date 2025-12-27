import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const profileInputSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  title: z.string().min(2).max(255),
  location: z.object({
    city: z.string().min(2).max(255),
    country: z.string().min(2).max(255),
  }),
  avatar: z.url().min(2).max(255),
  description: z.string().min(2).max(1000),
  contacts: z.object({
    phone: z.string().refine((value) => isValidPhoneNumber(value), {
      message: 'Invalid phone number (must include the international prefix, e.g., +3...)',
    }),
    email: z.email().min(10).max(255),
    linkedin: z.url().min(2).max(255),
    github: z.url().min(2).max(255),
  }),
});
