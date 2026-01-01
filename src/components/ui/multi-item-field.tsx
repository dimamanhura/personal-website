'use client';

import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { ErrorMessage } from './error-message';

interface MultiItemFieldProps {
  maxLength?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  label: string;
  name: string;
  renderField?: (index: number) => JSX.Element;
}

export const MultiItemField = ({
  label,
  form,
  name,
  maxLength = 10,
  renderField,
}: MultiItemFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name as never,
  });

  const error = form.formState.errors?.[name]?.message;

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-lg">{label}</p>

      {!!error && <ErrorMessage message={error as string} />}

      {fields.map((field, index) => (
        <div key={field.id} className="flex w-full items-start gap-4">
          {renderField ? (
            renderField(index)
          ) : (
            <Controller
              control={form.control}
              name={`${name}.${index}`}
              render={({ field, fieldState }) => {
                const isInvalid = !!fieldState.error;
                const errorMessage = fieldState.error?.message;

                return (
                  <Input
                    {...field}
                    isInvalid={isInvalid}
                    errorMessage={errorMessage}
                    placeholder={`${label} ${index + 1}`}
                    size="sm"
                  />
                );
              }}
            />
          )}

          <Button
            color="danger"
            size="lg"
            type="button"
            variant="flat"
            onClick={() => remove(index)}
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
        disabled={fields.length >= maxLength}
      >
        <FaPlus />
        Add more
      </Button>
    </div>
  );
};
