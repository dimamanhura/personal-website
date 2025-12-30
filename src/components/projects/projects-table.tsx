'use client';

import { FunctionComponent, useCallback } from 'react';
import { User } from '@nextui-org/react';
import { Project } from '@prisma/client';
import { deleteProject } from '@/actions';
import { projectsColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';
import { formatDateRange } from '@/utils';

interface ProjectsTableTableProps {
  items: Project[];
  count: number;
}

export const ProjectsTable: FunctionComponent<ProjectsTableTableProps> = ({ items, count }) => {
  const renderCell = useCallback((project: Project, columnKey: ColumnKey<Project>) => {
    if (columnKey === 'actions') {
      return (
        <TableActions
          showPath={paths.projectsDetailsByIdAdmin}
          editPath={paths.projectsEditByIdAdmin}
          itemId={project.id}
          onDelete={deleteProject}
        />
      );
    }

    switch (columnKey) {
      case 'id':
        return <TruncatedText text={project.id} />;

      case 'name':
        return (
          <User
            avatarProps={{
              src: project.logo || undefined,
              size: 'sm',
              radius: 'md',
            }}
            name={project.name}
          />
        );

      case 'shortDescription':
        return <TruncatedText text={project.shortDescription} />;

      case 'startAt':
        return formatDateRange(project.startAt, project.endAt);

      default:
        const value = project[columnKey];
        return typeof value === 'string' ? value : null;
    }
  }, []);

  return (
    <ItemsTable<Project>
      items={items}
      count={count}
      title={'Projects'}
      columns={projectsColumns}
      renderCell={renderCell}
    />
  );
};
