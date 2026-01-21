'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as actions from '@/actions';
import { TypeGeneratorField } from '@/components';
import paths from '@/paths';
import { TechCategoryInput, techCategoryInputSchema } from '@/schemas';

export const CreateTechCategoryForm = () => {
  const router = useRouter();
  const form = useForm<TechCategoryInput>({
    resolver: zodResolver(techCategoryInputSchema),
    defaultValues: {
      title: '',
      type: '',
    },
  });
  const title = form.watch('title');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<TechCategoryInput> = async (values) => {
    startTransition(async () => {
      const { success, message, id } = await actions.createTechCategory(values);

      if (success && id) {
        toast.success('Successfully created');
        router.push(paths.techCategoriesDetailsByIdAdmin(id));
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

        <Button className="max-w-fit" type="submit" color="primary" disabled={isPending}>
          {isPending ? 'Loading...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
