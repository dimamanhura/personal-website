'use client';

import { useTransition } from 'react';
import { z } from 'zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Textarea } from '@nextui-org/react';
import { toast } from 'sonner';
import * as actions from '@/actions';
import { achievementInputSchema } from '@/schemas';
import { MultiItemField } from '@/components';
import { Achievement } from '@prisma/client';

interface EditAchievementFormProps {
  achievement: Achievement;
}

export const EditAchievementForm = ({ achievement }: EditAchievementFormProps) => {
  const form = useForm<z.infer<typeof achievementInputSchema>>({
    resolver: zodResolver(achievementInputSchema),
    defaultValues: {
      title: achievement.title,
      description: achievement.description,
      notes: achievement.notes,
      result: achievement.result,
      solution: achievement.solution,
      featured: achievement.featured,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof achievementInputSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message, id } = await actions.editAchievement(achievement.id, values);

      if (success && id) {
        toast.success('Successfully updated');
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="text-xs flex flex-col gap-4 w-full rounded-md">
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

              {fieldState.error && (
                <span className="text-danger text-tiny">{fieldState.error?.message}</span>
              )}
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
