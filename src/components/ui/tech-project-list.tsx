'use client';

import { Chip, Listbox, ListboxItem } from '@nextui-org/react';
import { Project } from '@prisma/client';
import Link from 'next/link';
import { FaInbox } from 'react-icons/fa';
import paths from '@/paths';
import { formatDateRange, getDurationInYears } from '@/utils';

interface TechProjectListProps {
  techTitle: string;
  projects: Project[];
}

export const TechProjectList = ({ projects, techTitle }: TechProjectListProps) => {
  if (!projects.length) {
    return (
      <div className="flex min-w-[140px] flex-col items-center justify-center px-2 py-4">
        <div className="mb-2 rounded-full bg-default-100 p-2">
          <FaInbox className="h-4 w-4 text-default-400" />
        </div>
        <p className="text-tiny italic text-default-400">No projects tagged yet</p>
      </div>
    );
  }

  return (
    <div className="min-w-64 px-1 py-2">
      <div className="mb-3 flex items-center justify-between border-b border-default-100 pb-2">
        <span className="text-xs font-medium text-default-400">USED IN PROJECT</span>
        <Chip size="sm" variant="flat">
          {techTitle}
        </Chip>
      </div>
      <Listbox aria-label="Related Projects" variant="flat" className="p-0" items={projects || []}>
        {(project) => (
          <ListboxItem
            key={project.id}
            textValue={project.name}
            as={Link}
            href={paths.projectBySlug(project.slug)}
            description={formatDateRange(project.startAt, project.endAt)}
            endContent={
              <Chip size="sm" variant="dot" color="primary" className="border-none text-xs">
                {getDurationInYears(project.startAt, project.endAt)}y
              </Chip>
            }
          >
            <span className="font-medium">{project.name}</span>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
};
