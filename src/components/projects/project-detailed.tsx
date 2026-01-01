import { Avatar, Chip, cn } from '@nextui-org/react';
import { Project } from '@prisma/client';
import { FaCalendar, FaUser } from 'react-icons/fa';
import { ItemsList, ChipsList, FeaturedFlag } from '@/components';
import { formatDateRange } from '@/utils';

interface ProjectDetailedProps {
  withFeaturedFlag?: boolean;
  project: Project;
  asCard?: boolean;
}

export const ProjectDetailed = async ({
  withFeaturedFlag,
  project,
  asCard,
}: ProjectDetailedProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        asCard && 'rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800',
      )}
    >
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

        <div className="flex gap-2">
          <Chip className="text-sm" variant="flat" color="primary" size="md">
            <span className="flex items-center gap-2">
              <FaCalendar size={12} />
              {formatDateRange(project.startAt, project.endAt)}
            </span>
          </Chip>
          {withFeaturedFlag && <FeaturedFlag featured={project.featured} />}
        </div>
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
  );
};
