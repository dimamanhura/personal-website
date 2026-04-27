'use client';

import { FunctionComponent, useCallback } from 'react';
import type { ContactRequest } from '@prisma/client';
import { deleteContactRequest } from '@/actions';
import { contactRequestsColumns } from '@/columns';
import {
  ContactRequestClassification,
  ContactRequestStatus,
  TruncatedText,
  TableActions,
  ItemsTable,
} from '@/components';
import paths from '@/paths';
import { ColumnKey } from '@/types';

interface ContactRequestsTableProps {
  items: ContactRequest[];
  count: number;
}

export const ContactRequestsTable: FunctionComponent<ContactRequestsTableProps> = ({
  items,
  count,
}) => {
  const renderCell = useCallback(
    (contactRequest: ContactRequest, columnKey: ColumnKey<ContactRequest>) => {
      if (columnKey === 'actions') {
        return (
          <TableActions
            showPath={paths.contactRequestsDetailsByIdAdmin}
            editPath={paths.contactRequestsEditByIdAdmin}
            itemId={contactRequest.id}
            onDelete={deleteContactRequest}
          />
        );
      }

      switch (columnKey) {
        case 'id':
          return <TruncatedText text={contactRequest.id} />;

        case 'createdAt':
          return contactRequest.createdAt.toLocaleDateString();

        case 'classification':
          return <ContactRequestClassification classification={contactRequest.classification} />;

        case 'resolved':
          return <ContactRequestStatus resolved={contactRequest.resolved} />;

        default:
          return contactRequest[columnKey];
      }
    },
    [],
  );

  return (
    <ItemsTable<ContactRequest>
      items={items}
      count={count}
      title={'Contact Requests'}
      columns={contactRequestsColumns}
      renderCell={renderCell}
    />
  );
};
