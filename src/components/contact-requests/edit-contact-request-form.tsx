'use client';

import { useTransition } from 'react';
import { z } from 'zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Textarea } from '@nextui-org/react';
import { toast } from 'sonner';
import * as actions from '@/actions';
import { ContactRequest } from '@prisma/client';
import { contactRequestInputSchema } from '@/schemas';

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
      <div className="text-xs flex flex-col gap-4 w-full rounded-md">
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
            console.log('field', field);
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

                {fieldState.error && (
                  <span className="text-danger text-tiny">{fieldState.error?.message}</span>
                )}
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
