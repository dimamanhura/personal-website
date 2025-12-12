'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import * as actions from '@/actions';
import { ErrorMessage, MultiItemField } from '@/components';
import paths from '@/paths';
import { achievementInputSchema } from '@/schemas';

export const CreateAchievementForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof achievementInputSchema>>({
    resolver: zodResolver(achievementInputSchema),
    defaultValues: {
      title: '',
      description: '',
      notes: [],
      result: [],
      solution: [],
      featured: false,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof achievementInputSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message, id } = await actions.createAchievement(values);

      if (success && id) {
        toast.success('Successfully created');
        router.push(paths.achievementsDetailsByIdAdmin(id));
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

        <MultiItemField label="Solution" name="solution" form={form} />

        <MultiItemField label="Result" name="result" form={form} />

        <MultiItemField label="Notes" name="notes" form={form} />

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
          {isPending ? 'Loading...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
