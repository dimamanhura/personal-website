'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { hashSync }from 'bcrypt-ts-edge';
import { db } from '@/db';
import { formatErrors } from '@/utils';
import z from 'zod';
import { notifyAboutNewUser } from '@/telegram';

interface SignUpFormState {
  success?: boolean;
  errors: {
    confirmPassword?: string[];
    password?: string[];
    email?: string[];
    name?: string[];
    _form?: string[];
  };
};

const signUpFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must have at least 3 characters'),
  email: z
    .string()
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must have at 6 least characters'),
  confirmPassword: z
    .string()
    .min(6, 'Confirm password must have at 6 least characters'),
}).refine(data =>  data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword']
});

export async function signUpUser(formState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  try {
    const result = signUpFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const plainPassword = result.data.password;

    result.data.password = hashSync(plainPassword, 10);

    const user = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: result.data.password,
      },
    });

    await notifyAboutNewUser({
      email: user.email,
      name: user.name,
      id: user.id,
    });

    redirect('/sign-in');
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return {
      success: false,
      errors: formatErrors(err),
    };
  }
};
