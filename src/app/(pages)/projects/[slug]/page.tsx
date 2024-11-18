import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaUser } from "react-icons/fa";
import paths from "@/paths";
import { fetchSignificantProjectBySlug } from "@/db/queries/projects";
import { Avatar, Chip } from "@nextui-org/react";
import { formatDateRange } from "@/utils/format-date-range";
import ItemsList from "@/components/items-list";
import ChipsList from "@/components/chips-list";

interface ProjectBySlugPageProps {
  params: {
    slug: string;
  };
}

const ProjectBySlugPage = async ({ params }: ProjectBySlugPageProps) => {
  const project = await fetchSignificantProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <Link className="underline items-center text-blue-500 flex mb-6" href={paths.projects()}>
        <FaArrowLeft className="mr-1" />
        Back
      </Link>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-6">
            <Avatar
              isBordered
              className="w-20 h-20 text-large flex-shrink-0"
              radius="sm"
              src={project.logo}
            />
            <div>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-medium">
              {project.name}
              </h1>
              <h2 className="text-base md:text-lg lg:text-xl text-zinc-400">
                {project.shortDescription}
              </h2>
            </div>
          </div>
          <Chip
            className="text-sm"
            variant="flat"
            color="primary"
            size="md"
          >
            <span className="flex gap-2 items-center">
              <FaCalendar size={12} />
              {formatDateRange(project.startAt, project.endAt)}
            </span>
          </Chip>
        </header>

        <Chip color="primary" variant="flat" radius="md" size="md">
           <span className="flex gap-2 items-center">
              <FaUser size={12} />
              {project.position}
            </span>
        </Chip>

        <p className="text-sm">
          {project.longDescription}
        </p>

        {project.features.length > 0 && (
          <ItemsList
            title="Features"
            items={project.features}
          />
        )}

        <ItemsList
          title="Responsibilities"
          items={project.responsibilities}
        />

        {project.achievements.length > 0 && (
          <ItemsList
            title="Challenges & Achievements"
            items={project.achievements.map(achievement => achievement.title)}
          />
        )}

        <ChipsList
          title="Stack"
          chips={project.stack}
        />

        {project.integrations.length > 0 && (
          <ChipsList
            title="Integrations"
            chips={project.integrations}
          />
        )}
      </div>
    </>
  );
}

export default ProjectBySlugPage;
