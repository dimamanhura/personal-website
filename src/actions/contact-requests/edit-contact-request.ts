'use server';

import { z } from 'zod';
import { db } from '@/db';
import { contactRequestInputSchema } from '@/schemas';
import { formatErrors } from '@/utils/format-errors';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { ManageItemFormState } from '@/types';

export async function editContactRequest(id: string, contactRequest: z.infer<typeof contactRequestInputSchema>): Promise<ManageItemFormState> {
  try {
    const result = contactRequestInputSchema.parse({
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
  
    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
};
