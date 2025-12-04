'use client';

import { Button, Chip } from "@nextui-org/react";
import { SubmitButton } from "@/components";
import { FaExclamationTriangle, FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import paths from "@/paths";

interface AuthFormProps {
  submitButton: string;
  formErrors?: string[];
  title: string;
  action: (payload: FormData) => void;
  renderInputs: () => JSX.Element;
  renderLink: () => JSX.Element;
};

export const AuthForm = ({
  submitButton,
  formErrors,
  title,
  renderInputs,
  renderLink,
  action,
}: AuthFormProps) => {
  return (
    <form action={action}>
      <div className="w-full mt-24">
        <div className="m-auto max-w-xl flex flex-col gap-4 p-8 text-xs bg-white dark:bg-black shadow-xl rounded-xl">
          <div className="flex mb-2 justify-between">
            <h2 className="text-2xl">{title}</h2>

            <Link href={paths.home()}>
              <Button color="primary" variant="light" endContent={<FaSignInAlt size={14} />}>
                To CV
              </Button>
            </Link>
          </div>

          {formErrors?.length && formErrors?.length > 0 && (
            <Chip
              startContent={<FaExclamationTriangle size={14} className="mr-1" />}
              className="w-full max-w-full"
              variant="flat"
              radius="sm"
              size="lg"
              color="danger"
            >
              {formErrors.join(', ')}
            </Chip>
          )}
          
          {renderInputs()}

          <SubmitButton>{submitButton}</SubmitButton>

          {renderLink()}
        </div>
      </div>
    </form>
  );
};
