'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { deleteContactRequest } from '@/actions';
import { EditItemButton, DeleteItemButton } from '@/components';
import paths from '@/paths';

interface ItemOverviewHeaderProps {
  withEdit?: boolean;
  itemId: string;
}

export const ContactRequestOverviewHeader = ({
  withEdit = true,
  itemId,
}: ItemOverviewHeaderProps) => {
  return (
    <div className="mb-6 flex justify-between">
      <Link
        className="flex items-center text-blue-500 underline"
        href={paths.contactRequestsAdmin()}
      >
        <FaArrowLeft className="mr-1" />
        Back
      </Link>

      <div className="flex gap-2">
        {withEdit && <EditItemButton isIconOnly={false} path={paths.editContactRequest(itemId)} />}
        <DeleteItemButton isIconOnly={false} onDelete={() => deleteContactRequest(itemId)} />
      </div>
    </div>
  );
};
