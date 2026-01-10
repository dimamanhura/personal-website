import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { fetchSignificantProjectBySlug } from '@/db/queries/projects';
import { ProjectDetailed } from '@/components';
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
    keywords: [project.name, ...project.stack],
  };
}

const ProjectBySlugPage = async ({ params }: ProjectBySlugPageProps) => {
  const project = await fetchSignificantProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <div className="mb-6">
        <Link className="flex items-center text-blue-500 underline" href={paths.projects()}>
          <FaArrowLeft className="mr-1" />
          Back
        </Link>
      </div>
      <ProjectDetailed project={project} />
    </>
  );
};

export default ProjectBySlugPage;
