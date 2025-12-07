'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { deleteAchievement } from '@/actions';
import { EditItemButton, DeleteItemButton } from '@/components';
import paths from '@/paths';
import { ItemOverviewHeaderProps } from '@/types';

export const AchievementOverviewHeader = ({
  withDelete = true,
  withEdit = true,
  itemId,
}: ItemOverviewHeaderProps) => {
  return (
    <div className="mb-6 flex justify-between">
      <Link className="flex items-center text-blue-500 underline" href={paths.achievementsAdmin()}>
        <FaArrowLeft className="mr-1" />
        Back
      </Link>

      <div className="flex gap-2">
        {withEdit && itemId && (
          <EditItemButton isIconOnly={false} path={paths.achievementsEditByIdAdmin(itemId)} />
        )}
        {withDelete && itemId && (
          <DeleteItemButton isIconOnly={false} onDelete={() => deleteAchievement(itemId)} />
        )}
      </div>
    </div>
  );
};
