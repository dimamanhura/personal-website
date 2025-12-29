'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Textarea } from '@nextui-org/react';
import { ContactRequest } from '@prisma/client';
import { toast } from 'sonner';
import { z } from 'zod';
import * as actions from '@/actions';
import { contactRequestInputSchema } from '@/schemas';
import { ErrorMessage } from '@/components';

interface EditContactRequestFormProps {
  contactRequest: ContactRequest;
}

export const EditContactRequestForm = ({ contactRequest }: EditContactRequestFormProps) => {
  const form = useForm<z.infer<typeof contactRequestInputSchema>>({
    resolver: zodResolver(contactRequestInputSchema),
    defaultValues: {
      resolution: contactRequest.resolution || '',
      resolved: !!contactRequest.resolved,
      message: contactRequest.message,
      email: contactRequest.email,
      name: contactRequest.name,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof contactRequestInputSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editContactRequest(contactRequest.id, values);

      if (success) {
        toast.success('Successfully updated');
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col gap-4 rounded-md text-xs">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Name"
              label="Name"
            />
          )}
        />

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Email"
              label="Email"
              type="email"
            />
          )}
        />

        <Controller
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Message"
              label="Message"
              type="message"
            />
          )}
        />

        <Controller
          control={form.control}
          name="resolved"
          render={({ field, fieldState }) => {
            return (
              <>
                <Checkbox
                  isSelected={!!field.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(e.target.checked)
                  }
                >
                  Resolved
                </Checkbox>

                {fieldState.error && <ErrorMessage message={fieldState.error?.message} />}
              </>
            );
          }}
        />

        <Controller
          control={form.control}
          name="resolution"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Resolution"
              label="Resolution"
              type="resolution"
            />
          )}
        />

        <Button className="max-w-fit" type="submit" color="primary" disabled={isPending}>
          {isPending ? 'Loading...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};
