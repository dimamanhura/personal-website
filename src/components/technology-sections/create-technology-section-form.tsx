'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import * as actions from '@/actions';
import { UploadImageButton } from '@/components';
import paths from '@/paths';
import { technologySectionInputSchema } from '@/schemas';

export const CreateTechnologySectionForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof technologySectionInputSchema>>({
    resolver: zodResolver(technologySectionInputSchema),
    defaultValues: {
      title: '',
      logo: '',
    },
  });
  const logoUrl = form.watch('logo');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof technologySectionInputSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message, id } = await actions.createTechnologySection(values);

      if (success && id) {
        toast.success('Successfully created');
        router.push(paths.technologySectionsDetailsByIdAdmin(id));
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
            <span className="p-1 text-tiny text-danger">{form.formState.errors.logo.message}</span>
          )}
        </div>

        <Button className="max-w-fit" type="submit" color="primary" disabled={isPending}>
          {isPending ? 'Loading...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
