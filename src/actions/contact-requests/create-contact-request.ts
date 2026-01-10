'use server';

import { db } from '@/db';
import { createContactRequestSchema } from '@/schemas';
import * as telegram from '@/telegram';
import { revalidate } from '@/utils';

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

    revalidate.contactRequests();
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
