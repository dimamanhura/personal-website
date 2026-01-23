'use client';

import { useTransition } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { toast } from 'sonner';
import { ProjectWithTech } from '@/db/queries/projects';
import * as actions from '@/actions';
import { ErrorMessage, UploadImageButton, MultiItemField, SlugGeneratorField } from '@/components';
import { ProjectInput, projectInputSchema } from '@/schemas';
import { formatDateForInput } from '@/utils';
import { TechStack, TechTool } from '@prisma/client';

interface EditProjectFormProps {
  project: ProjectWithTech;
  stacks: TechStack[];
  tools: TechTool[];
}

export const EditProjectForm = ({ project, stacks, tools }: EditProjectFormProps) => {
  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectInputSchema),
    defaultValues: {
      name: project.name,
      slug: project.slug,
      shortDescription: project.shortDescription,
      longDescription: project.longDescription,
      features: project.features || [],
      startAt: formatDateForInput(project.startAt),
      endAt: formatDateForInput(project.endAt),
      logo: project.logo || undefined,
      position: project.position,
      team: project.team,
      featured: !!project.featured,
      responsibilities: project.responsibilities,
      achievements: project.achievements || [],
      stacks: project.stacks ? project.stacks.map(({ id }) => id) : [],
      integrations: project.integrations ? project.integrations.map(({ id }) => id) : [],
      tools: project.tools ? project.tools.map(({ id }) => id) : [],
    },
  });
  const logoUrl = form.watch('logo');
  const name = form.watch('name');

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<ProjectInput> = async (values) => {
    startTransition(async () => {
      const { success, message } = await actions.editProject(project.id, values);

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

        <MultiItemField label="Responsibilities" name="responsibilities" form={form} />

        <Controller
          control={form.control}
          name="stacks"
          render={({ field, fieldState }) => (
            <Select
              selectionMode="multiple"
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Stacks"
              label="Stacks"
              selectedKeys={field.value ? field.value : []}
              onSelectionChange={(keys) => {
                field.onChange(Array.from(keys));
              }}
              onBlur={field.onBlur}
            >
              {stacks.map((stack) => (
                <SelectItem key={stack.id} value={stack.id}>
                  {stack.title}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={form.control}
          name="integrations"
          render={({ field, fieldState }) => (
            <Select
              selectionMode="multiple"
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Integrations"
              label="Integrations"
              selectedKeys={field.value ? field.value : []}
              onSelectionChange={(keys) => {
                field.onChange(Array.from(keys));
              }}
              onBlur={field.onBlur}
            >
              {tools.map((tool) => (
                <SelectItem key={tool.id} value={tool.id}>
                  {tool.title}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={form.control}
          name="tools"
          render={({ field, fieldState }) => (
            <Select
              selectionMode="multiple"
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              placeholder="Tools"
              label="Tools"
              selectedKeys={field.value ? field.value : []}
              onSelectionChange={(keys) => {
                field.onChange(Array.from(keys));
              }}
              onBlur={field.onBlur}
            >
              {tools.map((tool) => (
                <SelectItem key={tool.id} value={tool.id}>
                  {tool.title}
                </SelectItem>
              ))}
            </Select>
          )}
        />

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
          {isPending ? 'Loading...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};
