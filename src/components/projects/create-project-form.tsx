'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import * as actions from '@/actions';
import paths from '@/paths';
import { projectInputSchema } from '@/schemas';
import { ErrorMessage, UploadImageButton, MultiItemField, SlugGeneratorField } from '@/components';

export const CreateProjectForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof projectInputSchema>>({
    resolver: zodResolver(projectInputSchema),
    defaultValues: {
      name: '',
      slug: '',
      shortDescription: '',
      longDescription: '',
      features: [],
      startAt: undefined,
      endAt: undefined,
      logo: undefined,
      position: '',
      team: [],
      featured: false,
      responsibilities: [],
      integrations: [],
      stack: [],
      technologies: {
        frontEnd: [],
        backEnd: [],
        testing: [],
        deployment: [],
      },
      achievements: [],
    },
  });
  const logoUrl = form.watch('logo');
  const name = form.watch('name');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof projectInputSchema>> = async (values) => {
    startTransition(async () => {
      const { success, message, id } = await actions.createProject(values);

      if (success && id) {
        toast.success('Successfully created');
        router.push(paths.projectsDetailsByIdAdmin(id));
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

        <SlugGeneratorField text={name} onChange={(value) => form.setValue('slug', value)}>
          <Controller
            control={form.control}
            name="slug"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                placeholder="Slug"
                label="Slug"
              />
            )}
          />
        </SlugGeneratorField>

        <Controller
          control={form.control}
          name="shortDescription"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Short Description"
              label="Short Description"
            />
          )}
        />
        <Controller
          control={form.control}
          name="longDescription"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Long Description"
              label="Long Description"
            />
          )}
        />
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
        <MultiItemField label="Features" name="features" form={form} />
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

        <div className="grid grid-cols-2 gap-4">
          <MultiItemField label="Stack" name="stack" form={form} />
          <MultiItemField label="Integrations" name="integrations" form={form} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MultiItemField
            label="Technologies (front-end)"
            name="technologies.frontEnd"
            form={form}
          />
          <MultiItemField label="Technologies (back-end)" name="technologies.backEnd" form={form} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MultiItemField label="Technologies (testing)" name="technologies.testing" form={form} />
          <MultiItemField
            label="Technologies (deployment)"
            name="technologies.deployment"
            form={form}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MultiItemField label="Responsibilities" name="responsibilities" form={form} />
          <MultiItemField label="Team" name="team" form={form} />
        </div>

        <MultiItemField
          label="Achievements"
          name="achievements"
          form={form}
          renderField={(index) => (
            <div className="flex w-full flex-col gap-2">
              <Controller
                control={form.control}
                name={`achievements.${index}.title`}
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
                name={`achievements.${index}.description`}
                render={({ field, fieldState }) => (
                  <Textarea
                    {...field}
                    placeholder="Description"
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
            </div>
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
