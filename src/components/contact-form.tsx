'use client';

import { Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from '@/actions';
import SubmitButton from "./submit-button";
import { useEffect, useRef } from "react";

interface ContactFormProps {
  handleSuccess?: () => void;
};

const ContactForm = ({ handleSuccess }: ContactFormProps) => {
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(actions.contactRequest, {
    errors: {},
  });

  console.log('formState', formState);

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
      handleSuccess && handleSuccess();
    }
  }, [formState, handleSuccess]);

  return (
    <form action={action} ref={ref}>
      <div className="text-xs flex flex-col gap-4 p-4 w-80 bg-white rounded-md">
        {formState.errors._form && (
          <div className="rounded-md p-4 bg-red-100 border border-red-200">
            {formState.errors._form.join(', ')}
          </div>
        )}

        {formState.success && (
          <div className="text-xs rounded-md p-4 bg-green-100 border border-green-200">
            Your submission has been sent.
          </div>
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

export default ContactForm;
