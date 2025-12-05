'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { EditItemButton, DeleteItemButton } from '@/components';
import { deleteContactRequest } from '@/actions';
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
    <div className="flex justify-between mb-6">
      <Link
        className="flex underline items-center text-blue-500"
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
