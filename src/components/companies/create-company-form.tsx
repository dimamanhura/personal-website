'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as actions from '@/actions';
import { ErrorMessage, UploadImageButton, MultiItemField } from '@/components';
import paths from '@/paths';
import { CompanyInput, companyInputSchema } from '@/schemas';

export const CreateCompanyForm = () => {
  const router = useRouter();
  const form = useForm<CompanyInput>({
    resolver: zodResolver(companyInputSchema),
    defaultValues: {
      name: '',
      location: { city: '', country: '' },
      logo: '',
      startAt: undefined,
      endAt: undefined,
      position: '',
      positions: [],
      reasonsOfLeaving: [],
    },
  });
  const logoUrl = form.watch('logo');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<CompanyInput> = async (values) => {
    startTransition(async () => {
      const { success, message, id } = await actions.createCompany(values);

      if (success && id) {
        toast.success('Successfully created');
        router.push(paths.companiesDetailsByIdAdmin(id));
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
          name="name"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Name"
              label="Name"
            />
          )}
        />

        <div className="flex flex-col">
          <UploadImageButton
            title="Logo"
            url={logoUrl}
            onUpload={(url: string) => {
              form.setValue('logo', url);
              form.clearErrors('logo');
            }}
          />

          {form.formState.errors.logo && (
            <ErrorMessage message={form.formState.errors.logo.message} />
          )}
        </div>

        <Controller
          control={form.control}
          name="startAt"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Start At"
              label="Start At"
              type="date"
            />
          )}
        />

        <Controller
          control={form.control}
          name="endAt"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="End At"
              label="End At"
              type="date"
            />
          )}
        />

        <Controller
          control={form.control}
          name="location.city"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="City"
              label="City"
            />
          )}
        />

        <Controller
          control={form.control}
          name="location.country"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Country"
              label="Country"
            />
          )}
        />

        <Controller
          control={form.control}
          name="position"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Position"
              label="Position"
            />
          )}
        />

        <MultiItemField
          label="Positions"
          name="positions"
          form={form}
          renderField={(index) => (
            <div className="flex w-full gap-2">
              <Controller
                control={form.control}
                name={`positions.${index}.title`}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    labelPlacement="inside"
                    label="Position"
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    size="sm"
                  />
                )}
              />

              <Controller
                control={form.control}
                name={`positions.${index}.startAt`}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    labelPlacement="inside"
                    label="Start At"
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    type="date"
                  />
                )}
              />

              <Controller
                control={form.control}
                name={`positions.${index}.endAt`}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    labelPlacement="inside"
                    label="End At"
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    type="date"
                  />
                )}
              />
            </div>
          )}
        />

        <MultiItemField label="Reasons of Leaving" name="reasonsOfLeaving" form={form} />

        <Button className="max-w-fit" type="submit" color="primary" disabled={isPending}>
          {isPending ? 'Loading...' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
