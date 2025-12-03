'use client';

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import EditItemButton from "@/components/edit-item-button";
import DeleteItemButton from "@/components/delete-item-button";
import paths from "@/paths";
import { ItemOverviewHeaderProps } from "@/types/ItemOverviewHeaderProps";
import { deleteAchievement } from "@/actions";

const AchievementOverviewHeader = ({
  withDelete = true,
  withEdit = true,
  itemId,
}: ItemOverviewHeaderProps) => {
  return (
    <div className="flex justify-between mb-6">
      <Link className="flex underline items-center text-blue-500" href={paths.achievementsAdmin()}>
        <FaArrowLeft className="mr-1" />
        Back
      </Link>

      <div className="flex gap-2">
        {withEdit && itemId && (
          <EditItemButton
            isIconOnly={false}
            path={paths.editAchievement(itemId)}
          />
        )}
        {withDelete && itemId && (
          <DeleteItemButton
            isIconOnly={false}
            onDelete={() => deleteAchievement(itemId)}
          />
        )}
      </div>
    </div>
  );
}

export default AchievementOverviewHeader;
