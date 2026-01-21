'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as actions from '@/actions';
import { ErrorMessage, TypeGeneratorField, UploadImageButton } from '@/components';
import paths from '@/paths';
import { TechStackInput, techStackInputSchema } from '@/schemas';
import { TechCategoryWithStacks } from '@/db/queries/tech-categories';

interface CreateTechStackFormProps {
  categories: TechCategoryWithStacks[];
}

export const CreateTechStackForm = ({ categories }: CreateTechStackFormProps) => {
  const router = useRouter();
  const form = useForm<TechStackInput>({
    resolver: zodResolver(techStackInputSchema),
    defaultValues: {
      displayOrder: 0,
      categoryId: undefined,
      title: '',
      type: '',
      logo: '',
    },
  });
  const logoUrl = form.watch('logo');
  const title = form.watch('title');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<TechStackInput> = async (values) => {
    startTransition(async () => {
      const { success, message, id } = await actions.createTechStack(values);

      if (success && id) {
        toast.success('Successfully created');
        router.push(paths.techStacksDetailsByIdAdmin(id));
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

        <Controller
          control={form.control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Category"
              label="Category"
            >
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.title}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={form.control}
          name="displayOrder"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              value={field.value?.toString() ?? '0'}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              type="number"
              placeholder="Order"
              label="Order"
              onChange={({ target: { value } }) => field.onChange(value === '' ? 0 : Number(value))}
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
