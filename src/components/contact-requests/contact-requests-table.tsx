'use client'

import { FunctionComponent, useCallback } from "react";
import type { ContactRequest } from "@prisma/client";
import { ItemsTable, TableActions, ContactRequestStatus, TruncatedText } from "@/components";
import { deleteContactRequest } from "@/actions";
import paths from "@/paths";
import { ColumnKey } from "@/types";
import { contactRequestsColumns } from "@/columns";

interface ContactRequestsTableProps {
  items: ContactRequest[];
  count: number;
};

export const ContactRequestsTable: FunctionComponent<ContactRequestsTableProps> = ({
  items,
  count,
}) => {
  const renderCell = useCallback((contactRequest: ContactRequest, columnKey: ColumnKey<ContactRequest>) => {
    if (columnKey === 'actions') {
      return (
        <TableActions
          showPath={paths.contactRequestDetails}
          editPath={paths.editContactRequest}
          itemId={contactRequest.id}
          onDelete={deleteContactRequest}
        />
      );
    }

    switch (columnKey) {
      case 'id':
        return <TruncatedText text={contactRequest.id} />;
      
      case 'message':
        return <TruncatedText text={contactRequest.message} />;

      case 'resolution':
        return <TruncatedText text={contactRequest.resolution} />;
      
      case 'createdAt':
        return contactRequest.createdAt.toLocaleDateString();

      case 'resolved':
        return <ContactRequestStatus resolved={contactRequest.resolved} />;

      default:
        return contactRequest[columnKey];
    }
  }, []);

  return (
    <ItemsTable
      items={items}
      count={count}
      title={'Contact Requests'}
      columns={contactRequestsColumns}
      renderCell={renderCell as unknown as <T, K>(item: T, columnKey: K) => JSX.Element}
    />
  );
};
