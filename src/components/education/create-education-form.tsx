'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as actions from '@/actions';
import { ErrorMessage, UploadImageButton } from '@/components';
import paths from '@/paths';
import { EducationInput, educationInputSchema } from '@/schemas';

export const CreateEducationForm = () => {
  const router = useRouter();
  const form = useForm<EducationInput>({
    resolver: zodResolver(educationInputSchema),
    defaultValues: {
      name: '',
      title: '',
      logo: '',
      degree: '',
      startAt: undefined,
      endAt: undefined,
      location: { city: '', country: '' },
    },
  });
  const logoUrl = form.watch('logo');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<EducationInput> = async (values) => {
    startTransition(async () => {
      const { success, message, id } = await actions.createEducation(values);

      if (success && id) {
        toast.success('Successfully created');
        router.push(paths.educationDetailsByIdAdmin(id));
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
          {isPending ? 'Loading...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
