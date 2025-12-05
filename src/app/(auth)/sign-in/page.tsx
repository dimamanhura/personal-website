import { SignInForm } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
};

const SignInPage = async () => {
  return (
    <>
      <SignInForm />
    </>
  );
};

export default SignInPage;
