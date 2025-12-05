'use client';

import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { z } from 'zod';
import { achievementInputSchema } from '@/schemas';

interface MultiItemFieldProps {
  form: UseFormReturn<z.infer<typeof achievementInputSchema>>;
  label: string;
  name: 'solution' | 'result' | 'notes';
}

export const MultiItemField = ({ form, label, name }: MultiItemFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name as never,
  });

  const error = form.formState.errors?.[name]?.message;

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-lg">{label}</p>

      {!!error && <span className="text-tiny text-danger">{error}</span>}

      {fields.map((field, index) => (
        <div key={field.id} className="flex w-full items-start gap-4">
          <Controller
            control={form.control}
            name={`${name}.${index}`}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                placeholder={`${label} ${index + 1}`}
                size="sm"
              />
            )}
          />

          <Button
            color="danger"
            size="lg"
            type="button"
            variant="flat"
            onClick={() => remove(index)}
            disabled={fields.length <= 1}
            isIconOnly
          >
            <FaTrash />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        color="primary"
        variant="flat"
        onClick={() => append('')}
        disabled={fields.length >= 10}
      >
        <FaPlus />
        Add more
      </Button>
    </div>
  );
};
