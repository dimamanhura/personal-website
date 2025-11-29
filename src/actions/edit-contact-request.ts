'use server';

import { z } from 'zod';
import { db } from '@/db';
import { editContactRequestSchema } from '@/types/EditContactRequestSchema';
import { formatErrors } from '@/utils/format-errors';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { redirect } from 'next/navigation';

interface EditContactRequestFormState {
  success?: boolean;
  message?: string;
};

export async function editContactRequest(id: string, contactRequest: z.infer<typeof editContactRequestSchema>): Promise<EditContactRequestFormState> {
  try {
    const result = editContactRequestSchema.parse({
      resolution: contactRequest.resolution,
      resolved: contactRequest.resolved,
      message: contactRequest.message,
      email: contactRequest.email,
      name: contactRequest.name,
    });

    await db.contactRequest.update({
      where: {
        id,
      },
      data: {
        resolution: result.resolution,
        resolved: result.resolved,
        message: result.message,
        email: result.email,
        name: result.name,
      },
    });

    revalidatePath(paths.contactRequestDetails(id));
    revalidatePath(paths.contactRequestsAdmin());
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }

  return { success: true };
};
