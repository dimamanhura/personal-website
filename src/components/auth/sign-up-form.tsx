'use client';

import { useFormState } from 'react-dom';
import { Input } from '@nextui-org/react';
import Link from 'next/link';
import * as actions from '@/actions';
import { AuthForm } from '@/components';
import paths from '@/paths';

export const SignUpForm = () => {
  const [formState, action] = useFormState(actions.signUpUser, {
    errors: {},
  });

  return (
    <AuthForm
      formErrors={formState.errors._form}
      action={action}
      title="Sign up"
      submitButton="Sign up"
      renderInputs={() => (
        <>
          <Input
            errorMessage={formState.errors.name?.join(', ')}
            placeholder="Name"
            isInvalid={!!formState.errors.name}
            name="name"
          />

          <Input
            errorMessage={formState.errors.email?.join(', ')}
            placeholder="Email"
            isInvalid={!!formState.errors.email}
            name="email"
          />

          <Input
            errorMessage={formState.errors.password?.join(', ')}
            placeholder="Password"
            isInvalid={!!formState.errors.password}
            name="password"
            type="password"
          />

          <Input
            errorMessage={formState.errors.confirmPassword?.join(', ')}
            placeholder="Confirm Password"
            isInvalid={!!formState.errors.confirmPassword}
            name="confirmPassword"
            type="password"
          />
        </>
      )}
      renderLink={() => (
        <p className="mt-2 text-center text-sm">
          Already have an account?{' '}
          <Link href={paths.signIn()} className="text-blue-500">
            Sign in
          </Link>
        </p>
      )}
    />
  );
};
