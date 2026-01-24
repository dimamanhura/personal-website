'use client';

import { FunctionComponent, useCallback } from 'react';
import { User } from '@nextui-org/react';
import { TechStackWithProjectsAndTools } from '@/db/queries/tech-stacks';
import { deleteTechStack } from '@/actions';
import { techStacksColumns } from '@/columns';
import { FeaturedFlag, ItemsTable, TableActions, TruncatedText } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';

interface TechStacksTableProps {
  items: TechStackWithProjectsAndTools[];
  count: number;
}

export const TechStacksTable: FunctionComponent<TechStacksTableProps> = ({ items, count }) => {
  const renderCell = useCallback(
    (
      techStack: TechStackWithProjectsAndTools,
      columnKey: ColumnKey<TechStackWithProjectsAndTools>,
    ) => {
      if (columnKey === 'actions') {
        return (
          <TableActions
            showPath={paths.techStacksDetailsByIdAdmin}
            editPath={paths.techStacksEditByIdAdmin}
            itemId={techStack.id}
            onDelete={deleteTechStack}
          />
        );
      }

      switch (columnKey) {
        case 'id':
          return <TruncatedText text={techStack.id} />;

        case 'title':
          return (
            <User
              avatarProps={{
                src: techStack.logo || '',
                size: 'sm',
                radius: 'md',
              }}
              name={techStack.title}
            />
          );

        case 'featured':
          return <FeaturedFlag featured={techStack.featured} />;

        case 'category':
          return techStack.category ? techStack.category.title : 'N/A';

        case 'tools':
          return techStack.tools?.length || 0;

        default:
          const value = techStack[columnKey];
          return typeof value === 'string' ? value : null;
      }
    },
    [],
  );

  return (
    <ItemsTable<TechStackWithProjectsAndTools>
      items={items}
      count={count}
      title={'Tech Stack'}
      columns={techStacksColumns}
      renderCell={renderCell}
    />
  );
};
