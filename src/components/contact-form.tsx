'use client';

import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from '@/actions';
import SubmitButton from "./submit-button";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

const ContactForm = () => {
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(actions.contactRequest, {
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
      <div className="text-xs flex flex-col gap-4 p-4 w-full bg-white rounded-md">
        {formState.errors._form && (
          <div className="rounded-md p-4 bg-red-100 border border-red-200">
            {formState.errors._form.join(', ')}
          </div>
        )}

        {isSuccessMessageShown && (
          <div className="flex justify-between items-center rounded-md px-4 py-2 bg-green-100 border border-green-200">
            <p className="text-xs">
              Your submission has been sent.
            </p>
           <Button isIconOnly variant="flat" radius="full" size="sm" onClick={() => setIsSuccessMessageShown(false)}>
            <FaTimes />
          </Button>
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
