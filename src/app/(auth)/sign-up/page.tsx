import { SignUpForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign up',
};

const SignUpPage = async () => {
  return (
    <>
      <SignUpForm />
    </>
  );
}

export default SignUpPage;


