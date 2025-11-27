'use client'

import { FunctionComponent } from "react";
import DeleteTableItemButton from "@/components/delete-table-item-button";
import EditTableItemButton from "@/components/edit-table-item-button";
import ShowTableItemButton from "@/components/show-table-item-button";

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
      <ShowTableItemButton path={showPath(itemId)} />
      <EditTableItemButton path={editPath(itemId)} />
      <DeleteTableItemButton onDelete={() => onDelete(itemId)} />
    </div>
  );
};

export default TableActions;
