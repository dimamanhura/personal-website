'use client';

import { TableHeader, TableColumn, TableBody, TableCell, TableRow, Table } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TablePagination } from '@/components';
import { Column, ColumnKey, Sort } from '@/types';

interface BaseItem {
  id: string;
}

interface ItemsTableProps<T extends BaseItem> {
  items: T[];
  count: number;
  title: string;
  columns: Column<ColumnKey<T>>[];
  renderCell: (item: T, columnKey: ColumnKey<T>) => React.ReactNode;
}

export const ItemsTable = <T extends BaseItem>({
  columns,
  items,
  count,
  title,
  renderCell,
}: ItemsTableProps<T>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('order');
  const { replace } = useRouter();

  const handleChangePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (nextPage) {
      params.set('page', `${nextPage}`);
    } else {
      params.delete('page');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeSort = (nextSort: Sort) => {
    const params = new URLSearchParams(searchParams);

    if (nextSort) {
      params.set('sortBy', `${nextSort.column}`);
      params.set('order', `${nextSort.direction}`);
    } else {
      params.delete('sortBy');
      params.delete('order');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Table
      isHeaderSticky
      removeWrapper
      isStriped
      aria-labelledby={title}
      sortDescriptor={sortBy && order ? { column: sortBy, direction: order } : null}
      onSortChange={handleChangeSort}
      bottomContent={<TablePagination totalCount={count} page={page} onChange={handleChangePage} />}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key} allowsSorting={column.allowsSorting}>
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody emptyContent={'No rows to display.'}>
        {items.map((item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey as ColumnKey<T>)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
