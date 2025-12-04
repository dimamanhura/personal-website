'use client';

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { EditItemButton, DeleteItemButton } from "@/components";
import { deleteFeedback } from "@/actions";
import { ItemOverviewHeaderProps } from "@/types";
import paths from "@/paths";

export const FeedbackOverviewHeader = ({
  withDelete = true,
  withEdit = true,
  itemId,
}: ItemOverviewHeaderProps) => {
  return (
    <div className="flex justify-between mb-6">
      <Link className="flex underline items-center text-blue-500" href={paths.feedbackAdmin()}>
        <FaArrowLeft className="mr-1" />
        Back
      </Link>

      <div className="flex gap-2">
        {withEdit && itemId && (
          <EditItemButton
            isIconOnly={false}
            path={paths.editFeedback(itemId)}
          />
        )}
        {withDelete && itemId && (
          <DeleteItemButton
            isIconOnly={false}
            onDelete={() => deleteFeedback(itemId)}
          />
        )}
      </div>
    </div>
  );
}
