import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchSignificantProjectBySlug } from '@/db/queries/projects';
import { BackToAllLink, ProjectDetailed } from '@/components';
import paths from '@/paths';

interface ProjectBySlugPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: ProjectBySlugPageProps): Promise<Metadata> {
  const project = await fetchSignificantProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.name,
    description: project.shortDescription,
    keywords: [project.name, ...project.stacks.map(({ title }) => title)],
  };
}

const ProjectBySlugPage = async ({ params }: ProjectBySlugPageProps) => {
  const project = await fetchSignificantProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <BackToAllLink path={paths.projects()} />
      <ProjectDetailed project={project} />
    </>
  );
};

export default ProjectBySlugPage;
