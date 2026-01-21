'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react';
import { TechStack } from '@prisma/client';
import { toast } from 'sonner';
import { TechnologyWithStack } from '@/db/queries/technologies';
import * as actions from '@/actions';
import { ErrorMessage } from '@/components';
import { TechnologyInput, technologyInputSchema } from '@/schemas';

interface EditTechnologyFormProps {
  technology: TechnologyWithStack;
  techStacks: TechStack[];
}

export const EditTechnologyForm = ({ technology, techStacks }: EditTechnologyFormProps) => {
  const form = useForm<TechnologyInput>({
    resolver: zodResolver(technologyInputSchema),
    defaultValues: {
      stackId: technology.stackId || undefined,
      featured: !!technology.featured,
      title: technology.title,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<TechnologyInput> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editTechnology(technology.id, values);

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

        <Controller
          control={form.control}
          name="stackId"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              defaultSelectedKeys={technology.stackId ? [technology.stackId] : []}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Stack"
              label="Stack"
            >
              {techStacks.map((techStack) => (
                <SelectItem key={techStack.id} value={techStack.id}>
                  {techStack.title}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={form.control}
          name="featured"
          render={({ field, fieldState }) => (
            <>
              <Checkbox
                isSelected={!!field.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.checked)
                }
              >
                Is Featured
              </Checkbox>

              {fieldState.error && <ErrorMessage message={fieldState.error?.message} />}
            </>
          )}
        />

        <Button className="max-w-fit" type="submit" color="primary" disabled={isPending}>
          {isPending ? 'Loading...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};
