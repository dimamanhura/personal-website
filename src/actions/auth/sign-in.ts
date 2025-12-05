'use server';

import { signIn } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import z from 'zod';

interface SignInFormState {
  success?: boolean;
  errors: {
    password?: string[];
    email?: string[];
    _form?: string[];
  };
}

const signInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must have at 6 least characters'),
});

export async function signInWithCredentials(
  prevState: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  try {
    const result = signInFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    await signIn('credentials', result.data);

    return {
      success: true,
      errors: {},
    };
  } catch (err: unknown) {
    if (isRedirectError(err)) {
      throw err;
    }

    return {
      success: false,
      errors: {
        _form: ['Invalid password or email'],
      },
    };
  }
}
