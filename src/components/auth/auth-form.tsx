'use client';

import { Button, Chip } from '@nextui-org/react';
import Link from 'next/link';
import { FaExclamationTriangle, FaSignInAlt } from 'react-icons/fa';
import { SubmitButton } from '@/components';
import paths from '@/paths';

interface AuthFormProps {
  submitButton: string;
  formErrors?: string[];
  title: string;
  action: (payload: FormData) => void;
  renderInputs: () => JSX.Element;
  renderLink: () => JSX.Element;
}

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
      <div className="mt-24 w-full">
        <div className="m-auto flex max-w-xl flex-col gap-4 rounded-xl bg-white p-8 text-xs shadow-xl dark:bg-black">
          <div className="mb-2 flex justify-between">
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
