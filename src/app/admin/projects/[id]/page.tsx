import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OverviewHeader, ProjectDetailed } from '@/components';
import paths from '@/paths';
import { deleteProject } from '@/actions';
import { fetchProjectsById } from '@/db/queries/projects';

interface ProjectShowPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: ProjectShowPageProps): Metadata {
  return {
    title: `Company - Details - ${id}`,
  };
}

const ProjectShowPage = async ({ params }: ProjectShowPageProps) => {
  const project = await fetchProjectsById(params.id);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <OverviewHeader
        backPath={paths.projectsAdmin()}
        editPath={paths.projectsEditByIdAdmin(params.id)}
        itemId={params.id}
        onDelete={deleteProject}
      />
      <ProjectDetailed project={project} asCard withFeaturedFlag />
    </>
  );
};

export default ProjectShowPage;
