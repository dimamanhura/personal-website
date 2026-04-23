'use server';

import { db } from '@/db';
import { contactRequestInputSchema, ContactRequestInput, ContactRequestOutput } from '@/schemas';
import { ManageItemFormState } from '@/types';
import { formatErrors, revalidate } from '@/utils';

export async function editContactRequest(
  id: string,
  contactRequest: ContactRequestInput,
): Promise<ManageItemFormState> {
  try {
    const result: ContactRequestOutput = contactRequestInputSchema.parse({
      humanOverrideReason: contactRequest.humanOverrideReason,
      classification: contactRequest.classification,
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
        humanOverrideReason: result.humanOverrideReason,
        classification: result.classification,
        resolution: result.resolution,
        resolved: result.resolved,
        message: result.message,
        email: result.email,
        name: result.name,
      },
    });

    revalidate.contactRequests(id);

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: formatErrors(err) };
  }
}
