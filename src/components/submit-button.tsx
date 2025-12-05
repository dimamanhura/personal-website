'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface SubmitButtonProps {
  children: React.ReactNode;
}

export const SubmitButton = ({ children }: SubmitButtonProps) => {
  const status = useFormStatus();
  return (
    <Button type="submit" isDisabled={status.pending}>
      {status.pending ? 'Loading...' : children}
    </Button>
  );
};
