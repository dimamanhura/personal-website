'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import paths from '@/paths';
import { contactRequestInputSchema, ContactRequestInput, ContactRequestOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors } from '@/utils';

export async function editContactRequest(
  id: string,
  contactRequest: ContactRequestInput,
): Promise<ManageItemFormState> {
  try {
    const result: ContactRequestOutput = contactRequestInputSchema.parse({
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

    revalidatePath(paths.contactRequestsDetailsByIdAdmin(id));
    revalidatePath(paths.contactRequestsAdmin());

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
