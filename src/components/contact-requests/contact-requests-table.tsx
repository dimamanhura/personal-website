'use client'

import { FunctionComponent, useCallback } from "react";
import type { ContactRequest } from "@prisma/client";
import { ItemsTable, TableActions, ContactRequestStatus, TruncatedText } from "@/components";
import { deleteContactRequest } from "@/actions";
import { Column } from "@/types";
import paths from "@/paths";

interface ContactRequestsTableProps {
  items: ContactRequest[];
  count: number;
};

type ContactRequestKey = Extract<keyof ContactRequest, string>;

type ColumnKey = ContactRequestKey | 'actions';

const columns: Column<ColumnKey>[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'name', label: 'Name', allowsSorting: true },
  { key: 'email', label: 'Email', allowsSorting: true },
  { key: 'message', label: 'Message', allowsSorting: true },
  { key: 'createdAt', label: 'Requested At', allowsSorting: true },
  { key: 'resolved', label: 'Resolved', allowsSorting: true },
  { key: 'resolution', label: 'Resolution', allowsSorting: true },
  { key: "actions", label: "Actions", allowsSorting: false },
];

export const ContactRequestsTable: FunctionComponent<ContactRequestsTableProps> = ({
  items,
  count,
}) => {
  const renderCell = useCallback((contactRequest: ContactRequest, columnKey: ColumnKey) => {
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
      columns={columns}
      renderCell={renderCell as unknown as <T, K>(item: T, columnKey: K) => JSX.Element}
    />
  );
};
