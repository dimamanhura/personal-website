import { Metadata } from 'next';
import { SignInForm } from '@/components';

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
