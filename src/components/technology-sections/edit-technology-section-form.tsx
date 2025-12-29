'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { TechnologySection } from '@prisma/client';
import { toast } from 'sonner';
import { z } from 'zod';
import * as actions from '@/actions';
import { technologySectionInputSchema } from '@/schemas';
import { ErrorMessage, UploadImageButton } from '@/components';

interface EditTechnologySectionFormProps {
  technologySection: TechnologySection;
}

export const EditTechnologySectionForm = ({
  technologySection,
}: EditTechnologySectionFormProps) => {
  const form = useForm<z.infer<typeof technologySectionInputSchema>>({
    resolver: zodResolver(technologySectionInputSchema),
    defaultValues: {
      title: technologySection.title,
      logo: technologySection.logo,
    },
  });
  const logoUrl = form.watch('logo');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof technologySectionInputSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editTechnologySection(
        technologySection.id,
        values,
      );

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

        <Button className="max-w-fit" type="submit" color="primary" disabled={isPending}>
          {isPending ? 'Loading...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};
