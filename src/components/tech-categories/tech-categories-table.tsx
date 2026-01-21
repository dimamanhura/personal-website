'use client';

import { FunctionComponent, useCallback } from 'react';
import { TechCategoryWithStacks } from '@/db/queries/tech-categories';
import { deleteTechCategory } from '@/actions';
import { techCategoriesColumns } from '@/columns';
import { ItemsTable, TableActions, TruncatedText } from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';

interface TechCategoriesTableProps {
  items: TechCategoryWithStacks[];
  count: number;
}

export const TechCategoriesTable: FunctionComponent<TechCategoriesTableProps> = ({
  items,
  count,
}) => {
  const renderCell = useCallback(
    (techCategory: TechCategoryWithStacks, columnKey: ColumnKey<TechCategoryWithStacks>) => {
      if (columnKey === 'actions') {
        return (
          <TableActions
            showPath={paths.techCategoriesDetailsByIdAdmin}
            editPath={paths.techCategoriesEditByIdAdmin}
            itemId={techCategory.id}
            onDelete={deleteTechCategory}
          />
        );
      }

      switch (columnKey) {
        case 'id':
          return <TruncatedText text={techCategory.id} />;

        case 'stacks':
          return techCategory.stacks.length;

        default:
          return techCategory[columnKey];
      }
    },
    [],
  );

  return (
    <ItemsTable<TechCategoryWithStacks>
      items={items}
      count={count}
      title={'Tech Categories'}
      columns={techCategoriesColumns}
      renderCell={renderCell}
    />
  );
};
