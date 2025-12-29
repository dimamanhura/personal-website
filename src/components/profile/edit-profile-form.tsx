'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Meta } from '@prisma/client';
import { toast } from 'sonner';
import { z } from 'zod';
import * as actions from '@/actions';
import { profileInputSchema } from '@/schemas';
import { ErrorMessage, UploadImageButton } from '@/components';

interface EditProfileFormProps {
  profile: Meta;
}

export const EditProfileForm = ({ profile }: EditProfileFormProps) => {
  const form = useForm<z.infer<typeof profileInputSchema>>({
    resolver: zodResolver(profileInputSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      location: profile.location,
      avatar: profile.avatar,
      title: profile.title,
      description: profile.description,
      contacts: profile.contacts,
    },
  });
  const logoUrl = form.watch('avatar');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof profileInputSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editProfile(profile.id, values);

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
          name="firstName"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="First Name"
              label="First Name"
            />
          )}
        />

        <Controller
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Last Name"
              label="Last Name"
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

        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Description"
              label="Description"
            />
          )}
        />

        <div className="flex flex-col">
          <UploadImageButton
            title="Avatar"
            url={logoUrl}
            onUpload={(url: string) => {
              form.setValue('avatar', url);
              form.clearErrors('avatar');
            }}
          />

          {form.formState.errors.avatar && (
            <ErrorMessage message={form.formState.errors.avatar.message} />
          )}
        </div>

        <Controller
          control={form.control}
          name="contacts.email"
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
          name="contacts.phone"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Phone"
              label="Phone"
            />
          )}
        />

        <Controller
          control={form.control}
          name="contacts.linkedin"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Linkedin"
              label="Linkedin"
            />
          )}
        />

        <Controller
          control={form.control}
          name="contacts.github"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Github"
              label="Github"
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
