'use client';

import { FunctionComponent } from 'react';
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  Table,
} from "@nextui-org/react";
import { Column } from '@/types/Column';
import TablePagination from './table-pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Sort } from '@/types/Sort';

interface ItemsTableProps {
  items: any[];
  count: number;
  title: string;
  columns: Column[];
  renderCell: (item: any, columnKey: number | string) => JSX.Element | JSX.Element[]; 
};
 
const ItemsTable: FunctionComponent<ItemsTableProps> = ({
  columns,
  items,
  count,
  title,
  renderCell,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('order');
  const { replace } = useRouter();

  const handleChangePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
  
    if (nextPage) {
      params.set('page', `${nextPage}`)
    } else {
      params.delete('page')
    }

    replace(`${pathname}?${params.toString()}`)
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

    replace(`${pathname}?${params.toString()}`)
  };

  return (
    <Table
      isHeaderSticky
      removeWrapper
      aria-labelledby={title}
      sortDescriptor={sortBy && order ? { column: sortBy, direction: order } : null}
      onSortChange={handleChangeSort}
      bottomContent={(
        <TablePagination
          totalCount={count}
          page={page}
          onChange={handleChangePage}
        />
      )}
    >
      <TableHeader>
        {columns.map((column: Column) =>
          <TableColumn key={column.key} allowsSorting>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={"No rows to display."}>
        {items.map((item: any) =>
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
        
      </TableBody>
    </Table>
  );
};

export default ItemsTable;
