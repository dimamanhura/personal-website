'use client'

import { FunctionComponent } from "react";
import DeleteItemButton from "@/components/delete-item-button";
import EditItemButton from "@/components/edit-item-button";
import ShowItemButton from "@/components/show-item-button";

interface TableActionsProps {
  itemId: string;
  showPath: (itemId: string) => string;
  editPath: (itemId: string) =>string;
  onDelete: (itemId: string) => Promise<void>;
};

const TableActions: FunctionComponent<TableActionsProps> = ({
  itemId,
  showPath,
  editPath,
  onDelete,
}) => {
  return (
    <div className="relative flex items-center gap-2">
      <ShowItemButton path={showPath(itemId)} />
      <EditItemButton path={editPath(itemId)} />
      <DeleteItemButton onDelete={() => onDelete(itemId)} />
    </div>
  );
};

export default TableActions;
