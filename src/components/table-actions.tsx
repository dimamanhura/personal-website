'use client';

import { FunctionComponent } from 'react';
import { DeleteItemButton, EditItemButton, ShowItemButton } from '@/components';

interface TableActionsProps {
  itemId: string;
  showPath: (itemId: string) => string;
  editPath: (itemId: string) => string;
  onDelete: (itemId: string) => Promise<void>;
}

export const TableActions: FunctionComponent<TableActionsProps> = ({
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
