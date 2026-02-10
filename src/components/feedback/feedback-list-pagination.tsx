'use client';

import { FunctionComponent, useMemo } from 'react';
import { Pagination } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_LIMIT } from '@/constants';

interface TablePaginationProps {
  totalCount: number;
  page: number;
}

export const FeedbackListPagination: FunctionComponent<TablePaginationProps> = ({
  totalCount,
  page = 1,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pages = useMemo(() => {
    return totalCount ? Math.ceil(totalCount / DEFAULT_LIMIT) : 0;
  }, [totalCount]);

  if (pages <= 1) {
    return null;
  }

  const handleChangePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextPage) {
      params.set('page', `${nextPage}`);
    } else {
      params.delete('page');
    }

    router.push(`?${params.toString()}`, { scroll: true });
  };

  return pages > 0 ? (
    <div className="mt-6 flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={(page) => handleChangePage(page)}
      />
    </div>
  ) : null;
};
