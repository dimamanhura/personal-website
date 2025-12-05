'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { Chip, Input, Textarea } from '@nextui-org/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import * as actions from '@/actions';
import { SubmitButton } from '@/components';

export const CreateContactRequestForm = () => {
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(actions.createContactRequest, {
    errors: {},
  });
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);

  useEffect(() => {
    if (formState.success) {
      setIsSuccessMessageShown(true);
      ref.current?.reset();
    }
  }, [formState.success]);

  return (
    <form action={action} ref={ref}>
      <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4 text-xs dark:bg-black">
        {formState.errors._form && (
          <Chip
            startContent={<FaExclamationTriangle size={14} className="mr-1" />}
            className="w-full max-w-full"
            variant="flat"
            radius="sm"
            size="lg"
            color="danger"
          >
            {formState.errors._form.join(', ')}
          </Chip>
        )}

        {isSuccessMessageShown && (
          <Chip
            className="w-full max-w-full"
            variant="flat"
            radius="sm"
            color="success"
            size="lg"
            onClose={() => setIsSuccessMessageShown(false)}
          >
            Your submission has been sent
          </Chip>
        )}

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

        <Textarea
          errorMessage={formState.errors.message?.join(', ')}
          placeholder="Message"
          isInvalid={!!formState.errors.message}
          name="message"
        />

        <SubmitButton>Send</SubmitButton>
      </div>
    </form>
  );
};
