'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'sonner';
import { FeedbackSectionWithReviews } from '@/db/queries/feedback-sections';
import * as actions from '@/actions';
import { TypeGeneratorField } from '@/components';
import { FeedbackSectionInput, feedbackSectionInputSchema } from '@/schemas';

interface EditFeedbackSectionFormProps {
  feedbackSection: FeedbackSectionWithReviews;
}

export const EditFeedbackSectionForm = ({ feedbackSection }: EditFeedbackSectionFormProps) => {
  const form = useForm<FeedbackSectionInput>({
    resolver: zodResolver(feedbackSectionInputSchema),
    defaultValues: {
      title: feedbackSection.title,
      type: feedbackSection.type,
    },
  });
  const title = form.watch('title');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<FeedbackSectionInput> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editFeedbackSection(feedbackSection.id, values);

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

        <Button className="max-w-fit" type="submit" color="primary" disabled={isPending}>
          {isPending ? 'Loading...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};
