'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react';
import { TechStack } from '@prisma/client';
import { toast } from 'sonner';
import { TechToolWithStack } from '@/db/queries/tech-tools';
import * as actions from '@/actions';
import { ErrorMessage } from '@/components';
import { TechToolInput, techToolInputSchema } from '@/schemas';

interface EditTechToolFormProps {
  techTool: TechToolWithStack;
  techStacks: TechStack[];
}

export const EditTechToolForm = ({ techTool, techStacks }: EditTechToolFormProps) => {
  const form = useForm<TechToolInput>({
    resolver: zodResolver(techToolInputSchema),
    defaultValues: {
      stackId: techTool.stackId || undefined,
      featured: !!techTool.featured,
      title: techTool.title,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<TechToolInput> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editTechTool(techTool.id, values);

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
              defaultSelectedKeys={techTool.stackId ? [techTool.stackId] : []}
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
