import { Metadata } from 'next';
import { SignUpForm } from '@/components';

export const metadata: Metadata = {
  title: 'Sign up',
};

const SignUpPage = async () => {
  return (
    <>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
