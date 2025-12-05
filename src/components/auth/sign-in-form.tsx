'use client';

import { Input } from '@nextui-org/react';
import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import { AuthForm } from '@/components';
import Link from 'next/link';
import paths from '@/paths';

export const SignInForm = () => {
  const [formState, action] = useFormState(actions.signInWithCredentials, {
    errors: {},
  });

  return (
    <AuthForm
      formErrors={formState.errors._form}
      action={action}
      title="Sign in"
      submitButton="Sign in"
      renderInputs={() => (
        <>
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
        </>
      )}
      renderLink={() => (
        <p className="mt-2 text-sm text-center">
          Need to create an account?{' '}
          <Link href={paths.signUp()} className="text-blue-500">
            Create Account
          </Link>
        </p>
      )}
    />
  );
};
