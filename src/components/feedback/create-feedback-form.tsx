'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { FeedbackSection } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as actions from '@/actions';
import { ErrorMessage } from '@/components';
import paths from '@/paths';
import { FeedbackInput, feedbackInputSchema } from '@/schemas';

interface CreateFeedbackFormProps {
  sections: FeedbackSection[];
}

export const CreateFeedbackForm = ({ sections }: CreateFeedbackFormProps) => {
  const router = useRouter();
  const form = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackInputSchema),
    defaultValues: {
      receivedAt: undefined,
      featured: false,
      section: undefined,
      author: '',
      review: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<FeedbackInput> = async (values) => {
    startTransition(async () => {
      const { success, message, id } = await actions.createFeedback(values);

      if (success && id) {
        toast.success('Successfully created');
        router.push(paths.feedbackDetailsByIdAdmin(id));
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
          name="author"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Author"
              label="Author"
            />
          )}
        />

        <Controller
          control={form.control}
          name="section"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Section"
              label="Section"
            >
              {sections.map((section) => (
                <SelectItem key={section.type} value={section.type}>
                  {section.title}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={form.control}
          name="receivedAt"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Received At"
              label="Received At"
              type="date"
            />
          )}
        />

        <Controller
          control={form.control}
          name="review"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Review"
              label="Review"
            />
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
          {isPending ? 'Loading...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
