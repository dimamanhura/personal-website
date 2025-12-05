'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';
import * as telegram from '@/telegram';

const createContactRequestSchema = z.object({
  message: z.string().min(3).max(1000),
  email: z.string().email().min(10).max(255),
  name: z.string().min(3).max(255),
});

interface CreateContactRequestFormState {
  success?: boolean;
  errors: {
    message?: string[];
    email?: string[];
    name?: string[];
    _form?: string[];
  };
}

export async function createContactRequest(
  formState: CreateContactRequestFormState,
  formData: FormData,
): Promise<CreateContactRequestFormState> {
  const result = createContactRequestSchema.safeParse({
    message: formData.get('message'),
    email: formData.get('email'),
    name: formData.get('name'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.contactRequest.create({
      data: {
        message: result.data.message,
        email: result.data.email,
        name: result.data.name,
      },
    });
    await telegram.notifyAboutContactRequest({
      message: result.data.message,
      email: result.data.email,
      name: result.data.name,
    });
    revalidatePath(paths.contactRequestsAdmin());
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Failed to submit contact request'],
        },
      };
    }
  }

  return {
    success: true,
    errors: {},
  };
}
