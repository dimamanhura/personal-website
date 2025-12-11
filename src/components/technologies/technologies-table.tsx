'use client';

import { FunctionComponent, useCallback } from 'react';
import { User } from '@nextui-org/react';
import { TechnologyWithSection } from '@/db/queries/technologies';
import { deleteTechnology } from '@/actions';
import { technologiesColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText, FeaturedFlag } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';

interface TechnologiesTableProps {
  items: TechnologyWithSection[];
  count: number;
}

export const TechnologiesTable: FunctionComponent<TechnologiesTableProps> = ({ items, count }) => {
  const renderCell = useCallback(
    (technology: TechnologyWithSection, columnKey: ColumnKey<TechnologyWithSection>) => {
      if (columnKey === 'actions') {
        return (
          <TableActions
            showPath={paths.technologiesDetailsByIdAdmin}
            editPath={paths.technologiesEditByIdAdmin}
            itemId={technology.id}
            onDelete={deleteTechnology}
          />
        );
      }

      switch (columnKey) {
        case 'id':
          return <TruncatedText text={technology.id} />;

        case 'featured':
          return <FeaturedFlag featured={technology.featured} />;

        case 'section':
          return (
            <User
              avatarProps={{ src: technology?.section?.logo, size: 'sm', radius: 'md' }}
              name={technology?.section?.title}
            />
          );

        default:
          return technology[columnKey];
      }
    },
    [],
  );

  return (
    <ItemsTable
      items={items}
      count={count}
      title={'Technologies'}
      columns={technologiesColumns}
      renderCell={renderCell as unknown as <T, K>(item: T, columnKey: K) => JSX.Element}
    />
  );
};
