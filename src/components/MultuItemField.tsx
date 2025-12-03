'use client';

import { Controller, useFieldArray } from 'react-hook-form';
import { Button, Input } from "@nextui-org/react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface MultiItemFieldProps {
  form: any;
  label: string;
  name: string;
};

const MultiItemField = ({ form, label, name }: MultiItemFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name as never,
  });

  const error = form.formState.errors?.[name]?.message;

  return (
    <div className="flex flex-col gap-4 items-start">
      <p className="text-lg">{label}</p>

      {!!error && (
        <span className="text-danger text-tiny">
          {error}
        </span>
      )}
      
      {fields.map((field, index) => {
        const fieldState = form.formState.errors?.[name]?.[index];
        return (
          <div key={field.id} className="flex items-start gap-4 w-full">
            <Controller
              control={form.control}
              name={`${name}.${index}`}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  placeholder={`${label} ${index + 1}`}
                  size='sm'
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
        );
      })}

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

export default MultiItemField;
