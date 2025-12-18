'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { EditItemButton, DeleteItemButton } from '@/components';
import { ItemOverviewHeaderProps } from '@/types';

export const OverviewHeader = ({
  itemId,
  backPath,
  editPath,
  onDelete,
}: ItemOverviewHeaderProps) => {
  return (
    <div className="mb-6 flex justify-between">
      <Link className="flex items-center text-blue-500 underline" href={backPath}>
        <FaArrowLeft className="mr-1" />
        Back
      </Link>

      <div className="flex gap-2">
        {editPath && <EditItemButton isIconOnly={false} path={editPath} />}
        {onDelete && <DeleteItemButton isIconOnly={false} onDelete={() => onDelete(itemId)} />}
      </div>
    </div>
  );
};
