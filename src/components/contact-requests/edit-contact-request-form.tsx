'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { ContactRequest, ContactRequestClassification as ClassificationType } from '@prisma/client';
import { toast } from 'sonner';
import * as actions from '@/actions';
import { ContactRequestClassification, ErrorMessage } from '@/components';
import { ContactRequestInput, contactRequestInputSchema } from '@/schemas';

interface EditContactRequestFormProps {
  contactRequest: ContactRequest;
}

export const EditContactRequestForm = ({ contactRequest }: EditContactRequestFormProps) => {
  const form = useForm<ContactRequestInput>({
    resolver: zodResolver(contactRequestInputSchema),
    defaultValues: {
      humanOverrideReason: contactRequest.humanOverrideReason || '',
      classification: contactRequest.classification || ClassificationType.unclassified,
      resolution: contactRequest.resolution || '',
      resolved: !!contactRequest.resolved,
      message: contactRequest.message,
      email: contactRequest.email,
      name: contactRequest.name,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<ContactRequestInput> = async (values) => {
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
          name="classification"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              defaultSelectedKeys={
                contactRequest.classification ? [contactRequest.classification] : []
              }
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Classification"
              label="Classification"
              renderValue={(items) => {
                return items.map((item) => (
                  <ContactRequestClassification
                    key={item.key}
                    classification={item.key as ClassificationType}
                  />
                ));
              }}
            >
              {Object.values(ClassificationType).map((classificationType) => (
                <SelectItem key={classificationType} value={classificationType}>
                  <ContactRequestClassification classification={classificationType} />
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Textarea
          placeholder="AI reason"
          isDisabled
          label="AI reason"
          type="message"
          value={contactRequest.reason || 'Not provided'}
        />

        <Controller
          control={form.control}
          name="humanOverrideReason"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Human override reason"
              label="Human override reason"
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
