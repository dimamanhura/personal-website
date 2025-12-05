'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react';
import { TechnologySection } from '@prisma/client';
import { toast } from 'sonner';
import { z } from 'zod';
import { TechnologyWithSection } from '@/db/queries/technologies';
import * as actions from '@/actions';
import { technologyInputSchema } from '@/schemas';

interface EditTechnologyFormProps {
  technology: TechnologyWithSection;
  technologySections: TechnologySection[];
}

export const EditTechnologyForm = ({ technology, technologySections }: EditTechnologyFormProps) => {
  const form = useForm<z.infer<typeof technologyInputSchema>>({
    resolver: zodResolver(technologyInputSchema),
    defaultValues: {
      featured: !!technology.featured,
      section: technology.section || undefined,
      title: technology.title,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof technologyInputSchema>> = async (values) => {
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
          name="section"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              defaultSelectedKeys={[technology.section]}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Section"
              label="Section"
            >
              {technologySections.map((technologySection) => (
                <SelectItem key={technologySection.type} value={technologySection.type}>
                  {technologySection.title}
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

              {fieldState.error && (
                <span className="text-tiny text-danger">{fieldState.error?.message}</span>
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
