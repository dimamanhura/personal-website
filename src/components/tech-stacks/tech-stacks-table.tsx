'use client';

import { FunctionComponent, useCallback } from 'react';
import { User } from '@nextui-org/react';
import { TechStackWithTools } from '@/db/queries/tech-stacks';
import { deleteTechStack } from '@/actions';
import { techStacksColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';

interface TechStacksTableProps {
  items: TechStackWithTools[];
  count: number;
}

export const TechStacksTable: FunctionComponent<TechStacksTableProps> = ({ items, count }) => {
  const renderCell = useCallback(
    (techStack: TechStackWithTools, columnKey: ColumnKey<TechStackWithTools>) => {
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
                src: techStack.logo,
                size: 'sm',
                radius: 'md',
              }}
              name={techStack.title}
            />
          );

        case 'tools':
          return techStack.tools.length;

        default:
          return techStack[columnKey];
      }
    },
    [],
  );

  return (
    <ItemsTable<TechStackWithTools>
      items={items}
      count={count}
      title={'Tech Stack'}
      columns={techStacksColumns}
      renderCell={renderCell}
    />
  );
};
