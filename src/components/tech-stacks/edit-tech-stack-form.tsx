'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'sonner';
import * as actions from '@/actions';
import { ErrorMessage, TypeGeneratorField, UploadImageButton } from '@/components';
import { TechStackInput, techStackInputSchema } from '@/schemas';
import { TechStackWithTools } from '@/db/queries/tech-stacks';

interface EditTechStackFormProps {
  techStack: TechStackWithTools;
}

export const EditTechStackForm = ({ techStack }: EditTechStackFormProps) => {
  const form = useForm<TechStackInput>({
    resolver: zodResolver(techStackInputSchema),
    defaultValues: {
      title: techStack.title,
      type: techStack.type,
      logo: techStack.logo,
    },
  });
  const logoUrl = form.watch('logo');
  const title = form.watch('title');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<TechStackInput> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editTechStack(techStack.id, values);

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

        <TypeGeneratorField text={title} onChange={(value) => form.setValue('type', value)}>
          <Controller
            control={form.control}
            name="type"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                placeholder="Type"
                label="Type"
              />
            )}
          />
        </TypeGeneratorField>

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
