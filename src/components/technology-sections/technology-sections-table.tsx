'use client';

import { FunctionComponent, useCallback } from 'react';
import { User } from '@nextui-org/react';
import { TechnologySectionWithTechnologies } from '@/db/queries/technology-sections';
import { deleteTechnologySection } from '@/actions';
import { technologySectionsColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';

interface TechnologySectionsTableProps {
  items: TechnologySectionWithTechnologies[];
  count: number;
}

export const TechnologySectionsTable: FunctionComponent<TechnologySectionsTableProps> = ({
  items,
  count,
}) => {
  const renderCell = useCallback(
    (
      technologySection: TechnologySectionWithTechnologies,
      columnKey: ColumnKey<TechnologySectionWithTechnologies>,
    ) => {
      if (columnKey === 'actions') {
        return (
          <TableActions
            showPath={paths.technologySectionsDetailsByIdAdmin}
            editPath={paths.technologySectionsEditByIdAdmin}
            itemId={technologySection.id}
            onDelete={deleteTechnologySection}
          />
        );
      }

      switch (columnKey) {
        case 'id':
          return <TruncatedText text={technologySection.id} />;

        case 'title':
          return (
            <User
              avatarProps={{
                src: technologySection.logo,
                size: 'sm',
                radius: 'md',
              }}
              name={technologySection.title}
            />
          );

        case 'technologies':
          return technologySection.technologies.length;

        default:
          return technologySection[columnKey];
      }
    },
    [],
  );

  return (
    <ItemsTable
      items={items}
      count={count}
      title={'Technology Sections'}
      columns={technologySectionsColumns}
      renderCell={renderCell as unknown as <T, K>(item: T, columnKey: K) => JSX.Element}
    />
  );
};
