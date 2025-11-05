import SignUpForm from "@/components/sign-up-form";
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


