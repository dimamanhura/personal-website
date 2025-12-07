'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { deleteTechnology } from '@/actions';
import { EditItemButton, DeleteItemButton } from '@/components';
import paths from '@/paths';
import { ItemOverviewHeaderProps } from '@/types';

export const TechnologyOverviewHeader = ({
  withDelete = true,
  withEdit = true,
  itemId,
}: ItemOverviewHeaderProps) => {
  return (
    <div className="mb-6 flex justify-between">
      <Link className="flex items-center text-blue-500 underline" href={paths.technologiesAdmin()}>
        <FaArrowLeft className="mr-1" />
        Back
      </Link>

      <div className="flex gap-2">
        {withEdit && itemId && (
          <EditItemButton isIconOnly={false} path={paths.technologiesEditByIdAdmin(itemId)} />
        )}
        {withDelete && itemId && (
          <DeleteItemButton isIconOnly={false} onDelete={() => deleteTechnology(itemId)} />
        )}
      </div>
    </div>
  );
};
