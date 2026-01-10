import { Avatar, Chip } from '@nextui-org/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft, FaCalendar, FaUser } from 'react-icons/fa';
import { fetchSignificantProjectBySlug } from '@/db/queries/projects';
import { formatDateRange } from '@/utils/format-date-range';
import { ItemsList, ChipsList } from '@/components';
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
      <div className="flex flex-col gap-6">
        <header className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-6">
            <Avatar
              isBordered
              className="h-20 w-20 flex-shrink-0 text-large"
              radius="sm"
              name={project.logo ? project.name : 'N/A'}
              src={project.logo || ''}
            />
            <div>
              <h1 className="text-xl font-medium md:text-2xl lg:text-4xl">{project.name}</h1>
              <h2 className="text-base text-zinc-400 md:text-lg lg:text-xl">
                {project.shortDescription}
              </h2>
            </div>
          </div>
          <Chip className="text-sm" variant="flat" color="primary" size="md">
            <span className="flex items-center gap-2">
              <FaCalendar size={12} />
              {formatDateRange(project.startAt, project.endAt)}
            </span>
          </Chip>
        </header>

        <Chip color="primary" variant="flat" radius="md" size="md">
          <span className="flex items-center gap-2">
            <FaUser size={12} />
            {project.position}
          </span>
        </Chip>

        <p className="text-sm">{project.longDescription}</p>

        {project.features.length > 0 && <ItemsList title="Features" items={project.features} />}

        <ItemsList title="Responsibilities" items={project.responsibilities} />

        {project.achievements.length > 0 && (
          <ItemsList
            title="Challenges & Achievements"
            items={project.achievements.map((achievement) => achievement.title)}
          />
        )}

        <ChipsList title="Stack" chips={project.stack} />

        {project.integrations.length > 0 && (
          <ChipsList title="Integrations" chips={project.integrations} />
        )}
      </div>
    </>
  );
};

export default ProjectBySlugPage;
