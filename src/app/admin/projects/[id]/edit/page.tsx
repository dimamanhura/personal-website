import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OverviewHeader } from '@/components';
import { deleteProject } from '@/actions';
import paths from '@/paths';
import { EditProjectForm } from '@/components/projects/edit-project-form';
import { fetchProjectsById } from '@/db/queries/projects';

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
