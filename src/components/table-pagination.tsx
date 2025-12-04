'use client';

import { FunctionComponent, useMemo } from 'react';
import { Pagination } from "@nextui-org/react";
import { DEFAULT_LIMIT } from '@/constants';

interface TablePaginationProps {
  totalCount: number;
  page: number;
  onChange: (page: number) => void; 
};
 
export const TablePagination: FunctionComponent<TablePaginationProps> = ({
  totalCount,
  page = 1,
  onChange,
}) => {
  const pages = useMemo(() => {
    return totalCount ? Math.ceil(totalCount / DEFAULT_LIMIT) : 0;
  }, [totalCount]);

  return pages > 0 ? (
    <div className="flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={(page) => onChange(page)}
      />
    </div>
  ) : null
};
 