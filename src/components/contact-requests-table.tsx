'use client'

import { FunctionComponent, useCallback, useMemo } from "react";
import type { ContactRequest } from "@prisma/client";
import ItemsTable from "@/components/items-table";
import TableActions from "@/components/table-actions";
import { deleteContactRequest } from "@/actions/contact-request";
import { formatId } from "@/utils/format-id";
import { Column } from "@/types/Column";
import paths from "@/paths";

interface ContactRequestsTableProps {
  items: ContactRequest[];
  count: number;
};

const ContactRequestsTable: FunctionComponent<ContactRequestsTableProps> = ({
  items,
  count,
}) => {
  const title = 'Contact Requests';

  const columns: Column[] = useMemo(() => ([
    { key: 'id', label: 'ID', allowsSorting: true },
    { key: 'name', label: 'Name', allowsSorting: true },
    { key: 'email', label: 'Email', allowsSorting: true },
    { key: 'message', label: 'Message', allowsSorting: true },
    { key: 'createdAt', label: 'Requested At', allowsSorting: true },
    { key: "actions", label: "Actions", allowsSorting: false },
  ]), []);

  const renderCell = useCallback((contactRequest: any, columnKey: any) => {
    const cellValue = contactRequest[columnKey];

    switch (columnKey) {
      case 'id':
        return formatId(cellValue);
      case 'createdAt':
        return cellValue.toLocaleDateString();
      case 'actions':
        return (
          <TableActions
            showPath={paths.contactRequestDetails}
            editPath={paths.editContactRequest}
            itemId={contactRequest.id}
            onDelete={deleteContactRequest}
          />
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <ItemsTable
      items={items}
      count={count}
      title={title}
      columns={columns}
      renderCell={renderCell}
    />
  );
};

export default ContactRequestsTable;
