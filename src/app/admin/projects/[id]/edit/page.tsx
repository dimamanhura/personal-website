import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProjectsById } from '@/db/queries/projects';
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

  return (
    <>
      <OverviewHeader
        backPath={paths.projectsAdmin()}
        itemId={params.id}
        onDelete={deleteProject}
      />
      <EditProjectForm project={project} />
    </>
  );
};

export default ProjectEditPage;
