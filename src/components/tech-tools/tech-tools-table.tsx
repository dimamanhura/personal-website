'use client';

import { FunctionComponent, useCallback } from 'react';
import { User } from '@nextui-org/react';
import { TechToolWithStack } from '@/db/queries/tech-tools';
import { deleteTechTool } from '@/actions';
import { techToolsColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText, FeaturedFlag } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';

interface TechToolsTableProps {
  items: TechToolWithStack[];
  count: number;
}

export const TechToolsTable: FunctionComponent<TechToolsTableProps> = ({ items, count }) => {
  const renderCell = useCallback(
    (techTool: TechToolWithStack, columnKey: ColumnKey<TechToolWithStack>) => {
      if (columnKey === 'actions') {
        return (
          <TableActions
            showPath={paths.techToolsDetailsByIdAdmin}
            editPath={paths.techToolsEditByIdAdmin}
            itemId={techTool.id}
            onDelete={deleteTechTool}
          />
        );
      }

      switch (columnKey) {
        case 'id':
          return <TruncatedText text={techTool.id} />;

        case 'featured':
          return <FeaturedFlag featured={techTool.featured} />;

        case 'stack':
          return techTool?.stack ? (
            <User
              avatarProps={{ src: techTool.stack.logo, size: 'sm', radius: 'md' }}
              name={techTool.stack.title}
            />
          ) : (
            'N/A'
          );

        default:
          return techTool[columnKey];
      }
    },
    [],
  );

  return (
    <ItemsTable<TechToolWithStack>
      items={items}
      count={count}
      title={'Tech Tools'}
      columns={techToolsColumns}
      renderCell={renderCell}
    />
  );
};
