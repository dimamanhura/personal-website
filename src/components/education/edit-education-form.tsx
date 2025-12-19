'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { Education } from '@prisma/client';
import { toast } from 'sonner';
import { z } from 'zod';
import * as actions from '@/actions';
import { educationInputSchema } from '@/schemas';
import { ErrorMessage } from '../ui/error-message';
import { UploadImageButton } from '../ui/upload-image-button';

interface EditEducationFormProps {
  education: Education;
}

export const EditEducationForm = ({ education }: EditEducationFormProps) => {
  const form = useForm<z.infer<typeof educationInputSchema>>({
    resolver: zodResolver(educationInputSchema),
    defaultValues: {
      name: education.name,
      title: education.title,
      logo: education.logo,
      degree: education.degree,
      startAt: education.startAt,
      endAt: education.endAt || undefined,
      location: education.location,
    },
  });
  const logoUrl = form.watch('logo');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof educationInputSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editEducation(education.id, values);

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
          name="title"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Title"
              label="Title"
            />
          )}
        />

        <div className="flex flex-col">
          <UploadImageButton
            title="Logo"
            url={logoUrl}
            onUpload={(url: string) => {
              form.setValue('logo', url);
              form.clearErrors('logo');
            }}
          />

          {form.formState.errors.logo && (
            <ErrorMessage message={form.formState.errors.logo.message} />
          )}
        </div>

        <Controller
          control={form.control}
          name="degree"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Degree"
              label="Degree"
            />
          )}
        />

        <Controller
          control={form.control}
          name="startAt"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Start At"
              label="Start At"
              type="date"
            />
          )}
        />

        <Controller
          control={form.control}
          name="endAt"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="End At"
              label="End At"
              type="date"
            />
          )}
        />

        <Controller
          control={form.control}
          name="location.city"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="City"
              label="City"
            />
          )}
        />

        <Controller
          control={form.control}
          name="location.country"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Country"
              label="Country"
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
