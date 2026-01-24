import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProjectsById } from '@/db/queries/projects';
import { fetchTechStacks } from '@/db/queries/tech-stacks';
import { fetchTechTools } from '@/db/queries/tech-tools';
import { deleteProject } from '@/actions';
import { OverviewHeader, EditProjectForm } from '@/components';
import paths from '@/paths';

interface ProjectEditPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: ProjectEditPageProps): Metadata {
  return {
    title: `Project - Edit - ${id}`,
  };
}

const ProjectEditPage = async ({ params }: ProjectEditPageProps) => {
  const project = await fetchProjectsById(params.id);

  if (!project) {
    return notFound();
  }

  const { items: stacks } = await fetchTechStacks({ all: true });
  const { items: tools } = await fetchTechTools({ all: true });

  return (
    <>
      <OverviewHeader
        backPath={paths.projectsAdmin()}
        itemId={params.id}
        onDelete={deleteProject}
      />
      <EditProjectForm project={project} stacks={stacks} tools={tools} />
    </>
  );
};

export default ProjectEditPage;
