'use client';

import { useTransition } from "react";
import { z } from "zod";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { toast } from "sonner";
import * as actions from '@/actions';
import { ReviewWithFeedbackSection } from "@/db/queries/feedback";
import { feedbackInputSchema } from "@/types/FeedbackInputSchema";
import { FeedbackSection } from "@prisma/client";

interface EditFeedbackFormProps {
  feedback: ReviewWithFeedbackSection;
  sections: FeedbackSection[];
};

const EditFeedbackForm = ({ feedback, sections }: EditFeedbackFormProps) => {
  const form = useForm<z.infer<typeof feedbackInputSchema>>({
    resolver: zodResolver(feedbackInputSchema),
    defaultValues: {
      createdAt: feedback.createdAt,
      featured: !!feedback.featured,
      section: feedback.section || '',
      author: feedback.author,
      review: feedback.review,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof feedbackInputSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editFeedback(feedback.id, values);

      if (success) {
        toast.success('Successfully updated');
      } else {
        toast.error(message);
      }
    })
  };

  return (
    <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="text-xs flex flex-col gap-4 w-full rounded-md">
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
              defaultSelectedKeys={[feedback.section]}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Section"
              label="Section"
            >
              {sections.map(section => (
                <SelectItem key={section.type} value={section.type}>
                  {section.title}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={form.control}
          name="createdAt"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Created At"
              label="Created At"
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.checked)}
              >
                Is Featured
              </Checkbox>
          
              {fieldState.error && (
                <span className="text-danger text-small">
                  {fieldState.error?.message}
                </span>
              )}
            </>
          )}
        />

        <Button className="max-w-fit" type="submit" color="primary" disabled={isPending}>
          {isPending ? 'Loading...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default EditFeedbackForm;
